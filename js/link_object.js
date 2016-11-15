/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: LinkObject.js
 */

function LinkObject(link_mgr_object_val, my_name_val, link_id_val) {
    "use strict";

    this.init__ = function (link_mgr_object_val, my_name_val, link_id_val) {
        this.theLinkMgrObject = link_mgr_object_val;
        this.theMyName = my_name_val;
        this.theLinkId = link_id_val;
        this.theSessionMgrObject = new SessionMgrObject(this.rootObject());
        this.thePrev = null;
        this.theNext = null;
        this.ajaxObject().getLinkData(this.ajaxId(), this.myName(), this.linkId());
    };

    this.objectName = function () {
        return "LinkObject";
    };

    this.linkMgrObject = function () {
        return this.theLinkMgrObject;
    };

    this.sessionMgrObject = function () {
        return this.theSessionMgrObject;
    };

    this.rootObject = function () {
        return this.linkMgrObject().rootObject();
    };

    this.utilObject = function () {
        return this.rootObject().utilObject();
    };

    this.ajaxObject = function () {
        return this.rootObject().ajaxObject();
    };

    this.prev = function () {
        return this.thePrev;
    };

    this.setPrev = function (val) {
        this.thePrev = val;
    };

    this.next = function () {
        return this.theNext;
    };

    this.setNext = function (val) {
        this.theNext = val;
    };

    this.myName = function () {
        return this.theMyName;
    };

    this.linkId = function () {
        return this.theLinkId;
    };

    this.ajaxId = function () {
        return this.myName() + ":" + this.linkId();
    };

    this.setLinkId = function (val) {
        if (this.linkId()) {
            this.abend("setLinkId", "already exist");
        }
        this.theLinkId = val;
    };

    this.linkUpdateInterval = function () {
        return this.theLinkUpdateInterval;
    };

    this.setLinkUpdateInterval = function (val) {
        this.theLinkUpdateInterval = val;
    };

    this.getLinkDataResponse = function (json_data_val) {
        this.debug(true, "getLinkDataResponse", "json_data_val=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            this.setLinkUpdateInterval(data.interval);

            if (data.name_list) {
                this.debug(true, "getLinkDataResponse", "name_list=" + data.name_list);
                this.ajaxObject().getNameList(this.ajaxId(), this.rootObject());
            }

            if (data.pending_session_data) {
                this.debug(true, "getLinkDataResponse", "pending_session_data=" + data.pending_session_data);
                var i = 0;
                while (i >= 0) {
                    var session_id = data.pending_session_data[i];
                    this.ajaxObject().getSessionData111111111111(session_id, session_id);
                    i -= 1;
                }
            }

            if (data.pending_session_setup) {
                this.ajaxObject().setupSessionReply(this.ajaxId(), data.pending_session_setup);
            }
        }

        setTimeout(function(root_val) {
            root_val.debug(false, "getLinkDataResponse", "setTimeout");
            root_val.ajaxObject().getLinkData(root_val.ajaxId(), root_val.myName(), root_val.linkId());
        }, this.linkUpdateInterval(), this.rootObject());
    };

    this.getNameListResponse = function (json_data_val) {
        this.debug(true, "getNameListResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            if (this.rootObject().lastJsonNameList() !== data.name_list) {
                //this.rootObject().setLastJsonNameList(data.name_list);
                this.rootObject().setNameList(data.name_list);
                //session_val.runSession();
            }
        }
    };

    this.setupSessionResponse = function (json_data_val) {
        this.debug(true, "setupSessionResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            var session = this.sessionMgrObject().mallocSessionAndInsert(data.session_id + 1);
            var container = new GoContainerObject(session);
            this.debug(true, "setupSessionResponse", "extra_data=" + data.extra_data);
            var extra_data = JSON.parse(data.extra_data);
            this.debug(true, "setupSessionResponse", "data=" + extra_data.data);
            var data = JSON.parse(extra_data.data)
            this.debug(true, "setupSessionResponse", "config=" + data.data);
            var config = JSON.parse(data.data);
            container.configObject().setBoardSize(config.board_size);
            container.configObject().setMyColor_(config.color);
            container.configObject().setKomiPoint(config.komi);
            container.configObject().setHandicapPoint(config.handicap);
            //session.startGoGame();
        }
    };

    this.setupSessionReplyResponse = function (json_data_val) {
        this.debug(true, "setupSessionReplyResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
        }
    };

    this.putSessionDataResponse = function (json_data_val) {
        this.debug(true, "putSessionDataResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            var session = this.sessionMgrObject().searchSessionBySessionId(data.session_id);
            if (session) {
                if (data.res_data) {
                    session.receiveData(data.res_data);
                }
            }
        }
    };

    this.getSessionDataResponse = function (json_data_val) {
        this.debug(true, "getSessionDataResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            var session = this.sessionMgrObject().searchSessionBySessionId(data.session_id);
            if (session) {
                if (data.res_data) {
                    session.receiveData(data.res_data);
                }
            }
        }
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (!debug_val) {
            return;
        }
        return this.utilObject().utilLogit(this.objectName() + "." + str1_val + "==", str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return this.utilObject().utilabend(this.objectName() + "." + str1_val, str2_val);
    };

    this.logit = function (str1_val, str2_val) {
        return this.utilObject().utilLogit(this.objectName() + "." + str1_val, str2_val);
    };

    this.init__(link_mgr_object_val, my_name_val, link_id_val);
}

