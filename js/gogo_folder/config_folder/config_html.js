/*
  Copyrights reserved
  Written by Paul Hwang
*/

function ConfigHtmlObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.setupHtmlInputFunction();
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "ConfigHtmlObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.storageObject = function () {
        return this.rootObject().storageObject();
    };

    this.ajaxObject = function () {
        return this.rootObject().ajaxObject();
    };

    this.setupHtmlInputFunction = function () {
        this.renderNameList();
        var this0 = this;
        $(".config_section .config_button").on("click", function() {
            this0.storageObject().setBoardSize($(".config_section .go_config_section .board_size").val());
            this0.storageObject().setStoneColor($(".config_section .go_config_section .stone_color").val());
            this0.storageObject().setKomi($(".config_section .go_config_section .komi").val());
            this0.storageObject().setHandicap($(".config_section .go_config_section .handicap").val());
            this0.debug(true, "setupHtmlInput", "boardSize=" + this0.storageObject().boardSize() + " stoneColor=" + this0.storageObject().stoneColor() + " komi=" + this0.storageObject().komi() + " handicap=" + this0.storageObject().handicap());
            var config = JSON.stringify({
                            board_size: this0.storageObject().boardSize(),
                            color: this0.storageObject().stoneColor(),
                            komi: this0.storageObject().komi(),
                            handicap: this0.storageObject().handicap(),
                            });
            var topic_data = JSON.stringify({
                            title: "go",
                            config: config,
                            });
            this0.ajaxObject().setupSession(this0, topic_data, this0.storageObject().userName());
        });
    };

    this.renderNameList = function () {
        var i = 0;
        while (i < this.storageObject().nameListLength()) {
            $('.peer_name_paragraph select').append($('<option>', {value:this.storageObject().nameListElement(i), text:this.storageObject().nameListElement(i)}));
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

    this.init__(root_object_val);
}

