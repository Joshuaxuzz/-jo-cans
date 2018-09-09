define(function () { 'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  // canvas 静态方法
  var px2Num = function px2Num(val) {
    return ~~val.replace(/([\d]+)px/, '$1');
  };

  var percent2Num = function percent2Num(v) {
    return ~~v.replace('%', '') / 100;
  };

  var Cansf =
  /*#__PURE__*/
  function () {
    function Cansf(canvas) {
      var _this = this;

      _classCallCheck(this, Cansf);

      this.canvas = canvas || document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.cache = {};

      this.drawImage =
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(source, x, y, w, h) {
          var props,
              border,
              shadow,
              borderRadius,
              callback,
              bw,
              _border$match,
              _border$match2,
              borderWidth,
              borderStyle,
              borderColor,
              img,
              _canvas,
              _args = arguments;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  props = _args.length > 5 && _args[5] !== undefined ? _args[5] : {};
                  border = props.border, shadow = props.shadow, borderRadius = props.borderRadius, callback = props.callback;
                  bw = 0;

                  if (shadow) {
                    _this.setShadow(shadow);
                  } else {
                    _this.setShadow('0 0 0 transparent');
                  }

                  if (border) {
                    _border$match = border.match(/([\d]+(px)?)\s+(solid|dashed)\s+([#\w\d]+)/), _border$match2 = _slicedToArray(_border$match, 4), borderWidth = _border$match2[1], borderStyle = _border$match2[2], borderColor = _border$match2[3];
                    _this.ctx.strokeStyle = borderColor;
                    bw = px2Num(borderWidth);
                    _this.ctx.lineWidth = bw;
                    borderStyle === 'dashed' && _this.ctx.setLineDash([2, 2]);
                  }

                  _context.next = 7;
                  return _this.getCache(source);

                case 7:
                  img = _context.sent;

                  if (borderRadius) {
                    _canvas = _this.imageRadiusClip(img, borderRadius);

                    _this.ctx.drawImage(_canvas, x, y, w, h);

                    border && _this.borderRadiusClip(x, y, w, h, borderRadius);
                  } else {
                    _this.ctx.drawImage(img, x, y, w, h);

                    bw && _this.ctx.strokeRect(x - bw / 2, y - bw / 2, w + bw, h + bw);
                  }

                  _context.t0 = callback;

                  if (!_context.t0) {
                    _context.next = 13;
                    break;
                  }

                  _context.next = 13;
                  return callback(_this);

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x, _x2, _x3, _x4, _x5) {
          return _ref.apply(this, arguments);
        };
      }();

      this.drawLine =
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(sx, sy, ex, ey, w, color, style, shadow, callback) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (shadow) {
                    _this.setShadow(shadow);
                  } else {
                    _this.setShadow('0 0 0 transparent');
                  }

                  style === 'dashed' && _this.ctx.setLineDash([2, 2]);

                  _this.ctx.beginPath();

                  _this.ctx.moveTo(sx, sy);

                  _this.ctx.lineWidth = w;

                  _this.ctx.lineTo(ex, ey);

                  _this.ctx.strokeStyle = color;

                  _this.ctx.stroke();

                  _context2.t0 = callback;

                  if (!_context2.t0) {
                    _context2.next = 12;
                    break;
                  }

                  _context2.next = 12;
                  return callback(_this);

                case 12:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        return function (_x6, _x7, _x8, _x9, _x10, _x11, _x12, _x13, _x14) {
          return _ref2.apply(this, arguments);
        };
      }();

      this.drawText =
      /*#__PURE__*/
      function () {
        var _ref3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3(text, x, y) {
          var props,
              _props$color,
              color,
              _props$fontSize,
              fontSize,
              _props$fontWeight,
              fontWeight,
              _props$fontStyle,
              fontStyle,
              _props$letterSpacing,
              letterSpacing,
              width,
              _props$textAlign,
              textAlign,
              _props$hasBreak,
              hasBreak,
              lineHeight,
              shadow,
              callback,
              i,
              _args3 = arguments;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  props = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
                  _props$color = props.color, color = _props$color === void 0 ? '#000' : _props$color, _props$fontSize = props.fontSize, fontSize = _props$fontSize === void 0 ? '10px' : _props$fontSize, _props$fontWeight = props.fontWeight, fontWeight = _props$fontWeight === void 0 ? '' : _props$fontWeight, _props$fontStyle = props.fontStyle, fontStyle = _props$fontStyle === void 0 ? '' : _props$fontStyle, _props$letterSpacing = props.letterSpacing, letterSpacing = _props$letterSpacing === void 0 ? '' : _props$letterSpacing, width = props.width, _props$textAlign = props.textAlign, textAlign = _props$textAlign === void 0 ? 'left' : _props$textAlign, _props$hasBreak = props.hasBreak, hasBreak = _props$hasBreak === void 0 ? false : _props$hasBreak, lineHeight = props.lineHeight, shadow = props.shadow, callback = props.callback;

                  if (shadow) {
                    _this.setShadow(shadow);
                  } else {
                    _this.setShadow('0 0 0 transparent');
                  }

                  _this.ctx.font = "".concat(fontStyle, " ").concat(fontWeight, " ").concat(fontSize, " PingFangSC-Regular");
                  _this.ctx.fillStyle = color;

                  if (!width) {
                    _context3.next = 16;
                    break;
                  }

                  i = 0;

                case 7:
                  if (!(i < text.length)) {
                    _context3.next = 16;
                    break;
                  }

                  if (!(_this.ctx.measureText(text.slice(0, i + 1)).width > width)) {
                    _context3.next = 13;
                    break;
                  }

                  _this.drawText(text.slice(0, i), x, y, _objectSpread({}, props, {
                    hasBreak: true
                  }));

                  lineHeight = lineHeight ? px2Num(lineHeight) : px2Num(fontSize);

                  _this.drawText(text.slice(i), x, y + lineHeight, props);

                  return _context3.abrupt("return");

                case 13:
                  i++;
                  _context3.next = 7;
                  break;

                case 16:
                  if (textAlign) {
                    _this.ctx.textAlign = textAlign;
                  }

                  if (!(width || hasBreak)) {
                    _context3.next = 25;
                    break;
                  }

                  _context3.t0 = textAlign;
                  _context3.next = _context3.t0 === 'right' ? 21 : _context3.t0 === 'center' ? 23 : 25;
                  break;

                case 21:
                  x = x + width;
                  return _context3.abrupt("break", 25);

                case 23:
                  x = (x + width) / 2;
                  return _context3.abrupt("break", 25);

                case 25:
                  letterSpacing ? _this.ctx.letterSpacingText(text, x, y + ~~fontSize.replace(/([\d]+)px/, '$1'), ~~px2Num(letterSpacing)) : _this.ctx.fillText(text, x, y + ~~fontSize.replace(/([\d]+)px/, '$1'));
                  _context3.t1 = callback;

                  if (!_context3.t1) {
                    _context3.next = 30;
                    break;
                  }

                  _context3.next = 30;
                  return callback(_this, _this.ctx.measureText(text));

                case 30:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        return function (_x15, _x16, _x17) {
          return _ref3.apply(this, arguments);
        };
      }();

      this.reset = function () {
        _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
      };
    }

    _createClass(Cansf, [{
      key: "loadImg",
      value: function () {
        var _loadImg = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4(src) {
          var _this2 = this;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt("return", new Promise(function (resolve, reject) {
                    var img = new Image();

                    if (!_this2.isBase64(src) && !_this2.isSomeHost(src)) {
                      img.crossOrigin = 'Anonymous';
                    }

                    img.src = src;
                    img.addEventListener('load', loadEvt);
                    img.addEventListener('error', errorEvt);

                    function loadEvt() {
                      removeEvt();
                      return resolve(img);
                    }

                    function errorEvt() {
                      console.error('loadImg 图片加载失败: ' + src);
                      removeEvt();
                      return resolve();
                    }

                    function removeEvt() {
                      img.removeEventListener('load', loadEvt);
                      img.removeEventListener('error', errorEvt);
                    }
                  }));

                case 1:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        return function loadImg(_x18) {
          return _loadImg.apply(this, arguments);
        };
      }()
    }, {
      key: "getCache",
      value: function () {
        var _getCache = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee5(source) {
          var key, _img;

          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  if (!(typeof source === 'string')) {
                    _context5.next = 10;
                    break;
                  }

                  key = this.isBase64(source) ? source.slice(-18) : source;

                  if (Object.hasOwnProperty(this.cache, key)) {
                    _context5.next = 7;
                    break;
                  }

                  _context5.next = 5;
                  return this.loadImg(source);

                case 5:
                  _img = _context5.sent;

                  if (_img) {
                    this.cache[key] = _img;
                  }

                case 7:
                  return _context5.abrupt("return", this.cache[key] || null);

                case 10:
                  return _context5.abrupt("return", source);

                case 11:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        return function getCache(_x19) {
          return _getCache.apply(this, arguments);
        };
      }()
    }, {
      key: "isBase64",
      value: function isBase64(src) {
        return /^data:image\/jpg;base64,/.test(src);
      }
    }, {
      key: "isSomeHost",
      value: function isSomeHost(src) {
        var result = src.match(/^https?:\/\/[^\/\?#:]+/);

        if (result && result[0] === window.location.hostname) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "imageRadiusClip",
      value: function imageRadiusClip(imgObj, r) {
        var canvas = document.createElement('canvas');
        var w = imgObj.width;
        var h = imgObj.height;
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext('2d');
        var pattern = ctx.createPattern(imgObj, 'no-repeat');
        var min_size = Math.min(w, h);
        var x = 0;
        var y = 0;
        r = min_size * percent2Num(r);
        if (r > min_size / 2) r = min_size / 2; // 开始绘制

        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.fillStyle = pattern;
        ctx.fill();
        return canvas;
      }
    }, {
      key: "borderRadiusClip",
      value: function borderRadiusClip(x, y, w, h, r) {
        var min_size = Math.min(w, h);
        r = min_size * percent2Num(r);
        this.ctx.beginPath();
        this.ctx.moveTo(x + r, y);
        this.ctx.arcTo(x + w, y, x + w, y + h, r);
        this.ctx.arcTo(x + w, y + h, x, y + h, r);
        this.ctx.arcTo(x, y + h, x, y, r);
        this.ctx.arcTo(x, y, x + w, y, r);
        this.ctx.closePath();
        this.ctx.stroke();
      }
    }, {
      key: "setShadow",
      value: function setShadow(shadow) {
        var _match = (shadow || {}).match(/([\d]+)[\s]+([\d]+)[\s]+([\d]+)[\s]+([rgba#()\d,\.\s\w]+)/),
            _match2 = _slicedToArray(_match, 5),
            shadowOffsetX = _match2[1],
            shadowOffsetY = _match2[2],
            shadowBlur = _match2[3],
            shadowColor = _match2[4];

        this.ctx.shadowOffsetX = shadowOffsetX;
        this.ctx.shadowOffsetY = shadowOffsetY;
        this.ctx.shadowBlur = shadowBlur;
        this.ctx.shadowColor = shadowColor;
      }
    }, {
      key: "output",
      value: function output(tiny) {
        if (!tiny) {
          return this.canvas.toDataURL();
        } else {
          return this.canvas.toDataURL('image/jpeg', tiny);
        }
      }
    }]);

    return Cansf;
  }();

  /**
  * @author zhangxinxu(.com)
  * @licence MIT
  * @description http://www.zhangxinxu.com/wordpress/?p=7362
  */
  CanvasRenderingContext2D.prototype.letterSpacingText = function (text, x, y, letterSpacing) {
    var context = this;
    var canvas = context.canvas;

    if (!letterSpacing && canvas) {
      letterSpacing = parseFloat(window.getComputedStyle(canvas).letterSpacing);
    }

    if (!letterSpacing) {
      return this.fillText(text, x, y);
    }

    var arrText = text.split('');
    var align = context.textAlign || 'left'; // 这里仅考虑水平排列

    var originWidth = context.measureText(text).width; // 应用letterSpacing占据宽度

    var actualWidth = originWidth + letterSpacing * (arrText.length - 1); // 根据水平对齐方式确定第一个字符的坐标

    if (align == 'center') {
      x = x - actualWidth / 2;
    } else if (align == 'right') {
      x = x - actualWidth;
    } // 临时修改为文本左对齐


    context.textAlign = 'left'; // 开始逐字绘制

    arrText.forEach(function (letter) {
      var letterWidth = context.measureText(letter).width;
      context.fillText(letter, x, y); // 确定下一个字符的横坐标

      x = x + letterWidth + letterSpacing;
    }); // 对齐方式还原

    context.textAlign = align;
  };

  var Cans =
  /*#__PURE__*/
  function (_Cansf) {
    _inherits(Cans, _Cansf);

    function Cans(canvas) {
      var _this;

      _classCallCheck(this, Cans);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Cans).call(this, canvas));

      _this.render =
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(config) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _this.setCanvas(config);

                  _context.next = 3;
                  return _this.resolveImages(config.images);

                case 3:
                  _context.next = 5;
                  return _this.resolveTexts(config.texts);

                case 5:
                  _context.next = 7;
                  return _this.resolveLines(config.lines);

                case 7:
                  return _context.abrupt("return", _assertThisInitialized(_assertThisInitialized(_this)));

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }();

      return _this;
    }

    _createClass(Cans, [{
      key: "setCanvas",
      value: function setCanvas(_ref2) {
        var background = _ref2.background,
            width = _ref2.width,
            height = _ref2.height;
        width && (this.canvas.width = width);
        height && (this.canvas.height = height);
        this.ctx.fillStyle = background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }, {
      key: "resolveLines",
      value: function () {
        var _resolveLines = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          var lines,
              i,
              _lines$i,
              sx,
              sy,
              ex,
              ey,
              lineWidth,
              color,
              style,
              shadow,
              callback,
              _args2 = arguments;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  lines = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : [];
                  i = 0;

                case 2:
                  if (!(i < lines.length)) {
                    _context2.next = 9;
                    break;
                  }

                  _lines$i = lines[i], sx = _lines$i.sx, sy = _lines$i.sy, ex = _lines$i.ex, ey = _lines$i.ey, lineWidth = _lines$i.lineWidth, color = _lines$i.color, style = _lines$i.style, shadow = _lines$i.shadow, callback = _lines$i.callback;
                  _context2.next = 6;
                  return this.drawLine(sx, sy, ex, ey, lineWidth, color, style, shadow, callback);

                case 6:
                  i++;
                  _context2.next = 2;
                  break;

                case 9:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        return function resolveLines() {
          return _resolveLines.apply(this, arguments);
        };
      }()
    }, {
      key: "resolveTexts",
      value: function () {
        var _resolveTexts = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3() {
          var texts,
              i,
              _texts$i,
              text,
              x,
              y,
              arg,
              _args3 = arguments;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  texts = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : [];
                  i = 0;

                case 2:
                  if (!(i < texts.length)) {
                    _context3.next = 9;
                    break;
                  }

                  _texts$i = texts[i], text = _texts$i.text, x = _texts$i.x, y = _texts$i.y, arg = _objectWithoutProperties(_texts$i, ["text", "x", "y"]);
                  _context3.next = 6;
                  return this.drawText(text, x, y, arg);

                case 6:
                  i++;
                  _context3.next = 2;
                  break;

                case 9:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        return function resolveTexts() {
          return _resolveTexts.apply(this, arguments);
        };
      }()
    }, {
      key: "resolveImages",
      value: function () {
        var _resolveImages = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4() {
          var _this2 = this;

          var images,
              res,
              i,
              img,
              _images$i,
              x,
              y,
              width,
              height,
              border,
              shadow,
              borderRadius,
              callback,
              _args4 = arguments;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  images = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : [];
                  _context4.next = 3;
                  return Promise.all(images.map(function (v) {
                    return _this2.getCache(v.source);
                  }));

                case 3:
                  res = _context4.sent;
                  i = 0;

                case 5:
                  if (!(i < res.length)) {
                    _context4.next = 16;
                    break;
                  }

                  img = res[i];

                  if (img) {
                    _context4.next = 10;
                    break;
                  }

                  console.error('图片加载失败 无法渲染: ' + images[i].source);
                  return _context4.abrupt("break", 16);

                case 10:
                  _images$i = images[i], x = _images$i.x, y = _images$i.y, width = _images$i.width, height = _images$i.height, border = _images$i.border, shadow = _images$i.shadow, borderRadius = _images$i.borderRadius, callback = _images$i.callback;
                  _context4.next = 13;
                  return this.drawImage(img, x, y, width, height, {
                    border: border,
                    shadow: shadow,
                    borderRadius: borderRadius,
                    callback: callback
                  });

                case 13:
                  i++;
                  _context4.next = 5;
                  break;

                case 16:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        return function resolveImages() {
          return _resolveImages.apply(this, arguments);
        };
      }()
    }]);

    return Cans;
  }(Cansf);

  return Cans;

});
//# sourceMappingURL=cans.amd.js.map
