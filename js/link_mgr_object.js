/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: LinkMgrObject.js
 */

function LinkMgrObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.theHead = null;
        this.theTail = null;
        this.theSize = 0;
        this.initSwitchTable();
    };

    this.objectName = function () {
        return "LinkMgrObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.utilObject = function () {
        return this.rootObject().utilObject();
    };

    this.head = function () {
        return this.theHead;
    }

    this.setHead = function (val) {
        this.theHead = val;
    }

    this.tail = function () {
        return this.theTail;
    }

    this.setTail = function (val) {
        this.theTail = val;
    }

    this.size = function () {
        return this.theSize;
    }

    this.incrementSize = function () {
        this.theSize += 1;
    }

    this.decrementSize = function () {
        this.theSize -= 1;
    }

    this.transmitData = function () {
        var session = this.head();
        while (session) {
            session.transmitData();
            session = session.next();
        }
    };

    this.initSwitchTable = function () {
        this.switch_table = {
            "setup_link": this.setupLinkResponse,
            "get_link_data": this.getLinkDataResponse,
            //"put_link_data": this.putLinkData,
            //"get_name_list": this.getNameList,
            //"setup_session": this.setupSession,
            //"setup_session_reply": this.setupSessionReply,
            //"get_session_data": this.getSessionData,
            //"put_session_data": this.putSessionData,
            //"keep_alive": this.keepAlive,
        };
    };

    this.switchResponse = function (response_val) {
        var response = JSON.parse(response_val);
        var func = this.switch_table[response.command];
        if (func) {
            func.bind(this)(response.data);
        }
        else {
            //this.abend("switchRequest", "bad command=" + go_request.command);
            //return null;
        }
    };

    this.setupLinkResponse = function (json_data_val) {
        this.debug(true, "setupLinkResponse", "json_data_val=" + json_data_val);
        var data = JSON.parse(json_data_val);
        this.mallocAndInsertLink(data.my_name, data.link_id);
    };

    this.getLinkDataResponse = function (json_data_val) {
        this.debug(true, "getLinkDataResponse", "json_data_val=" + json_data_val);
        var data = JSON.parse(json_data_val);
    };

    this.mallocAndInsertLink = function (my_name_val, link_id_val) {
        var link = new LinkObject(this, my_name_val, link_id_val);
        if (!link) {
            return;
        }
        this.insertLinkToList(link);
    };

    this.insertLinkToList = function (session_val) {
        if (!session_val) {
            this.abend("enQueue", "null session_val");
            return;
        }

        this.abendIt();

        this.incrementSize();
        if (!this.head()) {
            session_val.setPrev(null);
            session_val.setNext(null);
            this.setHead(session_val);
            this.setTail(session_val);
        } else {
            this.tail().setNext(session_val);
            session_val.setPrev(this.tail());
            session_val.setNext(null);
            this.setTail(session_val);
        }
        this.abendIt();
    };

    this.deleteLinkFromList = function (session_val) {
        if (this.size() <= 0) {
            this.abend("deleteSessionFromList", "size=" + this.size());
            return;
        }
        if (!this.sessionExistInTheList(session_val)) {
            this.abend("deleteSessionFromList", "sessionExistInTheList is false");
            return;
        }

        this.abendIt();
        if (session_val.prev()) {
            session_val.prev().setNext(session_val.next());
        } else {
            this.setHead(session_val.next());
        }
        if (session_val.next()) {
            session_val.next().setPrev(session_val.prev());
        } else {
            this.setTail(session_val.prev());
        }
        this.decrementSize();
        this.abendIt();
    };

    this.searchLinkByLinkId = function (session_id_val) {
        var session = this.head();
        while (session) {
            if (session.sessionId() === session_id_val) {
                return session;
            }
            session = session.next();
        }
        return null;
    };

    this.abendIt = function () {
        var i = 0;
        var session = this.head();
        while (session) {
            session = session.next();
            i += 1;
        }
        if (i !== this.size()) {
            this.abend("abendIt", "head: size=" + this.size() + " i=" + i);
        }

        i = 0;
        session = this.tail();
        while (session) {
            session = session.prev();
            i += 1;
        }
        if (i !== this.size()) {
            this.abend("abendIt", "tail: size=" + this.size() + " i=" + i);
        }
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (debug_val) {
            this.logit(str1_val, "==" + str2_val);
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

