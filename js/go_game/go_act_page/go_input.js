/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayInputObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.theLastMouseX = 9;
        this.theLastMouseY = 9;
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "GoPlayInputObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.configStorageObject = function () {
        return this.rootObject().configStorageObject();
    };

    this.htmlObject = function () {
        return this.rootObject().htmlObject();
    };

    this.displayObject = function () {
        return this.rootObject().displayObject();
    };

    this.gameObject = function () {
        return this.rootObject().gameObject();
    };

    this.boardSize = function () {
        return this.configStorageObject().boardSize();
    };

    this.canvasElement = function () {
        return this.htmlObject().canvasElement();
    };

    this.getGridLength = function () {
        return this.htmlObject().getGridLength();
    };

    this.getArrowUnitLength = function () {
        return this.htmlObject().getArrowUnitLength();
    };

    this.lastMouseX = function () {
        return this.theLastMouseX;
    };

    this.setLastMouseX = function (val) {
        this.theLastMouseX = val;
    };

    this.lastMouseY = function () {
        return this.theLastMouseY;
    };

    this.setLastMouseY = function (val) {
        this.theLastMouseY = val;
    };

    this.uiMouseMove = function (event_x, event_y) {
        //if (!this.gameObject().isMyTurn()) {
        //    return;
        //}
        //this.debug(false, "uiMouseMove", "raw_data=(" + event_x + "," + event_y + ")");

        var grid_len = this.getGridLength();
        var x = Math.round((event_x - this.canvasElement().getBoundingClientRect().left) / grid_len) - 1;
        var y = Math.round((event_y - this.canvasElement().getBoundingClientRect().top) / grid_len) - 1;
        if ((x < 0) || (y < 0) || (x >= this.boardSize()) || (y >= this.boardSize())) {
            return;
        }

        if ((this.lastMouseX() !== x) || (this.lastMouseY() !== y)) {
            this.debug(false, "uiMouseMove", "(" + x + "," + y + ")");
            this.setLastMouseX(x);
            this.setLastMouseY(y);
            this.displayObject().drawBoard();
        }
    };

    this.uiClick = function (event_x, event_y) {
        var arrow_len = this.getArrowUnitLength();
        var grid_len = this.getGridLength();

        if (event_x < this.canvasElement().getBoundingClientRect().left) {
            return;
        }
        if (event_y < this.canvasElement().getBoundingClientRect().top) {
            return;
        }
        if (event_x > this.canvasElement().getBoundingClientRect().left + this.canvasElement().getBoundingClientRect().width) {
            return;
        }
        if (event_y > this.canvasElement().getBoundingClientRect().top + this.canvasElement().getBoundingClientRect().height) {
            return;
        }

        //this.debug(true, "uiClick", "raw_data=(" + event_x + ", " + event_y + ")");

        if (event_y > this.canvasElement().getBoundingClientRect().top + this.canvasElement().getBoundingClientRect().width) {
            if (event_y < this.canvasElement().getBoundingClientRect().top + this.canvasElement().getBoundingClientRect().width + arrow_len) {
                return;
            }
            if (event_y > this.canvasElement().getBoundingClientRect().top + this.canvasElement().getBoundingClientRect().width + arrow_len * 2) {
                return;
            }

            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 2.5) {
                this.gameObject().processDoubleBackwardMoveFromUi();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 4.5) {
                this.gameObject().processBackwardMoveFromUi();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 6.5) {
                this.gameObject().processForwardMoveFromUi();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 8.5) {
                this.gameObject().processDoubleForwardMoveFromUi();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 10.5) {
                if (this.gameObject().isMyTurn()) {
                    this.gameObject().processPassMoveFromUi();
                    this.displayObject().drawBoard();
                }
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 12.5) {
                this.gameObject().processConfirmMoveFromUi();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 14.5) {
                this.gameObject().processResignMoveFromUi();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 16.5) {
                this.gameObject().processPlayAnotherGameMoveFromUi();
                this.displayObject().drawBoard();
                return;
            }
            if ((event_x - this.canvasElement().getBoundingClientRect().left) < arrow_len * 18.5) {
                this.gameObject().processBackToPlayMoveFromUi();
                this.displayObject().drawBoard();
                return;
            }
            return;
        }

        var x = Math.round((event_x - this.canvasElement().getBoundingClientRect().left) / grid_len) - 1;
        var y = Math.round((event_y - this.canvasElement().getBoundingClientRect().top) / grid_len) - 1;
        if ((x < 0) || (y < 0) || (x >= this.boardSize()) || (y >= this.boardSize())) {
            return;
        }

        this.debug(true, "uiClick", "(" + x + "," + y + ")");

        if (!this.gameObject().isMyTurn()) {
            this.debug(true, "uiClick", "not my turn");
            return;
        }

        this.gameObject().enterGameFromUi(x, y);
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
