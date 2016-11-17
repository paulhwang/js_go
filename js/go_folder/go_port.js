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

    this.utilObject = function () {
        return this.rootObject().utilObject();
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

    this.sessionMgrObject = function () {
        return this.sessionObject().sessionMgrObject();
    };

    this.boardObject = function () {
        return this.containerObject().boardObject();
    };

    this.uiObject = function () {
        return this.containerObject().uiObject();
    };

    this.receiveQueue = function () {
        return this.theReceiveQueue;
    };

    this.transmitQueue = function () {
        return this.theTransmitQueue;
    };

    this.transmitMoveData = function (move_val) {
        var data = this.GO_PROTOCOL_CODE_MOVE_DATA + move_val.encodeMove();
        this.debug(false, "transmitMoveData", "data=" + data);
        this.transmitStringData(data);
    };

    this.transmitSpecialMoveData = function (special_val) {
        var data = this.GO_PROTOCOL_CODE_SPECIAL_MOVE + special_val;
        this.debug(false, "transmitSpecialMoveData", "data=" + data);
        this.transmitStringData(data);
    };

    this.transmitStringData = function (str_val) {
        this.sessionObject().transmitQueue().enQueue(str_val);
        this.sessionMgrObject().transmitData();
    };

    this.receiveData = function (res_data_val) {
        this.debug(false, "receiveData", "res_data_val=" + res_data_val);
        if (res_data_val === null) {
            this.abend("receiveData", "null res_data_val");
            return;
        }

        var res_data = JSON.parse(res_data_val);

        if (res_data.board_data !== null) {
            var board_data = res_data.board_data.slice(this.GO_PROTOCOL_CODE_SIZE);
            ///////////////this.GoHandlerObject().updataBoard(board_data);
            this.boardObject().decodeBoard(board_data);
            this.uiObject().drawBoard();
        }

        if (res_data.next_color !== null) {
            this.gameObject().setNextColor(res_data.next_color);
        }

        //this.logit("receiveData", "res_data.last_dead_stone=" + res_data.last_dead_stone);
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
            //this.logit("receiveData", "res_data.capture_count=(" + this.gameObject().blackCaptureStones() + "," + this.gameObject().whiteCaptureStones()  + ")");
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

