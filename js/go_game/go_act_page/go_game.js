/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayGameObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.theBlackCaptureStones = 0;
        this.theWhiteCaptureStones = 0;
        this.theLastDeadX = 0;
        this.theLastDeadY = 0;
        this.theValidLastDeadInfo = false;
        this.theBlackScoreString = null;
        this.theWhiteScoreString = null;
        this.theFinalScoreString = null;
        this.theTotalMoves = 0;
        this.theNextColor = GO.BLACK_STONE();
        this.theGameIsOver = false;
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "GoPlayGameObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.linkStorageObject = function () {
        return this.rootObject().linkStorageObject();
    };

    this.sessionStorageObject = function () {
        return this.rootObject().sessionStorageObject();
    };

    this.storageObject = function () {
        return this.rootObject().storageObject();
    };

    this.configObject = function () {
        return this.rootObject().configObject();
    };

    this.boardObject = function () {
        return this.rootObject().boardObject();
    };

    this.portObject = function () {
        return this.rootObject().portObject();
    };

    this.sessionObject = function () {
        return this.rootObject().sessionObject();
    };

    this.totalMoves = function () {
        return this.theTotalMoves;
    };

    this.setTotalMoves = function (total_moves_val) {
        this.theTotalMoves = total_moves_val;
    };

    this.nextColor = function () {
        return this.theNextColor;
    };

    this.setNextColor = function (next_color_val) {
        this.theNextColor = next_color_val;
    };

    this.gameIsOver = function () {
        return this.theGameIsOver;
    };

    this.setGameIsOver = function () {
        this.theGameIsOver = true;
    };

    this.clearGameIsOver = function () {
        this.theGameIsOver = false;
    };

    this.lastDeadX = function () {
        return this.theLastDeadX;
    };

    this.setLastDeadX = function (val) {
        this.theLastDeadX = val;
    };

    this.lastDeadY = function () {
        return this.theLastDeadY;
    };

    this.setLastDeadY = function (val) {
        this.theLastDeadY = val;
    };

    this.validLastDeadInfo = function () {
        return this.theValidLastDeadInfo;
    };

    this.setValidLastDeadInfo = function (val) {
        this.theValidLastDeadInfo = val;
    };

    this.blackScoreString = function () {
        return this.theBlackScoreString;
    }

    this.setBlackScoreString = function (val) {
        this.theBlackScoreString = val;
    }

    this.whiteScoreString = function () {
        return this.theWhiteScoreString;
    }

    this.setWhiteScoreString = function (val) {
        this.theWhiteScoreString = val;
    }

    this.finalScoreString = function () {
        return this.theFinalScoreString;
    }

    this.setFinalScoreString = function (val) {
        this.theFinalScoreString = val;
    }

    this.enterGameFromUi = function (x_val, y_val) {
        this.debug(true, "enterGameFromUi", "(" + x_val + "," + y_val + ")");

        if (this.gameIsOver()) {
            var move = new GoMoveObject(null, x_val, y_val, GO.THE_MARK_DEAD_STONE_DIFF, this.totalMoves(), this.containerObject());
            this.portObject().transmitMoveData(move);
            return;
        }

        if (!this.isValidMoveOnBoard(x_val, y_val)) {
            return;
        }
        var move = new GoMoveObject(null, x_val, y_val, this.nextColor(), this.totalMoves() + 1, this.rootObject());
        this.portObject().transmitMoveData(move);

    };

    this.processDoubleBackwardMoveFromUi = function () {
        this.portObject().transmitSpecialMoveData(GO.DOUBLE_BACKWARD_MOVE());
    };

    this.processBackwardMoveFromUi = function () {
        this.portObject().transmitSpecialMoveData(GO.BACKWARD_MOVE());
    };

    this.processForwardMoveFromUi = function () {
        this.portObject().transmitSpecialMoveData(GO.FORWARD_MOVE());
    };

    this.processDoubleForwardMoveFromUi = function () {
        this.portObject().transmitSpecialMoveData(GO.DOUBLE_FORWARD_MOVE());
    };

    this.processPassMoveFromUi = function () {
        this.portObject().transmitSpecialMoveData(GO.PASS_MOVE());
    };

    this.processConfirmMoveFromUi = function () {
        this.portObject().transmitSpecialMoveData(GO.CONFIRM_MOVE());
    };

    this.processResignMoveFromUi = function () {
        this.portObject().transmitSpecialMoveData(GO.RESIGN_MOVE());
    };

    this.processPlayAnotherGameMoveFromUi = function () {
        this.portObject().transmitSpecialMoveData(GO.PLAY_ANOTHER_GAME_MOVE());
    };

    this.processBackToPlayMoveFromUi = function () {
        this.portObject().transmitSpecialMoveData(GO.BACK_TO_PLAY_MOVE());
    };

    this.isValidMoveOnBoard = function (x_val, y_val) {
        if (this.boardObject().boardArray(x_val, y_val) !== GO.EMPTY_STONE()) {
            return false;
        }

        if (this.validLastDeadInfo() && (x_val === this.lastDeadX()) && (y_val === this.lastDeadY())) {
            return false;
        }
        return true;
    };

    this.playBothSides = function () {
        this.logit("playBothSides", "userName=" + this.linkStorageObject().userName() + " hisName=" + this.sessionStorageObject().hisName());
        return (this.linkStorageObject().userName() === this.sessionStorageObject().hisName());
    };

    this.isMyTurn = function () {
        if (this.playBothSides()) {
            return true;
        }

        this.debug(true, "isMyTurn", "nextColor=" + this.nextColor() + ", myColor=" + this.configObject().myColor());
        if (this.nextColor() === this.configObject().myColor()) {
            return true;
        } else {
            return false;
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

