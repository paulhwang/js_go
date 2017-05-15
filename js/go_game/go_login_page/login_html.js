/*
  Copyrights reserved
  Written by Paul Hwang
*/

function LoginHtmlObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.setupHtmlInput();
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "LoginHtmlObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.linkStorageObject = function () {
        return this.rootObject().linkStorageObject();
    };

    this.ajaxObject = function () {
        return this.rootObject().ajaxObject();
    };

    this.setupHtmlInput = function () {
        var this0 = this;
        $(".login_section .login_button").on("click", function() {
            this0.linkStorageObject().setUserName($(".login_section .login_name").val());
            this0.linkStorageObject().setPassWord($(".login_section .login_password").val());
            this0.debug(true, "setupHtmlInput", "userName=" + this0.linkStorageObject().userName() + " passWord=" + this0.linkStorageObject().passWord());
            if (this0.linkStorageObject().userName()) {
                this0.ajaxObject().setupLink();
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

    this.init__(root_object_val);
}

