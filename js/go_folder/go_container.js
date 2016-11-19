/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: go_container.js
 */

function GoContainerObject(session_object_val) {
    "use strict";

    this.init__ = function (session_object_val) {
        this.theSessionObject = session_object_val;
        this.theUiObject = new GoUiObject(this);
        this.theGameObject = new GoGameObject(this);
        this.thePortObject = new GoPortObject(this);
        this.debug(false, "init__", "session=" + this.sessionObject().sessionName());
    };

    this.init___ = function (config_val, initiater_val) {
        this.theConfigObject = new GoConfigObject(this, config_val, initiater_val);
        this.theBoardObject = new GoBoardObject(this);
    };

    this.objectName = function () {
        return "GoContainerObject";
    };

    this.sessionObject = function () {
        return this.theSessionObject;
    };

    this.rootObject = function () {
        return this.sessionObject().rootObject();
    };

    this.uiObject = function () {
        return this.theUiObject;
    };

    this.boardObject = function () {
        return this.theBoardObject;
    };

    this.setBoardObject = function (val) {
        this.theBoardObject = val;
    };

    this.gameObject = function () {
        return this.theGameObject;
    };

    this.portObject = function () {
        return this.thePortObject;
    };

    this.configObject = function () {
        return this.theConfigObject;
    };

    this.setConfigObject = function (val) {
        this.theConfigObject = val;
    };

    this.receiveData = function (res_data_val) {
        this.portObject().receiveData(res_data_val);
    };

    this.launchTopic = function () {
        var this0 = this;
        this.boardObject().resetBoardObjectData();
        this.rootObject().htmlObject().createPlayHolders();
        this.uiObject().initElements();
        this.uiObject().drawBoard();

        $("canvas").on("click", function(event) {
            this0.uiObject().uiClickApi(event.clientX, event.clientY);
        });

        $("canvas").on("mousemove", function(event) {
            this0.uiObject().uiMouseMove(event.clientX, event.clientY);
        });

        var addCommentFromInputBox = function () {
            var $new_comment = $("<p>");
            if ($(".comment-input input").val() !== "") {
                $new_comment.text($(".comment-input input").val());
                $new_comment.hide();
                $(".comments").append($new_comment);
                $new_comment.fadeIn();
                $(".comment-input input").val("");
            }
        };

        $(".comment-input button").on("click", function(event) {
            addCommentFromInputBox();
        });

        $(".comment-input input").on("keypress", function(event) {
            if (event.keyCode == 13) {
                addCommentFromInputBox();
            }
        });
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (debug_val) {
            this.logit(str1_val, str2_val);
        }
    };

    this.logit = function (str1_val, str2_val) {
        return this.goLogit(this.objectName() + "." + str1_val, str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return this.goAbend(this.objectName() + "." + str1_val, str2_val);
    };

    this.goLogit = function (s1_val, s2_val) {
        LOG_IT(this.sessionObject().sessionId() + s1_val, s2_val);
    };

    this.goAbend = function (s1_val, s2_val) {
        ABEND(this.sessionObject().sessionId() + s1_val, s2_val);
    };

    this.init__(session_object_val);
}
