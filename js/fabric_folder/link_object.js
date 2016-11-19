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
        this.debug(false, "init__", "link_id=" + this.linkId());
    };

    this.hisName = function () {//////////////////////
        return "LinkObject";
    };

    this.gameName = function () {///////////////////////////
        return "Go";
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

    this.htmlObject = function () {
        return this.rootObject().htmlObject();
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
                    var session = this.sessionMgrObject().searchSessionBySessionId(session_id);
                    if (session) {
                        this.ajaxObject().getSessionData(session);
                    }
                    i -= 1;
                }
            }

            if (data.pending_session_setup) {
                this.debug(true, "getLinkDataResponse", "pending_session_setup=" + data.pending_session_setup);
                this.ajaxObject().setupSessionReply(this, data.pending_session_setup);
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
                if (this.myName() !== "z") {
                    this.getConfigAndSetupSession();
                }
            }
        }
    };

    this.getConfigAndSetupSession = function () {
        var this0 = this;
        var title = "go";
        var size;
        var color;
        var komi;
        var handicap;
        var his_name = "a";

        this.htmlObject().goConfigHtmlObject().createSessionHolders(this);

        $(".peer_game_paragraph button").on("click", function() {
            title = $(".peer_game_paragraph select").val();
            this0.debug(true, "getConfigAndSetupSession", title);
        });

        $(".peer_connect_section button").on("click", function() {
            his_name = $(".peer_name_paragraph select").val();
            size = $(".board_size_section select").val();
            color = $(".play_color_section select").val();
            komi = $(".komi_section select").val();
            handicap = $(".handicap_section select").val();
            this0.debug(false, "getConfigAndSetupSession", " my_name=" + this0.myName() +
                                            " his_name=" + his_name +
                                            " board_size=" + size +
                                            " color=" + color +
                                            " komi=" + komi +
                                            " handicap=" + handicap);
            var config = JSON.stringify({
                            board_size: size,
                            color: color,
                            komi: komi,
                            handicap: handicap,
                            });
            var topic_data = JSON.stringify({
                            title: title,
                            config: config,
                            });
            this0.ajaxObject().setupSession(this0, topic_data, his_name);
        });
    };

    this.setupSessionResponse = function (input_val) {
        this.debug(false, "setupSessionResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            var session = this.sessionMgrObject().mallocSessionAndInsert(data.session_id);
            if (data.topic_data) {
                session.appendTopicToSession(data.topic_data, data.his_name, true);
            }
        }
    };

    this.setupSessionReplyResponse = function (json_data_val) {
        this.debug(true, "setupSessionReplyResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            var session = this.sessionMgrObject().mallocSessionAndInsert(data.session_id);
            if (data.topic_data) {
                session.appendTopicToSession(data.topic_data, data.his_name, false);
            }
        }
    };

    this.putSessionDataResponse = function (json_data_val) {
        this.debug(false, "putSessionDataResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            var session = this.sessionMgrObject().searchSessionBySessionId(data.session_id);
            if (session) {
                session.receiveData(data.res_data);
            }
        }
    };

    this.getSessionDataResponse = function (json_data_val) {
        this.debug(false, "getSessionDataResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            var session = this.sessionMgrObject().searchSessionBySessionId(data.session_id);
            if (session) {
                session.receiveData(data.res_data);
            }
        }
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

    this.init__(link_mgr_object_val, my_name_val, link_id_val);
}

