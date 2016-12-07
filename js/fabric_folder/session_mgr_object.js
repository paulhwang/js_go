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
        this.theHead = null;
        this.theTail = null;
        this.theSize = 0;
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

    this.head = function () {
        return this.theHead;
    }

    this.setHead = function (val) {
        this.theHead = val;
    }

    this.tail = function () {
        return this.theTail;
    }

    this.setTail = function (val) {
        this.theTail = val;
    }

    this.size = function () {
        return this.theSize;
    }

    this.incrementSize = function () {
        this.theSize += 1;
    }

    this.decrementSize = function () {
        this.theSize -= 1;
    }

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

    this.deleteSessionFromList = function (session_val) {
        if (this.size() <= 0) {
            this.abend("deleteSessionFromList", "size=" + this.size());
            return;
        }
        if (!this.sessionExistInTheList(session_val)) {
            this.abend("deleteSessionFromList", "sessionExistInTheList is false");
            return;
        }

        this.abendIt();
        if (session_val.prev()) {
            session_val.prev().setNext(session_val.next());
        } else {
            this.setHead(session_val.next());
        }
        if (session_val.next()) {
            session_val.next().setPrev(session_val.prev());
        } else {
            this.setTail(session_val.prev());
        }
        this.decrementSize();
        this.abendIt();
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

    this.abendIt = function () {
        if (!this.debugMe()) {
            return;
        }

        var i = 0;
        var session = this.head();
        while (session) {
            session = session.next();
            i += 1;
        }
        if (i !== this.size()) {
            this.abend("abendIt", "head: size=" + this.size() + " i=" + i);
        }

        i = 0;
        session = this.tail();
        while (session) {
            session = session.prev();
            i += 1;
        }
        if (i !== this.size()) {
            this.abend("abendIt", "tail: size=" + this.size() + " i=" + i);
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

