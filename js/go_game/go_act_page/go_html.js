/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayHtmlObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.theCanvasWidth = 432;
        this.initElements();
        this.setupHtmlInput();
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "GoPlayHtmlObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.configStorageObject = function () {
        return this.rootObject().configStorageObject();
    };

    this.ajaxObject = function () {
        return this.rootObject().ajaxObject();
    };

    this.inputObject = function () {
        return this.rootObject().inputObject();
    };

    this.renderNameListFuncExist = function () {
        return false;
    };

    this.canvasWidth = function () {
        return this.theCanvasWidth;
    };

    this.canvasElement = function () {
        return this.theCanvasElement;
    };

    this.canvasContext = function () {
        return this.theCanvasContext;
    };

    this.blackScoreElement = function () {
        return this.theBlackScoreElement;
    };

    this.whiteScoreElement = function () {
        return this.theWhiteScoreElement;
    };

    this.getGridLength = function () {
        return this.canvasElement().width / (this.configStorageObject().boardSize() + 1);
    };

    this.getArrowUnitLength = function () {
        return this.canvasElement().width / 20;
    };

    this.initElements = function () {
        this.theCanvasElement = window.document.getElementById("go_canvas");
        if (this.canvasElement() === null) {
            this.abend("GoUiObject", "null canvasElement");
            return;
        }
        this.canvasElement().setAttribute("style", "border:1px solid #000000;");
        this.canvasElement().width = this.canvasWidth();
        this.canvasElement().height = this.canvasWidth() * 1.1;

        this.theCanvasContext = this.canvasElement().getContext("2d");
        if (this.canvasContext() === null) {
            this.abend("GoUiObject", "null canvasContext");
            return;
        }

        this.theBlackScoreElement = window.document.getElementById("black_score");
        if (this.blackScoreElement() === null) {
            this.abend("GoUiObject", "null theBlackScoreElement");
            return;
        }

        this.theWhiteScoreElement = window.document.getElementById("white_score");
        if (this.whiteScoreElement() === null) {
            this.abend("GoUiObject", "null theWhiteScoreElement");
            return;
        }
    };


    this.setupHtmlInput = function (str1_val, str2_val) {
        var this0 = this;

        $("canvas").on("click", function(event) {
            this0.inputObject().uiClick(event.clientX, event.clientY);
        });

        $("canvas").on("mousemove", function(event) {
            this0.inputObject().uiMouseMove(event.clientX, event.clientY);
        });
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

