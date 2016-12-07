/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: SwitchObject.js
 */

function SwitchObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.initSwitchTable();
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

    this.switchTable = function () {
        return this.theSwitchTable;
    }

    this.initSwitchTable = function () {
        this.theSwitchTable = {
            "get_link_data": this.getLinkDataResponse,
            "get_name_list": this.getNameListResponse,
            "setup_session": this.setupSessionResponse,
            "setup_session_reply": this.setupSessionReplyResponse,
            "get_session_data": this.getSessionDataResponse,
            "put_session_data": this.putSessionDataResponse,
        };
    };

    this.switchAjaxResponseData = function (json_response_val) {
        var response = JSON.parse(json_response_val);
        if (response.command === "setup_link") {
            this.setupLinkResponse(response.data);
        } else {
            this.parseAjaxResponseData(response);
        }
    };

    this.parseAjaxResponseData = function (response_val) {
        var func = this.switchTable()[response_val.command];
        if (func) {
            func.bind(this)(response_val.data);
        }
        else {
            this.abend("switchAjaxResponseData", "bad command=" + response_val.command);
            return;
        }
    };

    this.setupLinkResponse = function (input_val) {
        this.debug_(true, this.debugInput(), "setupLinkResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        this.rootObject().mallocLinkObject(data.my_name, data.link_id);
    };

    this.getLinkDataResponse = function (input_val) {
        this.debug_(false, this.debugInput(), "getLinkDataResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            if (this.linkObject().linkId() !== data.link_id) {
                this.abend("getLinkDataResponse", "linkId=" + data.link_id);
                return;
            }
            this.linkObject().getLinkDataResponse(input_val);
        }
    };

    this.getNameListResponse = function (input_val) {
        this.debug_(true, this.debugInput(), "getNameListResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            if (this.linkObject().linkId() !== data.link_id) {
                this.abend("getNameListResponse", "linkId=" + data.link_id);
                return;
            }
            this.linkObject().getNameListResponse(input_val);
        }
    };

    this.setupSessionResponse = function (input_val) {
        this.debug_(true, this.debugInput(), "setupSessionResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            if (this.linkObject().linkId() !== data.link_id) {
                this.abend("setupSessionResponse", "linkId=" + data.link_id);
                return;
            }
            this.linkObject().setupSessionResponse(input_val);
        }
    };

    this.setupSessionReplyResponse = function (input_val) {
        this.debug_(true, this.debugInput(), "setupSessionReplyResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            this.linkObject().setupSessionReplyResponse(input_val);
        }
    };

    this.putSessionDataResponse = function (input_val) {
        this.debug_(true, this.debugInput(), "putSessionDataResponse", "input_val=" + input_val);
        if (!input_val) {
            return;
        }

        var data = JSON.parse(input_val);
        if (data) {
            this.linkObject().putSessionDataResponse(input_val);
        }
    };

    this.getSessionDataResponse = function (input_val) {
        this.debug_(true, this.debugInput(), "getSessionDataResponse", "input_val=" + input_val);
        if (!input_val) {
            return;
        }

        var data = JSON.parse(input_val);
        if (data) {
            this.linkObject().getSessionDataResponse(input_val);
        }
    };
 
    this.debug_ = function (debug_val, debug_val_, str1_val, str2_val) {
        if (debug_val && debug_val_) {
            this.logit(str1_val, str2_val);
        }
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
