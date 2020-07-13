/**
 * @author wrh
 * @create 2017-12-22 15:34
 **/

;(function ($, window, document, undefined) {

    var ColorCard = function (parent, options, _callback) {
        this.$parent = parent;
        this.parentId = parent.attr('id');
        // console.log(this.parentId);
        this.defaults = {
            'width': parent.width(),
            'height': parent.height(),
            'type': 0,
            'colorArray': [],
            'valueArray': [],
            'valueSize': 15,
            'unit': '',
            'slider': true
        };
        this.options = $.extend({}, this.defaults, options);
        this._callback = _callback;
    }

    ColorCard.prototype = {
        _init: function () {
            var cell_num = this.options.colorArray.length;
            var cell_width = this.options.width / (cell_num + 1);
            var cell_height = this.options.height - this.options.valueSize;

            this.$parent.append("<div><div></div></div><div></div>");
            var $colorCellsDiv = $(this.$parent.children('div').get(0));
            var $valueCellsDiv = $(this.$parent.children('div').get(1));

            var position_Min = cell_width / 2 - cell_height * 1.2 / 2;
            var position_Max = this.options.width - cell_width / 2 - cell_height * 1.2 / 2;

            var $slider = $($colorCellsDiv.children('div').get(0));

            if (this.options.slider) {
                $slider.css('width', cell_height - cell_height / 3);
                $slider.css('height', cell_height - cell_height / 3);
                $slider.css('overflow', 'visible');
                $slider.css('border', 'solid ' + cell_height / 3 + 'px #4181eb');
                $slider.css('background-color', 'white');
                // $slider.css('background', 'url("img/icon/slide.png") no-repeat');
                // $slider.css('background-size', '120%');
                $slider.css('transform', 'translateY(-10%)');
                $slider.css('position', 'absolute');
                $slider.css('left', position_Min);
                $slider.css('z-index', 999);
                $slider.css('border-radius', cell_height * 1.2);

                this._slider($slider, position_Min, position_Max, cell_width, $colorCellsDiv, this.options.valueArray, this.options.type, this._callback);
            }


            switch (this.options.type) {
                case 0:
                    this._type_0(cell_num, $colorCellsDiv, $valueCellsDiv, cell_width, cell_height);
                    break;
                case 1:
                    this._type_1(cell_num, $colorCellsDiv, $valueCellsDiv, cell_width, cell_height);
                    break;
                case 2:
                    this._type_2(cell_num, $colorCellsDiv, $valueCellsDiv, cell_width, cell_height);
                    break;
            }

            this._defineStyle(cell_width, cell_height);

            $('.value-cell-' + this.parentId).eq(0).css('clear', 'both');
        },

        _defineStyle: function (cell_width, cell_height) {
            var id = this.parentId;
            $('.color-cell-' + id).css("float", "left");
            $('.color-cell-' + id).css("width", cell_width);
            $('.color-cell-' + id).css("height", cell_height);
            $('.value-cell-' + id).css("float", "left");
            $('.value-cell-' + id).css("width", cell_width);
            $('.value-cell-' + id).css("height", this.options.valueSize + 'px');
            $('.value-cell-' + id).css("text-align", "center");
            $('.value-cell-' + id).css("font-size", '12px');
        },

        _if: function (boolean, i) {
            if (boolean) {
                return this.options.valueArray[i] + this.options.unit;
            } else {
                return "";
            }
        },

        /*color<value*/
        _type_0: function (cell_num, $colorCellsDiv, $valueCellsDiv, cell_width, cell_height) {

            $colorCellsDiv.css('padding', '0 ' + cell_width / 2 + 'px');
            for (var i = 0; i < cell_num; i++) {
                $colorCellsDiv.append("<div class='color-cell-" + this.parentId + "' style='background-color: " + this.options.colorArray[i] + "'></div>")
            }
            for (var i = 0; i < cell_num + 1; i++) {
                $valueCellsDiv.append("<span class='value-cell-" + this.parentId + "'>" + this.options.valueArray[i] + this.options.unit + "</span>");
            }
        },

        /*color>value*/
        _type_1: function (cell_num, $colorCellsDiv, $valueCellsDiv, cell_width, cell_height) {

            $colorCellsDiv.css('padding', '0 ' + cell_width / 2 + 'px');
            for (var i = 0; i < cell_num; i++) {
                $colorCellsDiv.append("<div class='color-cell-" + this.parentId + "' style='background-color: " + this.options.colorArray[i] + "'></div>")
            }
            for (var i = 0; i < cell_num + 1; i++) {
                $valueCellsDiv.append("<span class='value-cell-" + this.parentId + "'>" + this._if((i != 0 && i != cell_num), i - 1) + "</span>");
            }
        },

        /*color=value*/
        _type_2: function (cell_num, $colorCellsDiv, $valueCellsDiv, cell_width, cell_height) {
            $colorCellsDiv.css('padding', '0 ' + cell_width / 2 + 'px');
            $valueCellsDiv.css('padding', '0 ' + cell_width / 2 + 'px');
            for (var i = 0; i < cell_num; i++) {
                $colorCellsDiv.append("<div class='color-cell-" + this.parentId + "' style='background-color: " + this.options.colorArray[i] + "'></div>");
                $valueCellsDiv.append("<span class='value-cell-" + this.parentId + "'>" + this.options.valueArray[i] + this.options.unit + "</span>");
            }
        },

        _slider: function ($slider, position_Min, position_Max, cell_width, $colorCellsDiv, valueArray, type, callback) {
            var Rx, position;
            var M = false;
            var P = false;
            var t = $slider;
            var _callback;
            if (typeof callback == 'function') {
                _callback = callback;
            } else {
                console.log('callback必须为函数')
            }

            /*用闭包传参*/
            var checkSlider = this._checkSlider;
            var colorCellDarken = this._colorCellDarken;

            t.mousedown(function (event) {
                Rx = event.pageX - (parseInt(t.css("left")) || 0);
                t.css("position", "absolute").fadeTo(20, 0.5);
                M = true;
                P = true;
            }).mouseenter(function () {
                t.css('cursor', 'pointer');
            });
            $(document).mouseup(function (event) {
                M = false;
                var y = parseInt($slider.css('left')) - position_Min;
                y = checkSlider(y, cell_width);
                t.mouseleave(function () {
                    t.css('cursor', 'default')
                }).fadeTo(20, 1);
                t.animate({
                    left: y + position_Min
                }, 100);
                var map = colorCellDarken(y, cell_width, $colorCellsDiv, valueArray, type);
                if (P) {
                    _callback(map.value, map.index);
                    P = false;
                }
            });
            $(document).mousemove(function (event) {
                if (M) {
                    var x = event.pageX - Rx;
                    position = x <= position_Min ? position_Min : (x >= position_Max ? position_Max : x);
                    t.css({left: position});
                }
            });
            return t;
        },

        _checkSlider: function (y, cell_width) {
            y = Math.round(y / cell_width) * cell_width;
            return y;
        },

        _colorCellDarken: function (y, cell_width, $colorCellsDiv, valueArray, type) {
            var divs = Math.round(y / cell_width);
            var len = $colorCellsDiv.children('div').length;
            for (var i = 0; i < len; i++) {
                var $cellDiv = $($colorCellsDiv.children('div').get(i));
                if (i == 0) {

                } else if (i > 0 && i <= divs) {
                    $cellDiv.css('opacity', .2);
                } else {
                    $cellDiv.css('opacity', 1.0);
                }
            }
            divs = type == 0 ? divs : (type == 1 ? (divs - 1) : (type == 2 ? divs : divs));
            var value = valueArray[divs];
            var callback = {'index': divs, 'value': value};
            return callback;
        }


    }

    $.fn.ColorCard = function (options, _callback) {

        return this.each(function () {
            var colorCard = new ColorCard($(this), options, _callback);
            colorCard._init();
        })
    }


})(jQuery, window, document);