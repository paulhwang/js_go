/*
  Copyrights reserved
  Written by Paul Hwang
*/

function LoginRootObject() {
    "use strict";

    this.init__ = function () {
        this.theLinkStorageObject = new LinkStorageObject();
        this.theAjaxObject = new LoginAjaxObject(this);
        this.theHtmlObject = new LoginHtmlObject(this);
        this.debug(true, "init__", "userName=" + this.linkStorageObject().userName() + " linkId=" + this.linkStorageObject().linkId());
    };

    this.objectName = function () {
        return "LoginRootObject";
    };

    this.nextPage = function () {
        return "http://127.0.0.1:8080/go_config.html";
    };

    this.linkStorageObject = function () {
        return this.theLinkStorageObject;
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

