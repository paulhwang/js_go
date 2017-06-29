/*
 * Copyrights phwang
 * Written by Paul Hwang
 */

function GoPlayBoardObject(root_val) {
    "use strict";

    this.init__ = function (root_val) {
        this.theRootObject = root_val;
        this.theBoardArray = [19];
        this.theMarkedBoardArray = [19];
        var i = 0;
        while (i < 19) {
            this.theBoardArray[i] = [19];
            this.theMarkedBoardArray[i] = [19];
            i += 1;
        }
        this.resetBoardObjectData();
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "GoPlayBoardObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.configObject = function () {
        return this.rootObject().configObject();
    };

    this.gameObject = function () {
        return this.rootObject().gameObject();
    };

    this.boardSize = function () {
        return this.configObject().boardSize();
    };

    this.blackCapturedStones = function () {
        return this.theBlackCapturedStones;
    };

    this.whiteCapturedStones = function () {
        return this.theWhiteCapturedStones;
    };

    this.boardArray = function (x_val, y_val) {
        return this.theBoardArray[x_val][y_val];
    };

    this.markedBoardArray = function (x_val, y_val) {
        return this.theMarkedBoardArray[x_val][y_val];
    };

    this.setBoardArray = function (x_val, y_val, data_val) {
        this.theBoardArray[x_val][y_val] = data_val;
    };

    this.setMarkedBoardArray = function (x_val, y_val, data_val) {
        this.theMarkedBoardArray[x_val][y_val] = data_val;
    };

    this.addStoneToBoard = function (x_val, y_val, color_val) {
        if (!GO.isValidCoordinates(x_val, y_val, this.configObject().boardSize())) {
            this.goAbend("addStoneToBoard", "x=" + x_val + " y=" + y_val);
            return;
        }

        this.setBoardArray(x_val, y_val, color_val);
    };

    this.addStoneToMarkedBoard = function (x_val, y_val, color_val) {
        if (!GO.isValidCoordinates(x_val, y_val, this.configObject().boardSize())) {
            this.goAbend("addStoneToMarkedBoard", "x=" + x_val + " y=" + y_val);
            return;
        }

        this.setMarkedBoardArray(x_val, y_val, color_val);
    };

    this.removeStoneFromMarkedBoard = function (x_val, y_val) {
        if (!GO.isValidCoordinates(x_val, y_val, this.configObject().boardSize())) {
            this.goAbend("addStoneToMarkedBoard", "x=" + x_val + " y=" + y_val);
            return;
        }

        this.setMarkedBoardArray(x_val, y_val, GO.EMPTY_STONE());
    };

    this.isEmptySpace = function (x_val, y_val) {
        if (!GO.isValidCoordinates(x_val, y_val, this.configObject().boardSize())) {
            return false;
        }
        if (this.boardArray(x_val, y_val) !== GO.EMPTY_STONE()) {
            return false;
        }
        return true;
    };

    this.encodeBoard = function () {
        var buf = "";
        var i, j;

        i = 0;
        while (i < this.boardSize()) {
            j = 0;
            while (j < this.boardSize()) {
                buf = buf + this.theBoardArray[i][j];
                j += 1;
            }
            i += 1;
        }
        this.logit("encodeBoard", "data=" + buf);
        return buf;
    };

    this.decodeBoard = function (str_val) {
        //this.logit("decodeBoard", "input=" + str_val);
        var index = 0;
        var num;
        var i, j;

        num  = (str_val.charAt(index++) - '0') * 100;
        num += (str_val.charAt(index++) - '0') * 10;
        num += (str_val.charAt(index++) - '0');
        this.gameObject().setTotalMoves(num);

        num = (str_val.charAt(index++) - '0');
        this.gameObject().setNextColor(num);

        i = 0;
        while (i < this.boardSize()) {
            j = 0;
            while (j < this.boardSize()) {
                this.theBoardArray[i][j] = str_val.charAt(index++) - '0';
                j += 1;
            }
            i += 1;
        }

        num  = (str_val.charAt(index++) - '0') * 100;
        num += (str_val.charAt(index++) - '0') * 10;
        num += (str_val.charAt(index++) - '0');
        this.theBlackCapturedStones = num;
        num  = (str_val.charAt(index++) - '0') * 100;
        num += (str_val.charAt(index++) - '0') * 10;
        num += (str_val.charAt(index++) - '0');
        this.theWhiteCapturedStones = num;

        num  = (str_val.charAt(index++) - '0') * 10;
        num += (str_val.charAt(index++) - '0');
        this.gameObject().setLastDeadX(num);
        num  = (str_val.charAt(index++) - '0') * 10;
        num += (str_val.charAt(index++) - '0');
        this.gameObject().setLastDeadY(num);
        if (num != 19) {
            this.gameObject().setValidLastDeadInfo(true);
        } else {
            this.gameObject().setValidLastDeadInfo(false);
        }
    };

    this.compareBoards = function (board_val) {
        var i, j;

        i = 0;
        while (i < this.boardSize()) {
            j = 0;
            while (j < this.boardSize()) {
                if (this.theBoardArray[i][j] !== board_val.theBoardArray[i][j]) {
                    this.abend("compareBoards", "(" + i + "," + j + ")");
                }
                j += 1;
            }
            i += 1;
        }
    };


    this.resetMarkedBoardObjectData = function () {
        var i, j;

        i = 0;
        while (i < this.boardSize()) {
            j = 0;
            while (j < this.boardSize()) {
                this.setMarkedBoardArray(i, j, GO.EMPTY_STONE());
                j += 1;
            }
            i += 1;
        }
    };

    this.resetBoardObjectData = function () {
        var i, j;

        //this.goLog("resetBoardObjectData", "boardSize=" + this.boardSize());
        i = 0;
        while (i < this.boardSize()) {
            j = 0;
            while (j < this.boardSize()) {
                this.setBoardArray(i, j, GO.EMPTY_STONE());
                j += 1;
            }
            i += 1;
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

    this.init__(root_val);
}
