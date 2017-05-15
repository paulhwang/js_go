/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

function GoPlayConfigObject(root_val, config_val, initiater_val) {
    "use strict";

    this.init__ = function (root_val, config_val, initiater_val) {
        this.theRootObject = root_val;
        this.debug(true, "setupConfiguration", "config=" + config_val);

        var config = JSON.parse(config_val);
        this.setBoardSize(config.board_size);
        this.setKomiPoint(config.komi);
        this.setHandicapPoint(config.handicap);
        this.setMyColor(config.color);

        if (!initiater_val) {
            this.setMyColor_(GO.getOppositeColor(this.myColor()));
        }
        this.debug(true, "init__", "size=" + this.boardSize() + " color=" + this.myColor() + " handicap=" + this.handicapPoint());
    };

    this.objectName = function () {
        return "GoPlayConfigObject";
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

    this.configStorageObject = function () {
        return this.rootObject().configStorageObject();
    };

    this.storageObject = function () {
        return this.rootObject().storageObject();
    };

    this.sessionObject = function () {
        return this.rootObject().sessionObject();
    };

    this.gameObject = function () {
        return this.rootObject().gameObject();
    };

    this.myName = function () {
        return this.linkStorageObject().userName();
    };

    this.opponentName = function () {
        return this.sessionObject().hisName();
    };

    this.boardSize = function () {
        return this.theBoardSize;
    };

    this.setBoardSize = function (val) {
        this.theBoardSize = Number(val);
    };

    this.myColor = function () {
        return this.theMyColor;
    };

    this.hisColor = function () {
        if (this.theMyColor === GO.BLACK_STONE()) {
            return GO.WHITE_STONE();
        }
        else {
            return GO.BLACK_STONE();
        }
    };

    this.setMyColor = function (val) {
        if (val === "black") {
            this.theMyColor = GO.BLACK_STONE();
        } else if (val === "white") {
            this.theMyColor = GO.WHITE_STONE();
        } else {
            this.abend("setMyColor", val);
        }
    };

    this.setMyColor_ = function (val) {
        this.theMyColor = Number(val);
    };

    this.handicapPoint = function () {
        return this.theHandicapPoint;
    };

    this.setHandicapPoint = function (val) {
        this.theHandicapPoint = Number(val);
    };

    this.komiPoint = function () {
        return this.theKomiPoint;
    };

    this.setKomiPoint = function (val) {
        this.theKomiPoint = Number(val);
    };

    this.realKomiPoint = function () {
        if (!this.theKomiPoint) {
            return 0;
        }
        return this.theKomiPoint + 0.5;
    };

    this.isValidCoordinate = function (data_val) {
        return (0 <= coordinate_val) && (coordinate_val < board_size_val);
        if (data_val < 0) {
            GO.goAbend("GoBoardObject.isValidCoordinate", data_val);
            return false;
        }
        if (data_val >= this.boardSize()) {
            GO.goAbend("GoBoardObject.isValidCoordinate", data_val);
            return false;
        }
        return true;
    };

    this.isValidCoordinates = function (x_val, y_val) {
        return this.isValidCoordinate(x_val) && this.isValidCoordinate(y_val) ;
    };

    this.isValidCoordinate = function (coordinate_val) {
        return (0 <= coordinate_val) && (coordinate_val < this.boardSize());
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

    this.init__(root_val, config_val, initiater_val);
}
