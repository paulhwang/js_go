function LoginRootObject() {
    "use strict";

    this.init__ = function () {
        this.theStorage = localStorage;
        this.thePassWord = null;
        this.thePacketId = 1;
        this.theHttpGetRequest = new XMLHttpRequest();
        this.setupReceiveAjaxResponse();
        //this.theAjaxObject = new AjaxObject(this);
        this.runRoot();
        this.debug(true, "init__", "userName=" + this.userName() + " linkId=" + this.linkId());
    };

    this.objectName = function () {
        return "LoginRootObject";
    };

    this.ajaxRoute = function () {
        return "/django_go/go_ajax/";
    };

    this.jsonContext = function () {
        return "application/json; charset=utf-8";
    }

    this.httpGetRequest = function () {
        return this.theHttpGetRequest;
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

    this.setupReceiveAjaxResponse = function () {
        var this0 = this;
        this.httpGetRequest().onreadystatechange = function() {
            this0.debug(true, "setupReceiveAjaxResponse", "aaa");
            if ((this0.httpGetRequest().readyState === 4) &&
                (this0.httpGetRequest().status === 200)) {
                this0.switchAjaxResponseData(this0.httpGetRequest().responseText);
            }
        };
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

    this.runRoot = function () {
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
                        });
        this.debug(true, "setupLink", "output=" + output);
        this.transmitAjaxRequest(output);
    };

    this.packetId = function () {
        return this.thePacketId;
    };

    this.incrementPacketId = function () {
        this.thePacketId += 1;
    };

    this.transmitAjaxRequest = function (output_val) {
        this.httpGetRequest().open("GET", this.ajaxRoute(), true);
        this.httpGetRequest().setRequestHeader("X-Requested-With", "XMLHttpRequest");
        this.httpGetRequest().setRequestHeader("Content-Type", this.jsonContext());
        this.httpGetRequest().setRequestHeader("gorequest", output_val);
        this.httpGetRequest().send(null);
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

