/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: go_port.js
 */

function GoPortObject(container_val) {
    "use strict";
    this.GO_PROTOCOL_CODE_SIZE = 7;
    this.GO_PROTOCOL_CODE_PROPOSE = "Propose";
    this.GO_PROTOCOL_CODE_ACCEPT = "Accept ";
    this.GO_PROTOCOL_CODE_CONFIRM = "Confirm";
    this.GO_PROTOCOL_CODE_MOVE_DATA = "Move   ";
    this.GO_PROTOCOL_CODE_SPECIAL_MOVE = "Special";
    this.GO_PROTOCOL_CODE_BOARD_DATA = "Board  ";

    this.init__ = function (container_val) {
        this.theContainerObject = container_val;
        this.debug(false, "init__", "");
    };

    this.objectName = function () {
        return "GoPortObject";
    };

    this.containerObject = function () {
        return this.theContainerObject;
    };

    this.rootObject = function () {
        return this.containerObject().rootObject();
    };

    this.ajxObject = function () {
        return this.rootObject().ajxObject();
    };

    this.configObject = function () {
        return this.containerObject().configObject();
    };

    this.gameObject = function () {
        return this.containerObject().gameObject();
    };

    this.sessionObject = function () {
        return this.containerObject().sessionObject();
    };

    this.boardObject = function () {
        return this.containerObject().boardObject();
    };

    this.uiObject = function () {
        return this.containerObject().uiObject();
    };

    this.transmitMoveData = function (move_val) {
        var data = this.GO_PROTOCOL_CODE_MOVE_DATA + move_val.encodeMove();
        this.transmitData(data);
    };

    this.transmitSpecialMoveData = function (special_val) {
        var data = this.GO_PROTOCOL_CODE_SPECIAL_MOVE + special_val;
        this.transmitData(data);
    };

    this.transmitData = function (data_val) {
        this.debug(false, "transmitData", "data_val=" + data_val);
        this.sessionObject().transmitData(data_val);
    };

    this.receiveData = function (res_data_val) {
        this.debug(false, "receiveData", "res_data_val=" + res_data_val);

        var res_data = JSON.parse(res_data_val);

        if (res_data.board_data !== null) {
            var board_data = res_data.board_data.slice(this.GO_PROTOCOL_CODE_SIZE);
            this.boardObject().decodeBoard(board_data);
            this.uiObject().drawBoard();
        }

        if (res_data.next_color !== null) {
            this.gameObject().setNextColor(res_data.next_color);
        }

        if (res_data.total_moves !== null) {
            this.gameObject().setTotalMoves(res_data.total_moves);
        }

        if (res_data.last_dead_stone !== null) {
            this.gameObject().setValidLastDeadInfo(true);
            this.gameObject().setLastDeadX(Number(res_data.last_dead_stone.slice(0, 2)));
            this.gameObject().setLastDeadY(Number(res_data.last_dead_stone.slice(2, 4)));
        } else {
            this.gameObject().setValidLastDeadInfo(false);
        }

        if (res_data.capture_count !== null) {
            this.gameObject().setBlackCaptureStones(Number(res_data.capture_count.slice(0, 3)));
            this.gameObject().setWhiteCaptureStones(Number(res_data.capture_count.slice(3, 6)));
        }

        if (res_data.game_is_over === false) {
            this.gameObject().clearGameIsOver();
        } else if (res_data.game_is_over === true) {
            this.gameObject().setGameIsOver();
        } else {
            this.abend("receiveData", "game_is_over");
        }

        if (res_data.black_score !== null) {
            this.gameObject().setBlackScoreString(res_data.black_score);
        }

        if (res_data.white_score !== null) {
            this.gameObject().setWhiteScoreString(res_data.white_score);
        }

        if (res_data.final_score !== null) {
            this.gameObject().setFinalScoreString(res_data.final_score);
        }
    };

    this.debug = function (debug_val, str1_val, str2_val) {
        if (debug_val) {
            this.logit(str1_val, str2_val);
        }
    };

    this.logit = function (str1_val, str2_val) {
        return this.containerObject().goLogit(this.objectName() + "." + str1_val, str2_val);
    };

    this.abend = function (str1_val, str2_val) {
        return this.containerObject().goAbend(this.objectName() + "." + str1_val, str2_val);
    };

    this.init__(container_val);
}

