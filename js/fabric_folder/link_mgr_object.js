/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: LinkMgrObject.js
 */

function LinkMgrObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.theLinkObject = null;
        this.theHead = null;
        this.theTail = null;
        this.theSize = 0;
        this.debug(false, "init__", "");
    };

    this.debugMe = function () {
        return true;
    };

    this.objectName = function () {
        return "LinkMgrObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.linkObject = function () {
        return this.theLinkObject;
    };

    this.setLinkObject = function (val) {
        this.theLinkObject = val;
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

    this.mallocLinkAndInsert = function (my_name_val, link_id_val) {
        var link = new LinkObject(this, my_name_val, link_id_val);
        if (!link) {
            return null;
        }
        this.setLinkObject(link);
        return link;
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

