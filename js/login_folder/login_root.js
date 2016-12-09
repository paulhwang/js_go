function LoginRootObject() {
    "use strict";

    this.init__ = function () {
        this.theStorage = localStorage;
        this.theAjaxUtilObject = new AjaxUtilObject(this, this.switchAjaxResponseData);
        this.thePassWord = null;
        this.setupHtmlInput();
        this.debug(true, "init__", "userName=" + this.userName() + " linkId=" + this.linkId());
    };

    this.objectName = function () {
        return "LoginRootObject";
    };

    this.ajaxUtilObject = function () {
        return this.theAjaxUtilObject;
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
        return Number(this.storage().link_id);
    };

    this.setLinkId = function (val) {
        this.storage().link_id = val;
    };

    this.switchAjaxResponseData = function (json_response_val) {
        var response = JSON.parse(json_response_val);
        if (response.command === "setup_link") {
            this.debug(true, "switchAjaxResponseData", "command=" + response.command + " data=" + response.data);
            var data = JSON.parse(response.data);
            this.setLinkId(data.link_id);
            window.open("http://127.0.0.1:8080/go_config.html", "_self")
        } else {
            this.abend("switchAjaxResponseData", "not setup_link");
        }
    };

    this.setupHtmlInput = function () {
        var this0 = this;
        $(".login_section .login_button").on("click", function() {
            this0.setUserName($(".login_section .login_name").val());
            this0.setPassWord($(".login_section .login_password").val());
            this0.debug(true, "runRoot", "userName=" + this0.userName() + " passWord=" + this0.passWord());
            if (this0.userName()) {
                this0.setupLink();
            }
        });
    };

    this.setupLink = function () {
        var output = JSON.stringify({
                        command: "setup_link",
                        my_name: this.userName(),
                        password: this.passWord(),
                        });
        this.debug(true, "setupLink", "output=" + output);
        this.ajaxUtilObject().transmitAjaxRequest(output);
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

