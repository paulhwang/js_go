function LoginRootObject() {
    "use strict";

    this.init__ = function () {
        this.theStorage = localStorage;
        this.thePassWord = null;
        //this.theAjaxObject = new AjaxObject(this);
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

    this.passWord = function () {
        return this.thePassWord;
    };

    this.setPassWord = function (val) {
        this.thePassWord = val;
    };

    this.linkId = function () {
        return this.storage().link_id;
    };

    this.setLinkId = function (val) {
        this.storage().link_id = val;
    };

    this.ajaxObject = function () {
        return this.theAjaxObject;
    };

    this.runRoot = function () {
        var this0 = this;
        $(".login_section .login_button").on("click", function() {
            this0.setUserName($(".login_section .login_name").val());
            this0.setPassWord($(".login_section .login_password").val());
            this0.debug(true, "runRoot", "userName=" + this0.userName() + " passWord=" + this0.passWord());
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

