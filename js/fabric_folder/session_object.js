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
        this.initSwitchTable();
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

    this.ajaxObject = function () {
        return this.rootObject().ajaxObject();
    };

    this.topicObject = function () {
        return this.theTopicObject;
    };

    this.setTopicObject = function (val) {
        this.theTopicObject = val;
    };

    this.switchTable = function () {
        return this.theSwitchTable;
    }

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

    this.setSessionId = function (val) {
        if (this.sessionId()) {
            this.abend("setSessionId", "already exist");
        }
        this.theSessionId = val;
    };

    this.transmitQueue = function () {
        return this.theTransmitQueue;
    };

    this.transmitData = function (data_val) {
        this.ajaxObject().putSessionData(this, data_val);
    };

    this.receiveData = function (res_data_val) {
        if (res_data_val === null) {
            return;
        }
        this.topicObject().receiveData(res_data_val);
    };

    this.initSwitchTable = function () {
        this.theSwitchTable = {
            "go": this.createGoObject,
        };
    };

    this.createGoObject = function () {
        return new GoContainerObject(this);
    };

    this.appendTopicToSession = function (topic_data_val, his_name_val, initiater_val) {
        this.setHisName(his_name_val);
        this.debug(true, "processSessionSetupAjaxRequest", "topic_data_val=" + topic_data_val);
        var topic_data = JSON.parse(topic_data_val);

        var func = this.switchTable()[topic_data.title];
        if (!func) {
            this.abend("appendTopicToSession", "bad title=" + topic_data_val.title);
            return;
        }
        this.setTopicObject(func.bind(this)());
        this.topicObject().configObject().setupConfiguration(topic_data.config, initiater_val);
        this.topicObject().launchTopic();
        this.ajaxObject().getSessionData(this);
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

