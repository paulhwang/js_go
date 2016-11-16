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
        this.theSessionMgrObject = new SessionMgrObject(this);
        this.thePrev = null;
        this.theNext = null;
        this.ajaxObject().getLinkData(this);
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

    this.nameList = function () {
        return this.theNameList;
    };

    this.setNameList = function (data_val) {
        this.theNameList = data_val;
    };

    this.nameListLength = function () {
        return this.nameList().length;
    };

    this.nameListElement = function (index_val) {
        return this.nameList()[index_val];
    };

    this.setNameListElement = function (index_val, data_val) {
        this.nameList()[index_val] = data_val;
    };

    this.getLinkDataResponse = function (input_val) {
        this.debug(false, "getLinkDataResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            this.setLinkUpdateInterval(data.interval);

            if (data.name_list) {
                this.debug(true, "getLinkDataResponse", "name_list=" + data.name_list);
                this.ajaxObject().getNameList(this);
            }

            if (data.pending_session_data) {
                this.debug(true, "getLinkDataResponse", "pending_session_data=" + data.pending_session_data);
                var i = 0;
                while (i >= 0) {
                    var session_id = data.pending_session_data[i];
                    var session = this.sessionMgr().searchSessionBySessionId();
                    if (session) {
                        this.ajaxObject().getSessionData(session_id, session);
                    }
                    i -= 1;
                }
            }

            if (data.pending_session_setup) {
                this.debug(true, "getLinkDataResponse", "pending_session_setup=" + data.pending_session_setup);
                this.ajaxObject().setupSessionReply(this.ajaxId(), data.pending_session_setup);
            }
        }

        setTimeout(function(link_val) {
            link_val.debug(false, "getLinkDataResponse:timer", "setTimeout");
            link_val.ajaxObject().getLinkData(link_val);
        }, this.linkUpdateInterval(), this);
    };

    this.getNameListResponse = function (input_val) {
        this.debug(false, "getNameListResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            if (data.name_list) {
                this.setNameList(data.name_list);
                this.runSession111();
            }
        }
    };

    this.runSession111 = function () {
        /*
        var this0 = this;
        var container = this.containerObject();
        this.rootObject().htmlObject().createSessionHolders(this);

        $(".peer_game_paragraph button").on("click", function() {
            this0.setGameName($(".peer_game_paragraph select").val());
            this0.runSession(container);
        });

        $(".peer_connect_section button").on("click", function() {
            this0.setHisName($(".peer_name_paragraph select").val());
            var config = container.configObject();
            if (this0.containerObject().objectName() === "GoContainerObject") {
                config.setBoardSize($(".board_size_section select").val());
                config.setMyColor($(".play_color_section select").val());
                config.setKomiPoint($(".komi_section select").val());
                config.setHandicapPoint($(".handicap_section select").val());
                console.log("runConfig() ", " my_name=" + this0.rootObject().myName() +
                                            " his_name=" + this0.hisName() +
                                            " board_size=" + config.boardSize() +
                                            " color=" + config.myColor() +
                                            " komi=" + config.komiPoint() +
                                            " handicap=" + config.handicapPoint());
            }
            this0.ajaxObject().setupCallback(this0.ajaxObject().ajaxSetupSessionCommand(), this0.rootObject().ajaxId(), ajaxSetupSessionCallback, this0);
            */

            var data = JSON.stringify({
                        target: "Go",
                        command: "config",
                        data: JSON.stringify({
                                board_size: 19,
                                color: 1,
                                komi: 5,
                                handicap: 0,
                        }),
                    });
            this.ajaxObject().setupSession(this, "GO_GAME", data);
        //});
    };

    this.setupSessionResponse = function (input_val) {
        this.debug(false, "setupSessionResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            var session = this.sessionMgrObject().mallocSessionAndInsert(data.session_id);
            if (data.extra_data) {
                session.processSessionSetupAjaxRequest(data.extra_data);
            }
        }
    };

    this.setupSessionReplyResponse = function (json_data_val) {
        this.debug(true, "setupSessionReplyResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
        }
    };

    this.putSessionDataResponse = function (json_data_val) {
        this.debug(false, "putSessionDataResponse", "data=" + json_data_val);
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
        this.debug(false, "getSessionDataResponse", "data=" + json_data_val);
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
        if (debug_val) {
            this.logit(str1_val, str2_val);
        }
    };

    this.abend = function (str1_val, str2_val) {
        return this.utilObject().utilabend(this.objectName() + "." + str1_val, str2_val);
    };

    this.logit = function (str1_val, str2_val) {
        return this.utilObject().utilLogit(this.objectName() + "." + str1_val, str2_val);
    };

    this.init__(link_mgr_object_val, my_name_val, link_id_val);
}

