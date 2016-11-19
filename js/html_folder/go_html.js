/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: go_html.js
 */

function GoHtmlObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.theCanvasWidth = 432;
        this.thePreludeHolderOn = false;
        this.theTitleHolderOn = false;
        this.theConfigHolderOn = false;
        this.theCanvasHolderOn = false;
        this.theScoreHolderOn = false;
        this.theGoConfigHtmlObject = new GoConfigHtmlObject(this);
        this.debug(false, "init__", "");
    };

    this.objectName = function () {
        return "GoHtmlObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.goConfigHtmlObject = function () {
        return this.theGoConfigHtmlObject;
    };

    this.utilObject = function () {
        return this.rootObject().utilObject();
    };

    this.canvasWidth = function () {
        return this.theCanvasWidth;
    };

    this.preludeHolderOn = function () {
        return this.thePreludeHolderOn;
    };

    this.titleHolderOn = function () {
        return this.theTitleHolderOn;
    };

    this.sessionHolderOn = function () {
        return this.theSessionHolderOn;
    };

    this.configHolderOn = function () {
        return this.theConfigHolderOn;
    };

    this.canvasHolderOn = function () {
        return this.theCanvasHolderOn;
    };

    this.scoreHolderOn = function () {
        return this.theScoreHolderOn;
    };

    this.setPreludeHolderOn = function (val) {
        this.thePreludeHolderOn = val;
    };

    this.setTitleHolderOn = function (val) {
        this.theTitleHolderOn = val;
    };

    this.setSessionHolderOn = function (val) {
        this.theSessionHolderOn = val;
    };

    this.setConfigHolderOn = function (val) {
        this.theConfigHolderOn = val;
    };

    this.setCanvasHolderOn = function (val) {
        this.theCanvasHolderOn = val;
    };

    this.setScoreHolderOn = function (val) {
        this.theScoreHolderOn = val;
    };

    this.createPreludeHolder = function () {
        if (this.preludeHolderOn()) {
            return;
        }
        this.setPreludeHolderOn(true);
    };

    this.removePreludeHolder = function () {
        if (!this.preludeHolderOn()) {
            return;
        }
        this.setPreludeHolderOn(false);

        var main_holder = document.getElementById("body");
        var prelude_holder = document.getElementById("prelude_holder");
        main_holder.removeChild(prelude_holder);
    };

    this.createTitleHolder = function () {
        if (this.titleHolderOn()) {
            return;
        }
        this.setTitleHolderOn(true);

        var go_game_paragraph = document.createElement("h1");
        go_game_paragraph.appendChild(document.createTextNode("GO Game"));
        var go_game_section = document.createElement("section");
        go_game_section.setAttribute("id", "go_game");
        go_game_section.appendChild(go_game_paragraph);

        var go_author_paragraph = document.createElement("p");
        go_author_paragraph.appendChild(document.createTextNode("by Paul Hwang"));
        var go_author_section = document.createElement("section");
        go_author_section.setAttribute("id", "go_author");
        go_author_section.appendChild(go_author_paragraph);

        var title_holder = document.createElement("title_holder");
        title_holder.setAttribute("id", "title_holder");
        title_holder.appendChild(go_game_section);
        title_holder.appendChild(go_author_section);

        var main_holder = document.getElementById("body");
        main_holder.appendChild(title_holder);

        this.setHolderStyle(title_holder);
        //this.setH1Style(go_game_section);
        this.setSectionStyleRight(go_author_section);
    };

    this.removeTitleHolder = function () {
        if (!this.titleHolderOn()) {
            return;
        }
        this.setTitleHolderOn(false);

        var main_holder = document.getElementById("body");
        var title_holder = document.getElementById("title_holder");
        main_holder.removeChild(title_holder);
    };
    this.removeSessionHolder = function (session_val) {
        if (!this.sessionHolderOn()) {
            return;
        }
        this.setSessionHolderOn(false);

        if (session_val) {
            var his_name = $(".peer_name_paragraph select").val();
            if (his_name) {
                session_val.setHisName(his_name);
                //this.logit("removeSessionHolder", "his_name=" + session_val.hisName());
            }
        }

        var main_holder = document.getElementById("body");
        var session_holder = document.getElementById("session_holder");
        main_holder.removeChild(session_holder);

    };
            //<input type="text" name="prelude_name" placeholder="Enter your name"><button>Login</button>

    this.createConfigOpponentSection = function () {
        var data = ["aaa", "bbb", "ccc"];

        var opponent_option_0 = document.createElement("option");
        opponent_option_0.setAttribute("value", "Myself");
        opponent_option_0.appendChild(document.createTextNode("Myself"));

        var opponent_option_1 = document.createElement("option");
        opponent_option_1.setAttribute("value", "BBB");
        opponent_option_1.appendChild(document.createTextNode("bbbb"));

        var opponent_select = document.createElement("select");
        opponent_select.setAttribute("name", "opponent");
        opponent_select.appendChild(opponent_option_0);
        opponent_select.appendChild(opponent_option_1);

        var opponent_button = document.createElement("button");
        opponent_button.appendChild(document.createTextNode("Play"));

        var opponent_paragraph = document.createElement("p");
        opponent_paragraph.appendChild(document.createTextNode("Opponent: "));
        opponent_paragraph.appendChild(opponent_select);
        opponent_paragraph.appendChild(opponent_button);

        var config_opponent_section = document.createElement("section");
        config_opponent_section.setAttribute("class", "opponent_section");
        config_opponent_section.appendChild(opponent_paragraph);

        return config_opponent_section;
    };

    this.createConfigOpponentSection1 = function () {
        var opponent_paragraph = document.createElement("p");
        var opponent_input = document.createElement("input");
        var opponent_button = document.createElement("button");
        opponent_button.appendChild(document.createTextNode("Play"));
        opponent_input.setAttribute("type", "text");
        opponent_input.setAttribute("name", "opponent_name");
        opponent_input.setAttribute("placeholder", "Enter opponent's name");

        opponent_paragraph.appendChild(document.createTextNode("Opponent: "));
        opponent_paragraph.appendChild(opponent_input);
        opponent_paragraph.appendChild(opponent_button);

        var config_opponent_section = document.createElement("section");
        config_opponent_section.setAttribute("type", "text");
        config_opponent_section.setAttribute("class", "opponent_section");
        config_opponent_section.appendChild(opponent_paragraph);

        return config_opponent_section;
    };

    this.createConfigHolder = function () {
        if (this.configHolderOn()) {
            return;
        }
        this.setConfigHolderOn(true);

        var config_holder = document.createElement("section");
        config_holder.setAttribute("id", "config_holder");
        config_holder.setAttribute("class", "config_holder");
        config_holder.appendChild(this.createConfigMyNameSection());
        config_holder.appendChild(this.createConfigBoardSizeSection());
        config_holder.appendChild(this.createConfigPlayColorSection());
        config_holder.appendChild(this.createConfigKomiSection());
        config_holder.appendChild(this.createConfigHandicapSection());
        config_holder.appendChild(this.createConfigOpponentSection());

        var main_holder = document.getElementById("body");
        main_holder.appendChild(config_holder);

        this.setHolderStyle(config_holder);
    };

    this.removeConfigHolder = function () {
        if (!this.configHolderOn()) {
            return;
        }
        this.setConfigHolderOn(false);

        var main_holder = document.getElementById("body");
        var config_holder = document.getElementById("config_holder");
        main_holder.removeChild(config_holder);

    };

    this.createCanvasHolder = function () {
        if (this.canvasHolderOn()) {
            return;
        }
        this.setCanvasHolderOn(true);

        var canvas_element = document.createElement("canvas");
        canvas_element.setAttribute("id", "goCanvas");
        canvas_element.setAttribute("style", "border:1px solid #000000;");
        canvas_element.width = this.canvasWidth();
        canvas_element.height = this.canvasWidth() * 1.1;

        var canvas_section = document.createElement("section");
        canvas_section.setAttribute("id", "canvas-area1");
        canvas_section.appendChild(canvas_element);

        var canvas_holder = document.createElement("canvas_holder");
        canvas_holder.setAttribute("id", "canvas_holder");
        canvas_holder.appendChild(canvas_element);

        var main_holder = document.getElementById("body");
        main_holder.appendChild(canvas_holder);
     };

    this.removeCanvasHolder = function () {
        if (!this.canvasHolderOn()) {
            return;
        }
        this.setCanvasHolderOn(false);

        var main_holder = document.getElementById("body");
        var canvas_holder = document.getElementById("canvas_holder");
        main_holder.removeChild(canvas_holder);
    };

    this.createScoreHolder = function () {
        if (this.scoreHolderOn()) {
            return;
        }
        this.setScoreHolderOn(true);

        var black_score_paragraph = document.createElement("p");
        black_score_paragraph.appendChild(document.createTextNode("Black: 0"));
        var black_section = document.createElement("section");
        black_section.setAttribute("id", "black_score");
        black_section.appendChild(black_score_paragraph);

        var white_score_paragraph = document.createElement("p");
        white_score_paragraph.appendChild(document.createTextNode("White: 0"));
        var white_section = document.createElement("section");
        white_section.setAttribute("id", "white_score");
        white_section.appendChild(white_score_paragraph);

        var score_holder = document.createElement("score_holder");
        score_holder.setAttribute("id", "score_holder");
        score_holder.appendChild(black_section);
        score_holder.appendChild(white_section);

        var main_holder = document.getElementById("body");
        main_holder.appendChild(score_holder);

        this.setHolderStyle(score_holder);
        //this.setSectionStyleLeft(black_section);
        //this.setSectionStyleLeft(white_section);
    };

    this.removeScoreHolder = function () {
        if (!this.scoreHolderOn()) {
            return;
        }
        this.setScoreHolderOn(false);

        var main_holder = document.getElementById("body");
        var score_holder = document.getElementById("score_holder");
        main_holder.removeChild(score_holder);
    };

    this.setHolderStyle = function (holder_val) {
        holder_val.style.margin = "10px";
        holder_val.style.background = "lightcyan";
        holder_val.style.border = "1px solid blue";
        holder_val.style.overflow = "auto";
    };

    this.setSectionStyleLeft = function (holder_val) {
        holder_val.style.margin = "10px";
        holder_val.style.width = "500px";
        //holder_val.style.border = "1px solid green";
        holder_val.style.float = "left";
    };

    this.setSectionStyleRight = function (holder_val) {
        holder_val.style.margin = "10px";
        holder_val.style.width = "500px";
        //holder_val.style.border = "1px solid green";
        holder_val.style.float = "right";
    };

    this.setParagraphStyle = function (p_val) {
        p_val.style.background = "pink";
    };

    this.setH1Style = function (val) {
        //val.style.margin = "10px";
        //val.style.border = "1px solid red";
        val.style.float = "left";
    };

    this.createPreludeHolders = function () {
        this.removeAllHolders();
        this.createPreludeHolder();
    };

    this.createConfigHolders = function () {
        this.removeAllHolders(null);
        this.createConfigHolder();
    };

    this.createPlayHolders = function () {
        this.removeAllHolders(null);
        this.createCanvasHolder();
        this.createScoreHolder();
    };

    this.removeAllHolders = function (val) {
        this.removePreludeHolder();
        this.removeTitleHolder();
        this.removeSessionHolder(val);
        this.removeConfigHolder();
        this.removeCanvasHolder();
        this.removeScoreHolder();
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

    //this.createTitleHolder();
    this.init__(root_object_val);
}
