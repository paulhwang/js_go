/*
  Copyrights reserved
  Written by Paul Hwang
*/

function ConfigStorageObject() {
    "use strict";

    this.init__ = function () {
        this.theStorage = localStorage;
        this.theNameList = ["Paul_Hwang", "Annie_Laurie"];
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "ConfigStorageObject";
    };

    this.storage = function () {
        return this.theStorage;
    };

    this.userName = function () {
        return this.storage().user_name;
    };

    this.linkId = function () {
        return Number(this.storage().link_id);
    };

    this.sessionId = function () {
        return Number(this.storage().session_id);
    };

    this.setSessionId = function (val) {
        this.storage().session_id = val;
    };

    this.boardSize = function () {
        return this.storage().board_size;
    };

    this.stoneColor = function () {
        return this.storage().stone_color;
    };

    this.komi = function () {
        return this.storage().komi;
    };

    this.handicap = function () {
        return this.storage().handicap;
    };

    this.setBoardSize = function (val) {
        this.storage().board_size = val;
    };

    this.setStoneColor = function (val) {
        this.storage().stone_color = val;
    };

    this.setKomi = function (val) {
        this.storage().komi = val;
    };

    this.setHandicap = function (val) {
        this.storage().handicap = val;
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

