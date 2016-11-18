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
    };

    this.objectName = function () {
        return "SwitchObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.linkMgrObject = function () {
        return this.rootObject().linkMgrObject();
    };

    this.switchTable = function () {
        return this.theSwitchTable;
    }

    this.initSwitchTable = function () {
        this.theSwitchTable = {
            "setup_link": this.setupLinkResponse,
            "get_link_data": this.getLinkDataResponse,
            "get_name_list": this.getNameListResponse,
            "setup_session": this.setupSessionResponse,
            "setup_session_reply": this.setupSessionReplyResponse,
            "get_session_data": this.getSessionDataResponse,
            "put_session_data": this.putSessionDataResponse,
        };
    };

    this.switchAjaxResponseData = function (response_val) {
        var response = JSON.parse(response_val);
        var func = this.switchTable()[response.command];
        if (func) {
            func.bind(this)(response.data);
        }
        else {
            this.abend("switchAjaxResponseData", "bad command=" + response.command);
            return;
        }
    };

    this.setupLinkResponse = function (input_val) {
        this.debug(true, "setupLinkResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        this.linkMgrObject().mallocLinkAndInsert(data.my_name, data.link_id);
    };

    this.getLinkDataResponse = function (input_val) {
        this.debug(false, "getLinkDataResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            var link = this.linkMgrObject().searchLinkByLinkId(data.link_id);
            if (link) {
                link.getLinkDataResponse(input_val);
            }
        }
    };

    this.getNameListResponse = function (input_val) {
        this.debug(true, "getNameListResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            var link = this.linkMgrObject().searchLinkByLinkId(data.link_id);
            if (link) {
                link.getNameListResponse(input_val);
            }
        }
    };

    this.setupSessionResponse = function (input_val) {
        this.debug(true, "setupSessionResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            var link = this.linkMgrObject().searchLinkByLinkId(data.link_id);
            if (link) {
                link.setupSessionResponse(input_val);
            }
        }
    };

    this.setupSessionReplyResponse = function (input_val) {
        this.debug(true, "setupSessionReplyResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            var link = this.linkMgrObject().searchLinkByLinkId(data.link_id);
            if (link) {
                link.setupSessionReplyResponse(input_val);
            }
        }
    };

    this.putSessionDataResponse = function (input_val) {
        this.debug(true, "putSessionDataResponse", "input_val=" + input_val);
        if (!input_val) {
            return;
        }

        var data = JSON.parse(input_val);
        if (data) {
            var link = this.linkMgrObject().searchLinkByLinkId(data.link_id);
            if (link) {
                link.putSessionDataResponse(input_val);
            }
        }
    };

    this.getSessionDataResponse = function (input_val) {
        this.debug(true, "getSessionDataResponse", "input_val=" + input_val);
        if (!input_val) {
            return;
        }

        var data = JSON.parse(input_val);
        if (data) {
            var link = this.linkMgrObject().searchLinkByLinkId(data.link_id);
            if (link) {
                link.getSessionDataResponse(input_val);
            }
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
