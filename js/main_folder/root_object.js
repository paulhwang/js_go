/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: root.js
 */

function RootObject() {
    "use strict";

    this.init__ = function () {
        this.theAjaxObject = new AjaxObject(this);
        this.theHtmlObject = new GoHtmlObject(this);
        this.theLinkObject = null;
        this.theMyName = "";
        this.runRoot();
        this.debug(false, "init__", "");
    };

    this.objectName = function () {
        return "RootObject";
    };

    this.htmlObject = function () {
        return this.theHtmlObject;
    };

    this.ajaxObject = function () {
        return this.theAjaxObject;
    };

    this.linkObject = function () {
        return this.theLinkObject;
    };

    this.setLinkObject = function (val) {
        this.theLinkObject = val;
    };

    this.myName = function () {
        return this.theMyName;
    };

    this.setMyName = function (val) {
        this.theMyName = val;
    };

    this.languageUsed = function () {
        return this.theLanguageUsed;
    };

    this.setLanguageUsed = function (val) {
        this.theLanguageUsed = val;
    };

    this.mallocLinkObject = function (my_name_val, link_id_val) {
        this.setLinkObject(new LinkObject(this, my_name_val, link_id_val));
    };

    this.runRoot = function () {
        var this0 = this;
        this.htmlObject().createPreludeHolder();
        $(".prelude_holder button").on("click", function() {
            this0.setMyName($(".prelude_holder input").val());
            this0.setLanguageUsed($(".prelude_holder select").val());
            this0.debug(false, "runRoot", "my_name=" + this0.myName() + " language=" + this0.languageUsed());
            if (this0.myName()) {
                this0.ajaxObject().setupLink(this0);
            }
        });
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

