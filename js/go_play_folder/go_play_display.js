/*
  Copyrights reserved
  Written by Paul Hwang
*/

function GoPlayDisplayObject(root_object_val) {
    "use strict";

    this.init__ = function (root_object_val) {
        this.theRootObject = root_object_val;
        this.drawBoard();
        this.drawArrows();
        this.debug(true, "init__", "");
    };

    this.objectName = function () {
        return "GoPlayDisplayObject";
    };

    this.rootObject = function () {
        return this.theRootObject;
    };

    this.storageObject = function () {
        return this.rootObject().storageObject();
    };

    this.htmlObject = function () {
        return this.rootObject().htmlObject();
    };

    this.boardSize = function () {
        return this.storageObject().boardSize();
    };

    this.canvasElement = function () {
        return this.htmlObject().canvasElement();
    };

    this.canvasContext = function () {
        return this.htmlObject().canvasContext();
    };

    this.getGridLength = function () {
        return this.htmlObject().getGridLength();
    };

    this.getArrowUnitLength = function () {
        return this.htmlObject().getArrowUnitLength();
    };

    this.drawBoard = function () {
        this.drawEmptyBoard();
    };

    this.drawEmptyBoard = function () {
        var grid_len = this.getGridLength();
        var context = this.canvasContext();

        this.setBoardColor();
        context.lineWidth = 1;
        var i = 1;
        while (i <= this.boardSize()) {
            context.moveTo(grid_len, grid_len * i);
            context.lineTo(grid_len * this.boardSize(), grid_len * i);
            context.stroke();
            context.moveTo(grid_len * i, grid_len);
            context.lineTo(grid_len * i, grid_len * this.boardSize());
            context.stroke();
            i += 1;
        }

        if (this.boardSize() === 9) {
            drawBoardDot(5, 5);
        } else if (this.boardSize() === 13) {
            drawBoardDot(4, 4);
            drawBoardDot(4, 10);
            drawBoardDot(10, 4);
            drawBoardDot(10, 10);
            drawBoardDot(7, 7);
        } else if (this.boardSize() === 19) {
            drawBoardDot(4, 4);
            drawBoardDot(4, 10);
            drawBoardDot(4, 16);
            drawBoardDot(10, 4);
            drawBoardDot(10, 10);
            drawBoardDot(10, 16);
            drawBoardDot(16, 4);
            drawBoardDot(16, 10);
            drawBoardDot(16, 16);
        }

        function drawBoardDot(x_val, y_val) {
            context.beginPath();
            context.arc(x_val * grid_len, y_val * grid_len, 3, 0, 2 * Math.PI, false);
            context.fillStyle = 'black';
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = '#003300';
            context.stroke();
        }
    };

    this.setBoardColor = function () {
        this.canvasContext().fillStyle = "#FF8000";
        this.canvasContext().fillRect(0, 0, this.canvasElement().width, this.canvasElement().width);
    }

    this.drawOneStone = function (x_val, y_val, paint_val) {
        var grid_len = this.getGridLength();
        var micro_grid_len = grid_len / 8;
        var radius = 3.2 * micro_grid_len;
        var context = this.canvasContext();

        context.beginPath();
        context.arc((x_val + 1) * grid_len, (y_val + 1) * grid_len, radius, 0, 2 * Math.PI, false);
        context.fillStyle = paint_val;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();
     }


    this.drawArrows = function () {
        var arrow_len = this.getArrowUnitLength();
        var context = this.canvasContext();

        context.beginPath();
        context.moveTo(arrow_len * 0.5,  arrow_len * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 1.25, arrow_len       + this.canvasElement().width);
        context.lineTo(arrow_len * 1.25, arrow_len * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 0.5,  arrow_len * 1.5 + this.canvasElement().width);
        context.fill();
        context.stroke();
        context.beginPath();
        context.moveTo(arrow_len * 1.25, arrow_len * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 2,    arrow_len       + this.canvasElement().width);
        context.lineTo(arrow_len * 2,    arrow_len * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 1.25, arrow_len * 1.5 + this.canvasElement().width);
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(arrow_len * 3, arrow_len  * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 4, arrow_len        + this.canvasElement().width);
        context.lineTo(arrow_len * 4, arrow_len  * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 3, arrow_len  * 1.5 + this.canvasElement().width);
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(arrow_len * 5, arrow_len       + this.canvasElement().width);
        context.lineTo(arrow_len * 6, arrow_len * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 5, arrow_len * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 5, arrow_len       + this.canvasElement().width);
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(arrow_len * 7,    arrow_len       + this.canvasElement().width);
        context.lineTo(arrow_len * 7.75, arrow_len * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 7,    arrow_len * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 7,    arrow_len       + this.canvasElement().width);
        context.fill();
        context.stroke();
        context.beginPath();
        context.moveTo(arrow_len * 7.75, arrow_len       + this.canvasElement().width);
        context.lineTo(arrow_len * 8.5,  arrow_len * 1.5 + this.canvasElement().width);
        context.lineTo(arrow_len * 7.75, arrow_len * 2   + this.canvasElement().width);
        context.lineTo(arrow_len * 7.75, arrow_len       + this.canvasElement().width);
        context.fill();
        context.stroke();
        context.moveTo(arrow_len * 8.5, arrow_len     + this.canvasElement().width);
        context.lineTo(arrow_len * 8.5, arrow_len * 2 + this.canvasElement().width);
        context.stroke();

        context.moveTo(arrow_len * 0.5, arrow_len     + this.canvasElement().width);
        context.lineTo(arrow_len * 0.5, arrow_len * 2 + this.canvasElement().width);
        context.stroke();

        context.fillStyle = "pink";
        context.fillRect(arrow_len * 8.5, arrow_len + this.canvasElement().width, arrow_len * 2, arrow_len);
        context.fillStyle = "yellow";
        context.fillRect(arrow_len * 10.5, arrow_len + this.canvasElement().width, arrow_len * 2, arrow_len);
        context.fillStyle = "pink";
        context.fillRect(arrow_len * 12.5, arrow_len + this.canvasElement().width, arrow_len * 2, arrow_len);
        context.fillStyle = "yellow";
        context.fillRect(arrow_len * 14.5, arrow_len + this.canvasElement().width, arrow_len * 2, arrow_len);
        context.fillStyle = "pink";
        context.fillRect(arrow_len * 16.5, arrow_len + this.canvasElement().width, arrow_len * 2, arrow_len);
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
