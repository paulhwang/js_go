/*
  Copyrights reserved
  Written by Paul Hwang
*/

function ConfigRootObject() {
    "use strict";

    this.init__ = function () {
        this.theAjaxObject = new AjaxObject(this);
        this.theLinkStorageObject = new LinkStorageObject();
        this.theLinkObject = new LinkObject(this, this.linkStorageObject().userName(), this.linkStorageObject().linkId(), this.linkStorageObject().linkIdIndex());
        this.theSessionStorageObject = new SessionStorageObject();
        this.theConfigStorageObject = new GoConfigStorageObject();
        this.theHtmlObject = new ConfigHtmlObject(this);
        this.debug(true, "init__", "userName=" + this.linkStorageObject().userName() + " linkId=" + this.linkStorageObject().linkId() + " linkIdIndex=" + this.linkStorageObject().linkIdIndex());
    };

    this.objectName = function () {
        return "ConfigRootObject";
    };

    this.nextPage = function () {
        return this.linkStorageObject().serverHttpHeader() + "go_act.html";
    };

    this.linkStorageObject = function () {
        return this.theLinkStorageObject;
    };

    this.sessionStorageObject = function () {
        return this.theSessionStorageObject;
    };

    this.configStorageObject = function () {
        return this.theConfigStorageObject;
    };

    this.ajaxObject = function () {
        return this.theAjaxObject;
    };

    this.htmlObject = function () {
        return this.theHtmlObject;
    };

    this.linkObject = function () {
        return this.theLinkObject;
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (debug_val) {
            this.logit(str1_val, str2_val);
        }
    };

    this.mallocLinkObject = function (name_val, id_val) {
        /* nothing is done here */
    };

    this.logit = function (str1_val, str2_val) {
        return LOG_IT(this.objectName() + "." + str1_val, str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return ABEND(this.objectName() + "." + str1_val, str2_val);
    };

    this.init__();
}

