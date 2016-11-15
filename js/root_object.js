/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: root.js
 */

function RootObject() {
    "use strict";

    this.init__ = function () {
        this.theLinkId = 0;
        this.theLastJsonNameList = null;
        this.theUtilObject = new UtilObject();
        this.theAjaxObject = new AjaxObject(this);
        this.theLinkMgrObject = new LinkMgrObject(this);
        this.theSessionMgrObject = new SessionMgrObject(this);
        this.theHtmlObject = new GoHtmlObject(this);
        this.theMyName = "";
        this.theNameList = [];
        this.runRoot();
    };

    this.objectName = function () {
        return "RootObject";
    };

    this.htmlObject = function () {
        return this.theHtmlObject;
    };

    this.ajaxObject = function () {
        return this.theAjaxObject;
    };

    this.linkMgrObject = function () {
        return this.theLinkMgrObject;
    };

    this.sessionMgrObject = function () {
        return this.theSessionMgrObject;
    };

    this.utilObject = function () {
        return this.theUtilObject;
    };

    this.languageUsed = function () {
        return this.theLanguageUsed;
    };

    this.myName = function () {
        return this.theMyName;
    };

    this.myName2 = function () {
        return this.theMyName2;
    };

    this.setHtmlObject = function (val) {
        this.theHtmlObject = val;
    };

    this.setMyName = function (val) {
        this.theMyName = val;
    };

    this.setLanguageUsed = function (val) {
        this.theLanguageUsed = val;
    };

    this.linkId = function () {
        return this.theLinkId;
    };

    this.ajaxId = function () {
        return this.myName() + ":" + this.linkId();
    };

    this.setLinkId = function (val) {
        this.theLinkId = val;
    };

    this.lastJsonNameList = function () {
        return this.theLastJsonNameList;
    };

    this.setLastJsonNameList = function (val) {
        this.theLastJsonNameList = val;
    };

    this.nameListLength = function () {
        return this.theNameList.length;
    };

    this.nameListElement = function (index_val) {
        return this.theNameList[index_val];
    };

    this.setNameListElement = function (index_val, data_val) {
        this.theNameList[index_val] = data_val;
    };

    this.setNameList = function (data_val) {
        this.theNameList = data_val;
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (!debug_val) {
            return;
        }
        return this.utilObject().utilLogit(this.objectName() + "." + str1_val + "==", str2_val);
    };

    this.logit = function (str1_val, str2_val) {
        return this.utilObject().utilLogit(this.objectName() + "." + str1_val, str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return this.utilObject().utilAbend(this.objectName() + "." + str1_val, str2_val);
    };

    this.processReceiveSetupSession = function (data_val) {
        this.debug(true, "getLinkData",  "order=" + data_val.order + " my_name=" + data_val.my_name + " his_name=" + data_val.his_name + " session_id=" + data_val.session_id);
        if (data_val.extra_data) {
            this.debug(false, "getLinkData", "extra_data=" + data_val.extra_data);
            var extra_data = JSON.parse(data_val.extra_data);
            if (extra_data.target === "Go") {
                this.debug(false, "getLinkData", "command=" + extra_data.command);
                if (extra_data.command === "config") {
                    if (data_val.his_name != this.myName()) {
                        this.debug(true, "getLinkData", "config=" + extra_data.data);
                        var session = this.createGoSession(extra_data.data);
                        session.setHisName(data_val.his_name);
                        session.setSessionId(Number(data_val.session_id));
                        this.debug(true, "getLinkData", "session_id=" + session.sessionId());
                        session.startGoGame();
                    }
                }
            }
        }
    };

    this.getLinkData = function (data_val) {
        this.debug(true, "getLinkData", "data=" + data_val);
        var data = JSON.parse(data_val);
        if (data.order === "setup_session") {
            this.processReceiveSetupSession(data);
        }
    };

    this.createGoSession = function (json_config_val) {
        var session = new SessionObject(this);
        var container = new GoContainerObject(session);
        this.ajaxObject().setupCallback(this.ajaxObject().ajaxGetNameListCommand(), this.ajaxId(), ajaxGetNameListCallback, this, session);
        this.ajaxObject().setupCallback(this.ajaxObject().ajaxSetupSessionReplyCommand(), this.ajaxId(), ajaxSetupSessionReplyCallback, this, session);
        //this.ajaxObject().getNameList(this.ajaxId(), session);
        if (json_config_val) {
            var config = JSON.parse(json_config_val);
            container.configObject().setBoardSize(config.board_size);
            container.configObject().setMyColor_(config.color);
            container.configObject().setKomiPoint(config.komi);
            container.configObject().setHandicapPoint(config.handicap);
            this.logit("createGoSession", "board_size=" + container.configObject().boardSize() +
                                          " color=" + container.configObject().myColor() +
                                          " komi=" + container.configObject().komiPoint() +
                                          " handicap=" + container.configObject().handicapPoint());
        }
        return session;
    };

    this.runRoot = function () {
        var this0 = this;
        this.htmlObject().createPreludeHolder();
        $(".prelude_holder button").on("click", function() {
            this0.setMyName($(".prelude_holder input").val());
            this0.setLanguageUsed($(".prelude_holder select").val());
            this0.logit("runRoot", "my_name=" + this0.myName() + " language=" + this0.languageUsed());
            if (this0.myName()) {
                this0.ajaxObject().setupCallback(this0.ajaxObject().ajaxSetupLinkCommand(), this0.ajaxId(), ajaxSetupLinkCallback, this0);
                this0.ajaxObject().setupLink(this0.myName(), this0);
            }
        });
    };

    function ajaxSetupLinkCallback(json_data_val) {
        this.debug(true, "ajaxSetupLinkCallback", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        this.setLinkId(data.link_id);
        this.ajaxObject().setupCallback(this.ajaxObject().ajaxGetLinkDataCommand(), this.ajaxId(), ajaxGetLinkDataCallback, this);
        //this.ajaxObject().getLinkData(this.ajaxId(), this.myName(), this.linkId());
        this.createGoSession(null);
    };

    function ajaxGetLinkDataCallback(json_data_val) {
        this.debug(true, "ajaxGetLinkDataCallback", "data=" + json_data_val);
        var data = JSON.parse(json_data_val);
        if (data) {
            if (data.data) {
                this.debug(false, "ajaxGetLinkDataCallback", "data=" + data.data);
                this.getLinkData(data.data);
            }

            if (data.pending_session_setup) {
                this.ajaxObject().setupSessionReply(this.ajaxId(), data.pending_session_setup);
            }

            if (data.pending_session_data) {
                this.debug(true, "ajaxGetLinkDataCallback", "pending_session_data=" + data.pending_session_data);
                var i = 0;
                while (i >= 0) {
                    var session_id = data.pending_session_data[i];
                    this.ajaxObject().getSessionData1(session_id, session_id);
                    i -= 1;
                }
            }
        }
    };

    function ajaxGetNameListCallback(json_data_val, session_val) {
        session_val.debug(false, "ajaxGetNameListCallback", "name_list=" + json_data_val);
        if (this.lastJsonNameList() !== json_data_val) {
            this.setLastJsonNameList(json_data_val);
            this.setNameList(JSON.parse(json_data_val));
            session_val.runSession();
        }
    };

    function ajaxSetupSessionReplyCallback (json_data_val, session_val) {
        this.debug(true, "ajaxSetupSessionReplyCallback", "json_data_val=" + json_data_val);
        if (!json_data_val) {
            return;
        }
        var data = JSON.parse(json_data_val);
        session_val.setSessionId(data.session_id);
        this.sessionMgrObject().insertSessionToList(session_val);
        session_val.startGoGame();
    };

    this.init__();
}

