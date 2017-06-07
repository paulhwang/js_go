/*
  Copyrights reserved
  Written by Paul Hwang
*/

function ConfigAjaxObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.theAjaxUtilObject = new AjaxUtilObject(this, this.switchAjaxResponseData);
        this.getNameList();
        this.debug(true, "init__", "=============================================");
    };

    this.objectName = function () {
        return "ConfigAjaxObject";
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

    this.sessionStorageObject = function () {
        return this.rootObject().sessionStorageObject();
    };

    this.configStorageObject = function () {
        return this.rootObject().configStorageObject();
    };

    this.htmlObject = function () {
        return this.rootObject().htmlObject();
    };

    this.switchAjaxResponseData = function (json_response_val) {
        var response = JSON.parse(json_response_val);
        this.debug(true, "switchAjaxResponseData", "command=" + response.command + " data=" + response.data);
        if (response.command === "get_name_list") {
            this.getNameListResponse(response.data);
        }
        else if (response.command === "setup_session") {
            this.setupSessionResponse(response.data);
        }
        else {
            this.abend("switchAjaxResponseData", "not get_name_list");
        }
    };

    this.getNameListResponse = function (input_val) {
        this.debug(true, "getNameListResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            if (data.name_list) {
                this.configStorageObject().setNameList(data.name_list);
                this.htmlObject().renderNameList();
            }
        }
    };

    this.getNameList = function () {
        var output = JSON.stringify({
                        command: "get_name_list",
                        my_name: this.linkStorageObject().userName(),
                        link_id: this.linkStorageObject().linkId(),
                        link_id_index: this.linkStorageObject().linkIdIndex(),
                        });
        this.debug(true, "getNameList", "output=" + output);
        this.ajaxUtilObject().transmitAjaxRequest(output);
    };

    this.setupSessionResponse = function (input_val) {
        this.debug(true, "setupSessionResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            this.sessionStorageObject().setSessionId(data.session_id);
            this.debug(true, "setupSessionResponse", "sessionId=" + this.sessionStorageObject().sessionId());
            window.open(this.rootObject().nextPage(), "_self")
        }
    };

    this.setupSession = function (link_val, topic_data_val, his_name_val) {
        var output = JSON.stringify({
                        command: "setup_session",
                        my_name: this.linkStorageObject().userName(),
                        link_id: this.linkStorageObject().linkId(),
                        link_id_index: this.linkStorageObject().linkIdIndex(),
                        his_name: his_name_val,
                        topic_data: topic_data_val,
                        });
        this.debug(true, "setupSession", "output=" + output);
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

