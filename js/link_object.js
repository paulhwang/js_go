/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: LinkObject.js
 */

function LinkObject(link_mgr_object_val, link_id_val) {
    "use strict";

    this.init__ = function (link_mgr_object_val, link_id_val) {
        this.theLinkMgrObject = link_mgr_object_val;
        this.theLinkId = link_id_val;
        this.thePrev = null;
        this.theNext = null;
    };

    this.objectName = function () {
        return "LinkObject";
    };

    this.linkMgrObject = function () {
        return this.theLinkMgrObject;
    };

    this.rootObject = function () {
        return this.linkMgrObject().rootObject();
    };

    this.ajaxObject = function () {
        return this.rootObject().ajaxObject();
    };

    this.prev = function () {
        return this.thePrev;
    };

    this.setPrev = function (val) {
        this.thePrev = val;
    };

    this.next = function () {
        return this.theNext;
    };

    this.setNext = function (val) {
        this.theNext = val;
    };

    this.linkId = function () {
        return this.theLinkId;
    };

    this.ajaxId = function () {
        return this.rootObject().ajaxId() + ":" + this.sessionId();
    };

    this.setLinkId = function (val) {
        if (this.linkId()) {
            this.abend("setLinkId", "already exist");
        }
        this.theLinkId = val;
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (!debug_val) {
            return;
        }
        return this.utilObject().utilLogit(this.objectName() + "." + str1_val + "==", str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return this.utilObject().utilabend(this.objectName() + "." + str1_val, str2_val);
    };

    this.logit = function (str1_val, str2_val) {
        return this.utilObject().utilLogit(this.objectName() + "." + str1_val, str2_val);
    };

    this.init__(link_mgr_object_val, link_id_val);
}

