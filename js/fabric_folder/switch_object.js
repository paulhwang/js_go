/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: SwitchObject.js
 */

function SwitchObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.debug(false, "init__", "");
    };

    this.debugInput = function () {
        return false;
    };

    this.objectName = function () {
        return "SwitchObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.linkObject = function () {
        return this.rootObject().linkObject();
    };

    this.switchAjaxResponseData = function (json_response_val) {
        var response = JSON.parse(json_response_val);
        if (response.command === "setup_link") {
            this.setupLinkResponse(response.data);
        } else {
            this.linkObject().parseAjaxResponseData(response);
        }
    };

    this.setupLinkResponse = function (input_val) {
        this.debug(true, "setupLinkResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        this.rootObject().mallocLinkObject(data.my_name, data.link_id);
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
