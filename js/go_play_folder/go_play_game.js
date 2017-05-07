/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayGameObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "GoPlayGameObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.storageObject = function () {
        return this.rootObject().storageObject();
    };

    this.isMyTurn = function () {
        return true;
    };

    this.enterGameFromUi = function (x_val, y_val) {

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

