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
        this.theHttpGetRequest = new XMLHttpRequest();
        this.setupReceiveAjaxResponse();
    };

    this.objectName = function () {
        return "AjaxObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.switchObject = function () {
        return this.rootObject().switchObject();
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

    this.packetId = function () {
        return this.thePacketId;
    };

    this.incrementPacketId = function () {
        this.thePacketId += 1;
    };

    this.setupReceiveAjaxResponse = function () {
        var this0 = this;
        this.httpGetRequest().onreadystatechange = function() {
            if ((this0.httpGetRequest().readyState === 4) && (this0.httpGetRequest().status === 200)) {
                this0.debug(false, "setupReceiveAjaxResponse", "json_str= " + this0.httpGetRequest().responseText);
                this0.switchObject().switchAjaxResponseData(this0.httpGetRequest().responseText);
            }
        };
    };

    this.transmitAjaxRequest = function (output_val) {
        this.httpGetRequest().open("GET", this.ajaxRoute(), true);
        this.httpGetRequest().setRequestHeader("X-Requested-With", "XMLHttpRequest");
        this.httpGetRequest().setRequestHeader("Content-Type", this.jsonContext());
        this.httpGetRequest().setRequestHeader("gorequest", output_val);
        this.httpGetRequest().setRequestHeader("GOPACKETID", this.packetId());
        this.incrementPacketId();
        this.httpGetRequest().send(null);
    };

    this.setupLink = function (root_val) {
        var output = JSON.stringify({
                        command: "setup_link",
                        my_name: root_val.myName(),
                        });
        this.debug(true, "setupLink", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.getLinkData = function (link_val) {
        var output = JSON.stringify({
                        command: "get_link_data",
                        my_name: link_val.myName(),
                        link_id: link_val.linkId(),
                        });
        this.debug(false, "getLinkData", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.getNameList = function (link_val) {
        var output = JSON.stringify({
                        command: "get_name_list",
                        my_name: link_val.myName(),
                        link_id: link_val.linkId(),
                        });
        this.debug(true, "getNameList", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.setupSession = function (link_val, topic_data_val, his_name_val) {
        var output = JSON.stringify({
                        command: "setup_session",
                        my_name: link_val.myName(),
                        link_id: link_val.linkId(),
                        his_name: his_name_val,
                        topic_data: topic_data_val,
                        });
        this.debug(true, "setupSession", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.setupSessionReply = function (link_val, data_val) {
        var data = JSON.parse(data_val);
        var output = JSON.stringify({
                        command: "setup_session_reply",
                        my_name: link_val.myName(),
                        link_id: link_val.linkId(),
                        session_id: data.session_id,
                        accept: "yes",
                        topic_data: data.topic_data,
                        });
        this.debug(true, "setupSessionReply", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.getSessionData = function (session_val) {
        var output = JSON.stringify({
                        command: "get_session_data",
                        link_id: session_val.linkObject().linkId(),
                        session_id: session_val.sessionId(),
                        });
        this.debug(true, "getSessionData", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.putSessionData = function (session_val, data_val) {
        var output = JSON.stringify({
                        command: "put_session_data",
                        my_name: session_val.linkObject().myName(),
                        link_id: session_val.linkObject().linkId(),
                        session_id: session_val.sessionId(),
                        his_name: session_val.hisName(),
                        xmt_seq: session_val.xmtSeq(),
                        data: data_val,
                        });
        session_val.incrementXmtSeq();
        this.debug(true, "putSessionData", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (debug_val) {
            this.logit(str1_val, str2_val);
        }
    };

    this.logit = function (str1_val, str2_val) {
        return LOG_IT(this.objectName() + "." + str1_val, str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return ABEND(this.objectName() + "." + str1_val, str2_val);
    };

    this.init__(root_object_val);
}

