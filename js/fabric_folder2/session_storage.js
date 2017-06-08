/*
  Copyrights reserved
  Written by Paul Hwang
*/

function SessionStorageObject() {
    "use strict";

    this.init__ = function () {
        this.theStorage = localStorage;
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "SessionStorageObject";
    };

    this.storage = function () {
        return this.theStorage;
    };

    this.hisName = function () {
        return this.storage().his_name;
    };

    this.setHisName = function (val) {
        this.storage().his_name = val;
    };

    this.sessionId = function () {
        return Number(this.storage().session_id);
    };

    this.setSessionId = function (val) {
        this.storage().session_id = val;
    };

    this.sessionIdIndex = function () {
        return this.storage().session_id_index;
    };

    this.setSessionIdIndex = function (val) {
        this.storage().session_id_index = val;
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

    this.init__();
}
