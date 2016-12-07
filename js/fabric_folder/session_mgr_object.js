/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: SessionMgrObject.js
 */

function SessionMgrObject(link_object_val) {
    "use strict";

    this.init__ = function (link_object_val) {
        this.theLinkObject = link_object_val;
        this.theSessionIndexArray = [0];
        this.theSessionTableArray = [null];
        this.debug(false, "init__", "link_id=" + this.linkObject().linkId());
    };

    this.debugMe = function () {
        return true;
    };

    this.objectName = function () {
        return "SessionMgrObject";
    };

    this.linkObject = function () {
        return this.theLinkObject;
    };

    this.sessionIndexArray = function () {
        return this.theSessionIndexArray;
    };

    this.sessionTableArray = function () {
        return this.theSessionTableArray;
    };

    this.sessionTableArrayLength = function () {
        return this.sessionTableArray().length;
    };

    this.sessionTableArrayElement = function (val) {
        return this.sessionTableArray()[val];
    };

    this.mallocSessionAndInsert = function (session_id_val) {
        var session = new SessionObject(this, session_id_val);
        if (!session) {
            return null;
        }
        this.sessionIndexArray().push(session.sessionId());
        this.sessionTableArray().push(session);
        return session;
    };

    this.getSession = function (session_id_val) {
        var index = this.sessionIndexArray().indexOf(session_id_val);
        if (index === -1) {
            return null;
        } else {
            var session =this.sessionTableArray()[index];
            return session;
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

    this.init__(link_object_val);
}

