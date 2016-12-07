/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: LinkObject.js
 */

function LinkObject(root_object_val, my_name_val, link_id_val) {
    "use strict";

    this.init__ = function (root_object_val, my_name_val, link_id_val) {
        this.theRootObject = root_object_val;
        this.theMyName = my_name_val;
        this.theLinkId = link_id_val;
        this.initSwitchTable();
        this.theSessionIndexArray = [0];
        this.theSessionTableArray = [null];
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

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.htmlObject = function () {
        return this.rootObject().htmlObject();
    };

    this.ajaxObject = function () {
        return this.rootObject().ajaxObject();
    };

    this.myName = function () {
        return this.theMyName;
    };

    this.linkId = function () {
        return this.theLinkId;
    };

    this.sessionIndexArray = function () {
        return this.theSessionIndexArray;
    };

    this.sessionTableArray = function () {
        return this.theSessionTableArray;
    };

    this.sessionTableArrayLength = function () {
        return this.sessionTableArray().length;
    };

    this.sessionTableArrayElement = function (val) {
        return this.sessionTableArray()[val];
    };

    this.setLinkId = function (val) {
        if (this.linkId()) {
            this.abend("setLinkId", "already exist");
        }
        this.theLinkId = val;
    };

    this.verifyLinkId = function (id_val) {
        if (this.linkId() === id_val) {
            return true;
        } else {
            return false;
        }
    };

    this.switchTable = function () {
        return this.theSwitchTable;
    }

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

    this.mallocSessionAndInsert = function (session_id_val) {
        var session = new SessionObject(this, session_id_val);
        if (!session) {
            return null;
        }
        this.sessionIndexArray().push(session.sessionId());
        this.sessionTableArray().push(session);
        return session;
    };

    this.getSession = function (session_id_val) {
        var index = this.sessionIndexArray().indexOf(session_id_val);
        if (index === -1) {
            return null;
        } else {
            var session =this.sessionTableArray()[index];
            return session;
        }
    };

    this.initSwitchTable = function () {
        this.theSwitchTable = {
            "get_link_data": this.getLinkDataResponse,
            "get_name_list": this.getNameListResponse,
            "setup_session": this.setupSessionResponse,
            "setup_session_reply": this.setupSessionReplyResponse,
            "get_session_data": this.getSessionDataResponse,
            "put_session_data": this.putSessionDataResponse,
        };
    };

    this.parseAjaxResponseData = function (response_val) {
        var data = JSON.parse(response_val.data);
        if (!data) {
            return;
        }
        if (!this.verifyLinkId(data.link_id)) {
            this.abend("parseAjaxResponseData", "link_id=" + data.link_id);
            return;
        }

        this.debug(true, "parseAjaxResponseData", "command=" + response_val.command + " data=" + response_val.data);

        var func = this.switchTable()[response_val.command];
        if (func) {
            func.bind(this)(response_val.data);
        }
        else {
            this.abend("switchAjaxResponseData", "bad command=" + response_val.command);
            return;
        }
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
            var session = this.mallocSessionAndInsert(data.session_id);
            if (data.topic_data) {
                session.appendTopicToSession(data.topic_data, data.his_name, true);
            }
        }
    };

    this.setupSessionReplyResponse = function (json_data_val) {
        this.debug(true, "setupSessionReplyResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            var session = this.mallocSessionAndInsert(data.session_id);
            if (data.topic_data) {
                session.appendTopicToSession(data.topic_data, data.his_name, false);
            }
        }
    };

    this.putSessionDataResponse = function (json_data_val) {
        this.debug(false, "putSessionDataResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            var session = this.getSession(data.session_id);
            if (session) {
                session.receiveData(data.res_data);
            }
        }
    };

    this.getSessionDataResponse = function (json_data_val) {
        this.debug(false, "getSessionDataResponse", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            var session = this.getSession(data.session_id);
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

    this.init__(root_object_val, my_name_val, link_id_val);
}

