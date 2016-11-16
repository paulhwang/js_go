/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: AjaxObject.js
 */

function AjaxObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.thePacketId = 1;
        this.theOustandingRequestCount = 0;
        this.theCallbackIndex = 0;
        this.theCallbackArray = [];
        this.outputQueue = new QueueObject(this.utilObject());
        this.theHttpPostRequest = new XMLHttpRequest();
        this.theHttpGetRequest = new XMLHttpRequest();
        this.waitOnreadyStateChange(this.httpGetRequest());
    };

    this.objectName = function () {
        return "AjaxObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.utilObject = function () {
        return this.rootObject().utilObject();
    };

    this.linkMgrObject = function () {
        return this.rootObject().linkMgrObject();
    };

    this.callbackIndex = function () {
        return this.theCallbackIndex;
    };

    this.incrementCallbackIndex = function () {
        return this.theCallbackIndex += 1;
    };

    this.oustandingRequestCount = function () {
        return this.theOustandingRequestCount;
    };

    this.incrementOustandingRequestCount = function () {
        this.theOustandingRequestCount += 1;
        if (this.theOustandingRequestCount !== 1) {
            this.abend("decrementOustandingRequestCount", "not 1");
        }
    };

    this.decrementOustandingRequestCount = function () {
        this.theOustandingRequestCount -= 1;
        if (this.theOustandingRequestCount !== 0) {
            this.abend("decrementOustandingRequestCount", "not 0");
        }
    };

    this.callbackArray = function () {
        return this.theCallbackArray;
    };

    this.callbackArrayElement = function (index_val) {
        return this.theCallbackArray[index_val];
    };

    this.setCallbackArrayElement = function (index_val, data_val) {
        this.theCallbackArray[index_val] = data_val;
    };

    this.ajaxRoute = function () {
        return "/django_go/go_ajax/";
    };

    this.jsonContext = function () {
        return "application/json; charset=utf-8";
    }
    this.plainTextContext = function () {
        return "text/plain; charset=utf-8";
    }

    this.httpGetRequest = function () {
        return this.theHttpGetRequest;
    };

    this.httpPostRequest = function () {
        return this.theHttpPostRequest;
    };

    this.packetId = function () {
        return this.thePacketId;
    };

    this.incrementPacketId = function () {
        this.thePacketId += 1;
    };

    this.formJsonString = function (msg_val, session_val) {
        var s = JSON.stringify({
            his_name: session_val.hisName(),
            my_name: session_val.myName(),
            data: msg_val,
            xmt_seq: session_val.xmtSeq(),
            link_id: this.rootObject().linkId(),
            session_id: session_val.sessionId(),
        });
        session_val.incrementXmtSeq();
        return s;
    };

    this.enqueueOutput = function (data_val, do_process_val) {
        this.outputQueue.enQueue(data_val);
        if (do_process_val) {
            this.ajaxJob(this.httpGetRequest());
        }
    };

    this.ajaxJob = function (request_val) {
        if (this.oustandingRequestCount() > 0) {
            return;
        }

        if (this.outputQueue.size() === 0) {
            //this.keepAlive();
            return;
        }

        var ajax = this.outputQueue.deQueue();
        if (!ajax) {
            return;
        }
        request_val.open("GET", this.ajaxRoute(), true);
        request_val.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request_val.setRequestHeader("Content-Type", this.jsonContext());
        if ((ajax.command !== "keep_alive") && 
            (ajax.command !== "get_link_data") &&
            (ajax.command !== "get_name_list") &&
            (ajax.command !== "get_session_data")) {
            this.debug(false, "ajaxJob", "command=" + ajax.command);
        }
        request_val.setRequestHeader("gorequest", ajax);
        request_val.setRequestHeader("GOPACKETID", this.packetId());
        this.incrementPacketId();
        request_val.send(null);
        this.incrementOustandingRequestCount();
    };

    this.waitOnreadyStateChange = function (request_val) {
        var this0 = this;
        request_val.onreadystatechange = function() {
            if ((request_val.readyState === 4) && (request_val.status === 200)) {
                this0.debug(false, "waitOnreadyStateChange", "json_str= " + request_val.responseText);
                this0.linkMgrObject().switchResponse(request_val.responseText);
                this0.decrementOustandingRequestCount();
                this0.ajaxJob(request_val);
            }
        };
    };

    this.setupLink = function (root_val) {
        var output = JSON.stringify({
            command: "setup_link",
            ajax_id: root_val.myName(),
            my_name: root_val.myName(),
        });
        this.debug(true, "setupLink", "output=" + output);
        this.enqueueOutput(output, true);
    };

    this.keepAlive = function (ajax_id_val) {
        var output = JSON.stringify({
            command: "keep_alive",
            ajax_id: ajax_id_val,
            my_name: this.rootObject().myName(),
            link_id: this.rootObject().linkId(),
        });
        this.debug(true, "keepAlive", "output=" + output);
        this.enqueueOutput(output, false);
    };

    this.getLinkData = function (link_val) {
        var output = JSON.stringify({
            command: "get_link_data",
            ajax_id: link_val.ajaxId(),
            my_name: link_val.myName(),
            link_id: link_val.linkId(),
        });
        this.debug(false, "getLinkData", "output=" + output);
        this.enqueueOutput(output);
        this.ajaxJob(this.httpGetRequest());
    };

    this.getNameList = function (link_val) {
        var output = JSON.stringify({
            command: "get_name_list",
            ajax_id: link_val.ajaxId(),
            my_name: link_val.myName(),
            link_id: link_val.linkId(),
        });
        this.debug(true, "getNameList", "output=" + output);
        this.enqueueOutput(output, false);
    };

    this.setupSession = function (ajax_id_val, link_val, topic_val, data_val) {
        var data = JSON.stringify({
            topic: topic_val,
            data: data_val,
        });
        this.debug(false, "setupSession", data);

        var output = JSON.stringify({
            command: "setup_session",
            ajax_id: ajax_id_val,
            my_name: link_val.myName(),
            link_id: link_val.linkId(),
            his_name: link_val.myName(),///////////////////////////////////////////session_val.hisName(),
            data: data,
        });
        this.debug(true, "setupSession", "output=" + output);
        this.enqueueOutput(output, false);
    };

    this.setupSessionReply = function (ajax_id_val, data_val) {
        this.debug(true, "setupSessionReply", "data_val=" + data_val);

        var data = JSON.parse(data_val);
        var output = JSON.stringify({
            command: "setup_session_reply",
            ajax_id: ajax_id_val,
            my_name: this.rootObject().myName(),
            link_id: this.rootObject().linkId(),
            session_id: data.session_id,
            data: data.data,
        });
        this.debug(true, "setupSessionReply", "output=" + output);
        this.enqueueOutput(output, false);
    };

    this.getSessionData = function (ajax_id_val, session_val) {
        var output = JSON.stringify({
            command: "get_session_data",
            ajax_id: session_val.ajaxId(),
            link_id: session_val.linkObject().linkId(),
            session_id: session_val.sessionId(),
        });
        this.debug(true, "getSessionData", "output=" + output);
        this.enqueueOutput(output, false);
    };

    this.putSessionData = function (ajax_id_val, session_val, data_val) {
        var output = JSON.stringify({
            command: "put_session_data",
            ajax_id: session_val.ajaxId(),
            my_name: session_val.linkObject().myName(),
            link_id: session_val.linkObject().linkId(),
            session_id: session_val.sessionId(),
            his_name: session_val.hisName(),
            xmt_seq: session_val.xmtSeq(),
            data: data_val,
        });
        session_val.incrementXmtSeq();
        this.debug(true, "putSessionData", "output=" + output);
        this.enqueueOutput(output, true);
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (debug_val) {
            this.logit(str1_val, str2_val);
        }
    };

    this.logit = function (str1_val, str2_val) {
        return this.utilObject().utilLogit(this.objectName() + "." + str1_val, str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return this.utilObject().utilAbend(this.objectName() + "." + str1_val, str2_val);
    };

    this.init__(root_object_val);
}

