/*
  Copyrights reserved
  Written by Paul Hwang since 2017
*/

function ConfigRootObject() {
    "use strict";

    this.init__ = function () {
        this.theStorage = localStorage;
        this.theAjaxUtilObject = new AjaxUtilObject(this, this.switchAjaxResponseData);
        this.getNameList();
        this.setupHtmlInput();
        this.debug(true, "init__", "userName=" + this.userName() + " linkId=" + this.linkId());
    };

    this.objectName = function () {
        return "ConfigRootObject";
    };

    this.ajaxUtilObject = function () {
        return this.theAjaxUtilObject;
    };

    this.storage = function () {
        return this.theStorage;
    };

    this.userName = function () {
        return this.storage().user_name;
    };

    this.linkId = function () {
        return Number(this.storage().link_id);
    };

    this.boardSize = function () {
        return this.storage().board_size;
    };

    this.stoneColor = function () {
        return this.storage().stone_color;
    };

    this.komi = function () {
        return this.storage().komi;
    };

    this.handicap = function () {
        return this.storage().handicap;
    };

    this.setBoardSize = function (val) {
        this.storage().board_size = val;
    };

    this.setStoneColor = function (val) {
        this.storage().stone_color = val;
    };

    this.setKomi = function (val) {
        this.storage().komi = val;
    };

    this.setHandicap = function (val) {
        this.storage().handicap = val;
    };

    this.setNameList = function (data_val) {
        this.theNameList = data_val;
    };

    this.nameListLength = function () {
        return this.nameList().length;
    };

    this.nameListElement = function (index_val) {
        return this.nameList()[index_val];
    };

    this.setNameListElement = function (index_val, data_val) {
        this.nameList()[index_val] = data_val;
    };

    this.switchAjaxResponseData = function (json_response_val) {
        var response = JSON.parse(json_response_val);
        this.debug(true, "switchAjaxResponseData", "command=" + response.command + " data=" + response.data);
        if (response.command === "get_name_list") {
            this.getNameListResponse(response.data);
        } else {
            this.abend("switchAjaxResponseData", "not get_name_list");
        }
    };

    this.getNameListResponse = function (input_val) {
        this.debug(true, "getNameListResponse", "input_val=" + input_val);
        var data = JSON.parse(input_val);
        if (data) {
            if (data.name_list) {
                this.setNameList(data.name_list);
            }
        }
    };

    this.getNameList = function () {
        var output = JSON.stringify({
                        command: "get_name_list",
                        my_name: this.userName(),
                        link_id: this.linkId(),
                        });
        this.debug(true, "getNameList", "output=" + output);
        this.ajaxUtilObject().transmitAjaxRequest(output);
    };

    this.setupHtmlInput = function () {
        var this0 = this;
        $('.peer_name_paragraph select').append($('<option>', {value:1, text:'One1'}));
        $('.peer_name_paragraph select').append('<option val="1">One2</option>');
        $(".config_section .config_button").on("click", function() {
            this0.setBoardSize($(".config_section .go_config_section .board_size").val());
            this0.setStoneColor($(".config_section .go_config_section .stone_color").val());
            this0.setKomi($(".config_section .go_config_section .komi").val());
            this0.setHandicap($(".config_section .go_config_section .handicap").val());
            this0.debug(true, "setupHtmlInput", "boardSize=" + this0.boardSize() + " stoneColor=" + this0.stoneColor() + " komi=" + this0.komi() + " handicap=" + this0.handicap());
            window.open("http://127.0.0.1:8080/go_play.html", "_self")
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

    this.init__();
}

