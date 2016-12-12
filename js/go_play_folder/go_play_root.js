/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayRootObject() {
    "use strict";

    this.init__ = function () {
        this.theStorageObject = new GoPlayStorageObject();
        this.theHtmlObject = new GoPlayHtmlObject(this);
        this.theInputObject = new GoPlayInputObject(this);
        this.theDisplayObject = new GoPlayDisplayObject(this);
        this.theAjaxObject = new GoPlayAjaxObject(this);
        this.debug(true, "init__", "userName=" + this.storageObject().userName() + " linkId=" + this.storageObject().linkId());
        this.debug(true, "init__", "boardSize=" + this.storageObject().boardSize() + " stoneColor=" + this.storageObject().stoneColor() + " komi=" + this.storageObject().komi() + " handicap=" + this.storageObject().handicap());
    };

    this.objectName = function () {
        return "GoPlayRootObject";
    };

    this.storageObject = function () {
        return this.theStorageObject;
    };

    this.inputObject = function () {
        return this.theInputObject;
    };

    this.displayObject = function () {
        return this.theDisplayObject;
    };

    this.htmlObject = function () {
        return this.theHtmlObject;
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

