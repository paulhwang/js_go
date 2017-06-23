/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: SessionObject.js
 */

function SessionObject(link_object_val, session_id_val, session_id_index_val) {
    "use strict";

    this.init__ = function (link_object_val, session_id_val, session_id_index_val) {
        this.theLinkObject = link_object_val;
        this.theSessionId = session_id_val;
        this.theSessionIdIndex = session_id_index_val;
        this.theXmtSeq = 0;
        this.theRcvSeq = 0;
        this.initSwitchTable();
        this.debug(false, "init__", "session=" + this.sessionName());
    };

    this.objectName = function () {
        return "SessionObject";
    };

    this.linkObject = function () {
        return this.theLinkObject;
    };

    this.sessionId = function () {
        return this.theSessionId;
    };

    this.sessionIdIndex = function () {
        return this.theSessionIdIndex;
    };

    this.rootObject = function () {
        return this.linkObject().rootObject();
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

    this.sessionName = function () {
        return  this.linkObject().linkId() + ":" + this.sessionId();
    };

    this.setSessionId = function (val) {
        if (this.sessionId()) {
            this.abend("setSessionId", "already exist");
        }
        this.theSessionId = val;
    };

    this.transmitData = function (data_val) {
        this.ajaxObject().putSessionData(this, data_val);
    };

    this.receiveData = function (res_data_val, c_data_val) {
        if (res_data_val === null) {
            return;
        }
        this.topicObject().receiveData(res_data_val, c_data_val);
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
        this.debug(false, "appendTopicToSession", "topic_data_val=" + topic_data_val);
        var topic_data = JSON.parse(topic_data_val);

        var func = this.switchTable()[topic_data.title];
        if (!func) {
            this.abend("appendTopicToSession", "bad title=" + topic_data_val.title);
            return;
        }
        this.setTopicObject(func.bind(this)());
        this.topicObject().init___(topic_data.config, initiater_val);
        this.topicObject().launchTopic();
        this.ajaxObject().getSessionData(this);
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

    this.init__(link_object_val, session_id_val, session_id_index_val);
}

