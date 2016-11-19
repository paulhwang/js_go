/*
 * Copyrights phwang
 * Written by Paul Hwang
 * File name: go_html.js
 */

function GoConfigHtmlObject(root_html_val) {
    "use strict";

    this.init__ = function (root_html_val) {
        this.theRootHtmlObject = root_html_val;
        this.debug(false, "init__", "");
    };

    this.objectName = function () {
        return "GoConfigHtmlObject";
    };

    this.rootHtmlObject = function () {
        return this.theRootHtmlObject;
    };

    this.rootObject = function () {
        return this.rootHtmlObject().rootObject();
    };

    this.canvasWidth = function () {
        return this.theCanvasWidth;
    };

    this.utilObject = function () {
        return this.rootObject().utilObject();
    };

    this.createSessionPeerSection = function (session_val) {
        var root = session_val;/////.rootObject();
        var i;
        var done = false;

        /* name list *************************************************************/
        var peer_name_select = document.createElement("select");
        //peer_name_select.setAttribute("name", "opponent");
        //this.logit("createSessionPeerSection", "his_name=" + session_val.hisName());

        i = 0;
        while (i < root.nameListLength()) {
            var peer_name_option = document.createElement("option");
            peer_name_option.setAttribute("value", root.nameListElement(i));
            peer_name_option.appendChild(document.createTextNode(root.nameListElement(i)));
            peer_name_select.appendChild(peer_name_option);
            if (!done && (root.nameListElement(i) === session_val.hisName())) {
                //this.logit("createSessionPeerSection", "his_name=" + session_val.hisName());
                peer_name_option.setAttribute("selected", null);
                done = true;
            }
            i += 1;
        }

        //var peer_update_button = document.createElement("button");
        //peer_update_button.appendChild(document.createTextNode("Update"));

        var peer_name_paragraph = document.createElement("p");
        peer_name_paragraph.setAttribute("class", "peer_name_paragraph");
        peer_name_paragraph.appendChild(document.createTextNode("Peer Name: "));
        peer_name_paragraph.appendChild(peer_name_select);
        //peer_name_paragraph.appendChild(peer_update_button);

        /* game list *************************************************************/
        var peer_game_select = document.createElement("select");
        var peer_name_select_array = ["Go", "Game1", "Game2"];
        i = 0;
        while (i < peer_name_select_array.length) {
            var peer_game_option = document.createElement("option");
            peer_game_option.setAttribute("value", peer_name_select_array[i]);
            peer_game_option.appendChild(document.createTextNode(peer_name_select_array[i]));
            peer_game_select.appendChild(peer_game_option);
            i += 1;
        }

        var peer_game_button = document.createElement("button");
        peer_game_button.appendChild(document.createTextNode("Select"));

        var peer_game_paragraph = document.createElement("p");
        peer_game_paragraph.setAttribute("class", "peer_game_paragraph");
        peer_game_paragraph.appendChild(document.createTextNode("Game: "));
        peer_game_paragraph.appendChild(peer_game_select);
        peer_game_paragraph.appendChild(peer_game_button);

        /* connect *************************************************************/
        var peer_connect_button = document.createElement("button");
        peer_connect_button.appendChild(document.createTextNode("Connect"));

        var peer_connect_section = document.createElement("section");
        peer_connect_section.setAttribute("class", "peer_connect_section");
        peer_connect_section.appendChild(peer_connect_button);

        /* main *************************************************************/
        var peer_main_section = document.createElement("section");
        //peer_main_section.setAttribute("id", "peer_main_section");
        peer_main_section.setAttribute("class", "peer_main_section");
        peer_main_section.appendChild(peer_name_paragraph);
        peer_main_section.appendChild(peer_game_paragraph);
        if (session_val.gameName() === "Go") {
            peer_main_section.appendChild(this.createGoConfigSection());
        }
        peer_main_section.appendChild(peer_connect_section);

        return peer_main_section;
    };

    this.createGoConfigSection = function () {
        var go_config_section = document.createElement("section");
        go_config_section.setAttribute("id", "go_config_section");
        go_config_section.setAttribute("class", "go_config_section");
        go_config_section.appendChild(this.createConfigBoardSizeSection());
        go_config_section.appendChild(this.createConfigPlayColorSection());
        go_config_section.appendChild(this.createConfigKomiSection());
        go_config_section.appendChild(this.createConfigHandicapSection());

        return go_config_section;
    };

    this.createSessionHolder = function (session_val) {
        if (this.rootHtmlObject().sessionHolderOn()) {
            return;
        }
        this.rootHtmlObject().setSessionHolderOn(true);

        var session_holder = document.createElement("section");
        session_holder.setAttribute("id", "session_holder");
        session_holder.setAttribute("class", "session_holder");
        session_holder.appendChild(this.createSessionPeerSection(session_val));

        var main_holder = document.getElementById("body");
        main_holder.appendChild(session_holder);

        this.rootHtmlObject().setHolderStyle(session_holder);
    };

    this.createConfigMyNameSection = function () {
        var my_name_paragraph = document.createElement("p");
        my_name_paragraph.appendChild(document.createTextNode("Name: " + this.preludeObject().myName()));

        var my_name_section = document.createElement("section");
        my_name_section.appendChild(my_name_paragraph);

        return my_name_section;
    };

    this.createConfigBoardSizeSection = function () {
        var board_size_option_19 = document.createElement("option");
        board_size_option_19.setAttribute("value", "19");
        board_size_option_19.appendChild(document.createTextNode("19 x 19"));

        var board_size_option_13 = document.createElement("option");
        board_size_option_13.setAttribute("value", "13");
        board_size_option_13.appendChild(document.createTextNode("13 x 13"));

        var board_size_option_9 = document.createElement("option");
        board_size_option_9.setAttribute("value", "9");
        board_size_option_9.appendChild(document.createTextNode("9 x 9"));

        var board_size_select = document.createElement("select");
        board_size_select.setAttribute("name", "board_size");
        board_size_select.appendChild(board_size_option_19);
        board_size_select.appendChild(board_size_option_13);
        board_size_select.appendChild(board_size_option_9);

        var board_size_paragraph = document.createElement("p");
        board_size_paragraph.appendChild(document.createTextNode("Board Size: "));
        board_size_paragraph.appendChild(board_size_select);

        var board_size_section = document.createElement("section");
        board_size_section.setAttribute("class", "board_size_section");
        board_size_section.appendChild(board_size_paragraph);

        return board_size_section;
    }

    this.createConfigPlayColorSection = function () {
        var play_color_option_black = document.createElement("option");
        play_color_option_black.setAttribute("value", "black");
        play_color_option_black.appendChild(document.createTextNode("Black"));

        var play_color_option_white = document.createElement("option");
        play_color_option_white.setAttribute("value", "white");
        play_color_option_white.appendChild(document.createTextNode("White"));

        var play_color_select = document.createElement("select");
        play_color_select.setAttribute("name", "play_color");
        play_color_select.appendChild(play_color_option_black);
        play_color_select.appendChild(play_color_option_white);

        var play_color_paragraph = document.createElement("p");
        play_color_paragraph.appendChild(document.createTextNode("Stone Color: "));
        play_color_paragraph.appendChild(play_color_select);

        var play_color_section = document.createElement("section");
        play_color_section.setAttribute("class", "play_color_section");
        play_color_section.appendChild(play_color_paragraph);

        return play_color_section;
    }

    this.createConfigKomiSection = function () {
        var komi_option_0 = document.createElement("option");
        komi_option_0.setAttribute("value", "0");
        komi_option_0.appendChild(document.createTextNode("0.5"));

        var komi_option_4 = document.createElement("option");
        komi_option_4.setAttribute("value", "4");
        komi_option_4.appendChild(document.createTextNode("4.5"));

        var komi_option_5 = document.createElement("option");
        komi_option_5.setAttribute("value", "5");
        komi_option_5.setAttribute("selected", null);
        komi_option_5.appendChild(document.createTextNode("5.5"));

        var komi_option_6 = document.createElement("option");
        komi_option_6.setAttribute("value", "6");
        komi_option_6.appendChild(document.createTextNode("6.5"));

        var komi_option_7 = document.createElement("option");
        komi_option_7.setAttribute("value", "7");
        komi_option_7.appendChild(document.createTextNode("7.5"));

        var komi_option_8 = document.createElement("option");
        komi_option_8.setAttribute("value", "8");
        komi_option_8.appendChild(document.createTextNode("8.5"));

        var komi_select = document.createElement("select");
        komi_select.setAttribute("name", "komi");
        komi_select.appendChild(komi_option_0);
        komi_select.appendChild(komi_option_4);
        komi_select.appendChild(komi_option_5);
        komi_select.appendChild(komi_option_6);
        komi_select.appendChild(komi_option_7);
        komi_select.appendChild(komi_option_8);

        var komi_paragraph = document.createElement("p");
        komi_paragraph.appendChild(document.createTextNode("Komi: "));
        komi_paragraph.appendChild(komi_select);

        var komi_section = document.createElement("section");
        komi_section.setAttribute("class", "komi_section");
        komi_section.appendChild(komi_paragraph);

        return komi_section;
    }

    this.createConfigHandicapSection = function () {
        var handicap_option_0 = document.createElement("option");
        handicap_option_0.setAttribute("value", "0");
        handicap_option_0.appendChild(document.createTextNode("0"));

        var handicap_option_2 = document.createElement("option");
        handicap_option_2.setAttribute("value", "2");
        handicap_option_2.appendChild(document.createTextNode("2"));

        var handicap_option_3 = document.createElement("option");
        handicap_option_3.setAttribute("value", "3");
        handicap_option_3.appendChild(document.createTextNode("3"));

        var handicap_option_4 = document.createElement("option");
        handicap_option_4.setAttribute("value", "4");
        handicap_option_4.appendChild(document.createTextNode("4"));

        var handicap_option_5 = document.createElement("option");
        handicap_option_5.setAttribute("value", "5");
        handicap_option_5.appendChild(document.createTextNode("5"));

        var handicap_option_6 = document.createElement("option");
        handicap_option_6.setAttribute("value", "6");
        handicap_option_6.appendChild(document.createTextNode("6"));

        var handicap_option_7 = document.createElement("option");
        handicap_option_7.setAttribute("value", "7");
        handicap_option_7.appendChild(document.createTextNode("7"));

        var handicap_option_8 = document.createElement("option");
        handicap_option_8.setAttribute("value", "8");
        handicap_option_8.appendChild(document.createTextNode("8"));

        var handicap_option_9 = document.createElement("option");
        handicap_option_9.setAttribute("value", "9");
        handicap_option_9.appendChild(document.createTextNode("9"));

        var handicap_option_10 = document.createElement("option");
        handicap_option_10.setAttribute("value", "10");
        handicap_option_10.appendChild(document.createTextNode("10"));

        var handicap_option_11 = document.createElement("option");
        handicap_option_11.setAttribute("value", "11");
        handicap_option_11.appendChild(document.createTextNode("11"));

        var handicap_option_12 = document.createElement("option");
        handicap_option_12.setAttribute("value", "12");
        handicap_option_12.appendChild(document.createTextNode("12"));

        var handicap_option_13 = document.createElement("option");
        handicap_option_13.setAttribute("value", "13");
        handicap_option_13.appendChild(document.createTextNode("13"));

        var handicap_select = document.createElement("select");
        handicap_select.setAttribute("name", "handicap");
        handicap_select.appendChild(handicap_option_0);
        handicap_select.appendChild(handicap_option_2);
        handicap_select.appendChild(handicap_option_3);
        handicap_select.appendChild(handicap_option_4);
        handicap_select.appendChild(handicap_option_5);
        handicap_select.appendChild(handicap_option_6);
        handicap_select.appendChild(handicap_option_7);
        handicap_select.appendChild(handicap_option_8);
        handicap_select.appendChild(handicap_option_9);
        handicap_select.appendChild(handicap_option_10);
        handicap_select.appendChild(handicap_option_11);
        handicap_select.appendChild(handicap_option_12);
        handicap_select.appendChild(handicap_option_13);

        var handicap_paragraph = document.createElement("p");
        handicap_paragraph.appendChild(document.createTextNode("Handicap: "));
        handicap_paragraph.appendChild(handicap_select);

        var handicap_section = document.createElement("section");
        handicap_section.setAttribute("class", "handicap_section");
        handicap_section.appendChild(handicap_paragraph);

        return handicap_section;
    }

    this.createSessionHolders = function (link_val) {
        this.rootHtmlObject().removeAllHolders(link_val);
        this.createSessionHolder(link_val);
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

    this.init__(root_html_val);
}
