/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayStorageObject() {
    "use strict";

    this.init__ = function () {
        this.theStorage = localStorage;
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "GoPlayStorageObject";
    };

    this.storage = function () {
        return this.theStorage;
    };

    this.userName = function () {
        return this.storage().user_name;
    };

    this.linkId = function () {
        return this.storage().link_id;
    };

    this.sessionId = function () {
        return this.storage().session_id;
    };

    this.boardSize = function () {
        return Number(this.storage().board_size);
    };

    this.stoneColor = function () {
        return this.storage().stone_color;
    };

    this.komi = function () {
        return Number(this.storage().komi);
    };

    this.handicap = function () {
        return Number(this.storage().handicap);
    };

    this.ajaxObject = function () {
        return this.theAjaxObject;
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

