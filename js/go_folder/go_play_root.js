function GoPlayRootObject() {
    "use strict";

    this.init__ = function () {
        this.theStorage = localStorage;
        //this.theAjaxObject = new AjaxObject(this);
        this.runRoot();
        this.debug(true, "init__", "userName=" + this.userName() + " linkId=" + this.linkId());
        this.debug(true, "init__", "boardSize=" + this.boardSize() + " stoneColor=" + this.stoneColor() + " komi=" + this.komi() + " handicap=" + this.handicap());
    };

    this.objectName = function () {
        return "GoPlayRootObject";
    };

    this.storage = function () {
        return this.theStorage;
    };

    this.userName = function () {
        return this.storage().user_name;
    };

    this.linkId = function () {
        return this.storage().link_id;
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

    this.ajaxObject = function () {
        return this.theAjaxObject;
    };

    this.runRoot = function () {
        var this0 = this;
        $(".config_section .config_button").on("click", function() {
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

