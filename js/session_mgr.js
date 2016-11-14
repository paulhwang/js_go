/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: SessionMgrObject.js
 */

function SessionMgrObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.theSessionQueue = new QueueObject(this.utilObject());
        this.theHead = null;
        this.theTail = null;
        this.theSize = 0;
    };

    this.objectName = function () {
        return "SessionMgrObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.utilObject = function () {
        return this.rootObject().utilObject();
    };

    this.ajxObject = function () {
        return this.rootObject().ajaxObject();
    };

    this.sessionQueue = function () {
        return this.theSessionQueue;
    };

    this.queueSize = function () {
        return this.sessionQueue().size();
    };

    this.enQueue = function (session_val) {
        if (!session_val) {
            this.abend("enQueue", "null input");
            return;
        }
        this.sessionQueue().enQueue(session_val);
    };

    this.deQueue = function () {
        var session = this.sessionQueue().deQueue();
        return session;
    };

    this.transmitData = function () {
        var holder = this.sessionQueue().head();
        while (holder) {
            var session = holder.data();
            session.transmitData();
            holder = holder.next();
        }
    };

    this.insertSessionToList = function (session_val) {
        if (!session_val) {
            this.abend("enQueue", "null session_val");
            return;
        }

        this.abendIt();

        this.incrementSize();
        if (!this.head()) {
            session_val.setPrev(null);
            session_val.setNext(null);
            this.setHead(session_val);
            this.setTail(session_val);
        } else {
            this.tail().setNext(session_val);
            session_val.setPrev(this.tail());
            session_val.setNext(null);
            this.setTail(session_val);
        }
        this.abendIt();
    };

    this.abend = function (str1_val, str2_val) {
        return this.utilObject().utilAbend(this.objectName() + "." + str1_val, str2_val);
    };

    this.logit = function (str1_val, str2_val) {
        return this.utilObject().utilLogit(this.objectName() + "." + str1_val, str2_val);
    };

    this.init__(root_object_val);
}

