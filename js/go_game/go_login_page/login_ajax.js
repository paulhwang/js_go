/*
  Copyrights reserved
  Written by Paul Hwang
*/

function LoginAjaxObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.theAjaxUtilObject = new AjaxUtilObject(this, this.switchAjaxResponseData);
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "LoginAjaxObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.ajaxUtilObject = function () {
        return this.theAjaxUtilObject;
    };

    this.linkStorageObject = function () {
        return this.rootObject().linkStorageObject();
    };

    this.switchAjaxResponseData = function (json_response_val) {
        var response = JSON.parse(json_response_val);
        if (response.command === "setup_link") {
            this.debug(true, "switchAjaxResponseData", "command=" + response.command + " data=" + response.data);
            var data = JSON.parse(response.data);
            this.linkStorageObject().setLinkId(data.link_id);
            this.linkStorageObject().setLinkIdIndex(data.link_id_index);
            window.open(this.rootObject().nextPage(), "_self")
        } else {
            this.abend("switchAjaxResponseData", "not setup_link");
        }
    };

    this.setupLink = function () {
        var output = JSON.stringify({
                        command: "setup_link",
                        my_name: this.linkStorageObject().userName(),
                        password: this.linkStorageObject().passWord(),
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

    this.init__(root_object_val);
}

