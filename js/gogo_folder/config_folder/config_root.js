/*
  Copyrights reserved
  Written by Paul Hwang
*/

function ConfigRootObject() {
    "use strict";

    this.init__ = function () {
        this.theLinkStorageObject = new LinkStorageObject();
        this.theSessionStorageObject = new SessionStorageObject();
        this.theStorageObject = new GoConfigStorageObject();
        this.theAjaxObject = new ConfigAjaxObject(this);
        this.theHtmlObject = new ConfigHtmlObject(this);
        this.debug(true, "init__", "userName=" + this.linkStorageObject().userName() + " linkId=" + this.linkStorageObject().linkId());
    };

    this.objectName = function () {
        return "ConfigRootObject";
    };

    this.linkStorageObject = function () {
        return this.theLinkStorageObject;
    };

    this.sessionStorageObject = function () {
        return this.theSessionStorageObject;
    };

    this.storageObject = function () {
        return this.theStorageObject;
    };

    this.ajaxObject = function () {
        return this.theAjaxObject;
    };

    this.htmlObject = function () {
        return this.theHtmlObject;
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

