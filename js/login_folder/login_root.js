/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: login_root.js
 */

function LoginRootObject() {
    "use strict";

    this.init__ = function () {
        this.theStorage = localStorage;
        //this.theAjaxObject = new AjaxObject(this);
        this.theHtmlObject = new GoHtmlObject(this);
        this.runRoot();
        this.debug(true, "init__", "userName=" + this.userName() + " linkId=" + this.linkId());
    };

    this.objectName = function () {
        return "LoginRootObject";
    };

    this.storage = function () {
        return this.theStorage;
    };

    this.userName = function () {
        return this.storage().user_name;
    };

    this.setUserName = function (val) {
        this.storage().user_name = val;
    };

    this.linkId = function () {
        return this.storage().link_id;
    };

    this.setLinkId = function (val) {
        this.storage().link_id = val;
    };

    this.htmlObject = function () {
        return this.theHtmlObject;
    };

    this.ajaxObject = function () {
        return this.theAjaxObject;
    };

    this.runRoot = function () {
        var this0 = this;
        this.htmlObject().createPreludeHolder();
        $(".prelude_holder button").on("click", function() {
            this0.setUserName($(".prelude_holder input").val());
            this0.debug(true, "runRoot", "my_name=" + this0.userName());
            if (this0.userName()) {
                //this0.ajaxObject().setupLink(this0);
                this0.setLinkId(1);
                window.open("http://127.0.0.1:8080/go_config.html", "_self")
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

