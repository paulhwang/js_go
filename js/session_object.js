/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: SessionObject.js
 */

function SessionObject(session_mgr_val, session_id_val) {
    "use strict";

    this.init__ = function (session_mgr_val, session_id_val) {
        this.theSessionMgrObject = session_mgr_val;
        this.theSessionId = session_id_val;
        this.theXmtSeq = 0;
        this.theRcvSeq = 0;
        this.theTransmitQueue = new QueueObject(this.utilObject());
        this.thePrev = null;
        this.theNext = null;
    };

    this.objectName = function () {
        return "SessionObject";
    };

    this.sessionMgrObject = function () {
        return this.theSessionMgrObject;
    };

    this.linkObject = function () {
        return this.sessionMgrObject().linkObject();
    };

    this.rootObject = function () {
        return this.linkObject().rootObject();
    };

    this.utilObject = function () {
        return this.rootObject().utilObject();
    };

    this.containerObject = function () {
        return this.theContainerObject;
    };

    this.ajaxObject = function () {
        return this.rootObject().ajaxObject();
    };

    this.clientReceiveCallbackFunc = function() {
        return this.theClientReceiveCallbackFunc;
    };

    this.clientObject = function () {
        return this.theClientObject;
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
        return this.rootObject().myName();
    };

    this.hisName = function () {
        return this.theHisName;
    };

    this.setHisName = function (val) {
        this.theHisName = val;
    };

    this.gameName = function () {
        return this.theGameName;
    };

    this.setGameName = function (val) {
        this.theGameName = val;
    };

    this.xmtSeq = function () {
        return this.theXmtSeq;
    };

    this.incrementXmtSeq = function () {
        this.theXmtSeq += 1;
    };

    this.rcvSeq = function () {
        return this.theRcvSeq;
    };

    this.incrementRcvSeq = function () {
        this.theRcvSeq += 1;
    };

    this.sessionId = function () {
        return this.theSessionId;
    };

    this.ajaxId = function () {
        return this.linkObject().ajaxId() + ":" + this.sessionId();
    };

    this.setSessionId = function (val) {
        if (this.sessionId()) {
            this.abend("setSessionId", "already exist");
        }
        this.theSessionId = val;
        this.ajaxObject().setupCallback("get_session_data", this.ajaxId(), ajaxGetSessionDataCallback, this);
        this.ajaxObject().setupCallback("put_session_data", this.ajaxId(), ajaxPutSessionDataCallback, this);
    };

    this.setContainerObject = function (val) {
        this.theContainerObject = val;
    };

    this.transmitQueue = function () {
        return this.theTransmitQueue;
    };

    this.setupClientReceiveCallback = function (callback_func_val, client_val) {
        this.theClientReceiveCallbackFunc = callback_func_val;
        this.theClientObject = client_val;
    };

    this.receiveData = function (res_data_val) {
        this.clientReceiveCallbackFunc()(this.clientObject(), res_data_val);
    };

    this.transmitData = function () {
        this.debug(false, "transmitData", "size=" + this.transmitQueue().size());
        while (this.transmitQueue().size() > 0) {
            var data = this.transmitQueue().deQueue();
            if (data) {
                this.debug(false, "transmitData", "data=" + data);
                this.ajaxObject().putSessionData(this, data);
            }
            else {
                this.abend("transmitData", "null data");
            }
        }
    };

    this.appendTopicToSession = function (topic_data_val) {
        var container = new GoContainerObject(this);
        this.debug(false, "processSessionSetupAjaxRequest", "topic_data_val=" + topic_data_val);
        var topic_data = JSON.parse(topic_data_val);
        this.debug(false, "processSessionSetupAjaxRequest", "data=" + topic_data.data);
        var data = JSON.parse(topic_data.data)
        this.debug(false, "processSessionSetupAjaxRequest", "config=" + data.data);
        var config = JSON.parse(data.data);
        container.configObject().setBoardSize(config.board_size);
        container.configObject().setMyColor_(config.color);
        container.configObject().setKomiPoint(config.komi);
        container.configObject().setHandicapPoint(config.handicap);
        this.setHisName("a");/////////////////////////////////////////////////////////////

        this.containerObject().launchTopic();
        this.ajaxObject().getSessionData(this);
    };

    this.runSession_______________________________ = function () {
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
            var data = JSON.stringify({
                        target: "Go",
                        command: "config",
                        data: JSON.stringify({
                                board_size: config.boardSize(),
                                color: config.hisColor(),
                                komi: config.komiPoint(),
                                handicap: config.handicapPoint(),
                        }),
                    });
            this0.ajaxObject().setupSession(this0.rootObject().ajaxId(), this0, "GO_GAME", data);
        });
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

    this.destructor = function () {
        window.clearInterval(this.updateNameListTimer);
    };

    this.init__(session_mgr_val, session_id_val);
}

