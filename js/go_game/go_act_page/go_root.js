/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayRootObject() {
    "use strict";

    this.init__ = function () {
        this.theAjaxObject = new AjaxObject(this);
        this.theLinkStorageObject = new LinkStorageObject();
        this.theLinkObject = new LinkObject(this, this.linkStorageObject().userName(), this.linkStorageObject().linkId(), this.linkStorageObject().linkIdIndex());
        this.theSessionStorageObject = new SessionStorageObject();
        this.theConfigStorageObject = new GoConfigStorageObject();
        this.theHtmlObject = new GoPlayHtmlObject(this);
        this.theConfigObject = new GoPlayConfigObject(this, this.configStorageObject().configInJson(), true);
        this.theBoardObject = new GoPlayBoardObject(this);
        this.thePortObject = new GoPlayPortObject(this);
        this.theGameObject = new GoPlayGameObject(this);
        this.theInputObject = new GoPlayInputObject(this);
        this.theDisplayObject = new GoPlayDisplayObject(this);

        this.theSessionObject = this.linkObject().mallocSessionAndInsert(this.sessionStorageObject().sessionId(), this.sessionStorageObject().sessionIdIndex());
        this.sessionObject().setTopicObject(this.portObject());

        this.debug(true, "init__", "userName=" + this.linkStorageObject().userName() + " linkId=" + this.linkStorageObject().linkId() + " sessionId=" + this.sessionStorageObject().sessionId());
        this.debug(true, "init__", "boardSize=" + this.configStorageObject().boardSize() + " stoneColor=" + this.configStorageObject().stoneColor() + " komi=" + this.configStorageObject().komi() + " handicap=" + this.configStorageObject().handicap());
    };

    this.objectName = function () {
        return "GoPlayRootObject";
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

    this.inputObject = function () {
        return this.theInputObject;
    };

    this.displayObject = function () {
        return this.theDisplayObject;
    };

    this.htmlObject = function () {
        return this.theHtmlObject;
    };

    this.linkObject = function () {
        return this.theLinkObject;
    };

    this.sessionObject = function () {
        return this.theSessionObject;
    };

    this.ajaxObject = function () {
        return this.theAjaxObject;
    };

    this.configObject = function () {
        return this.theConfigObject;
    };

    this.boardObject = function () {
        return this.theBoardObject;
    };

    this.gameObject = function () {
        return this.theGameObject;
    };

    this.portObject = function () {
        return this.thePortObject;
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

