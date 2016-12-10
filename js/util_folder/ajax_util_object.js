/*
  Copyrights reserved
  Written by Paul Hwang
*/

function AjaxUtilObject(root_object_val, callback_func_val) {
    "use strict";

    this.init__ = function (root_object_val, callback_func_val) {
        this.theRootObject = root_object_val;
        this.theCallbackFunc = callback_func_val;
        this.thePacketId = 1;
        this.theHttpGetRequest = new XMLHttpRequest();
        this.setupReceiveAjaxResponse();
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "AjaxUtilObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.callbackFunc = function () {
        return this.theCallbackFunc;
    };

    this.ajaxRoute = function () {
        return "/django_go/go_ajax/";
    };

    this.jsonContext = function () {
        return "application/json; charset=utf-8";
    }
    this.plainTextContext = function () {
        return "text/plain; charset=utf-8";
    }

    this.httpGetRequest = function () {
        return this.theHttpGetRequest;
    };

    this.packetId = function () {
        return this.thePacketId;
    };

    this.incrementPacketId = function () {
        this.thePacketId += 1;
    };

    this.setupReceiveAjaxResponse = function () {
        var this0 = this;
        this.httpGetRequest().onreadystatechange = function() {
            if ((this0.httpGetRequest().readyState === 4) &&
                (this0.httpGetRequest().status === 200)) {
                this0.callbackFunc().bind(this0.rootObject())(this0.httpGetRequest().responseText);
            }
        };
    };

    this.transmitAjaxRequest = function (output_val) {
        this.httpGetRequest().open("GET", this.ajaxRoute(), true);
        this.httpGetRequest().setRequestHeader("X-Requested-With", "XMLHttpRequest");
        this.httpGetRequest().setRequestHeader("Content-Type", this.jsonContext());
        this.httpGetRequest().setRequestHeader("gorequest", output_val);
        this.httpGetRequest().setRequestHeader("GOPACKETID", this.packetId());
        this.incrementPacketId();
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

    this.init__(root_object_val, callback_func_val);
}

