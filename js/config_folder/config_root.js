/*
  Copyrights reserved
  Written by Paul Hwang since 2017
*/

function ConfigRootObject() {
    "use strict";

    this.init__ = function () {
        this.theStorageObject = new ConfigStorageObject();
        //this.theAjaxObject = new LoginAjaxObject(this);
        //this.theHtmlObject = new LoginHtmlObject(this);
        this.theAjaxUtilObject = new AjaxUtilObject(this, this.switchAjaxResponseData);
        this.getNameList();
        this.setupHtmlInput();
        this.debug(true, "init__", "userName=" + this.storageObject().userName() + " linkId=" + this.storageObject().linkId());
    };

    this.objectName = function () {
        return "ConfigRootObject";
    };

    this.storageObject = function () {
        return this.theStorageObject;
    };

    this.ajaxObject = function () {
        return this.theAjaxObject;
    };

    this.htmlObject = function () {
        return this.theHtmlObject;
    };

    this.ajaxUtilObject = function () {
        return this.theAjaxUtilObject;
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
                this.storageObject().setNameList(data.name_list);
            }
        }
    };

    this.getNameList = function () {
        var output = JSON.stringify({
                        command: "get_name_list",
                        my_name: this.storageObject().userName(),
                        link_id: this.storageObject().linkId(),
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

