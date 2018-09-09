(function () {
  'use strict';

  // canvas 静态方法
  const px2Num = function (val) {
    return ~~val.replace(/([\d]+)px/, '$1')
  };
  const percent2Num = function (v) {
    return ~~v.replace('%', '') / 100
  };

  class Cansf {
    constructor (canvas) {
      this.canvas = canvas || document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.cache = {};
      this.drawImage = async (source, x, y, w, h, props = {}) => {
        let { border, shadow, borderRadius, callback } = props;
        let bw = 0;
        if (shadow) {
          this.setShadow(shadow);
        } else {
          this.setShadow('0 0 0 transparent');
        }
        if (border) {
          let [, borderWidth, borderStyle, borderColor] = border.match(/([\d]+(px)?)\s+(solid|dashed)\s+([#\w\d]+)/);
          this.ctx.strokeStyle = borderColor;
          bw = px2Num(borderWidth);
          this.ctx.lineWidth = bw;
          borderStyle === 'dashed' && this.ctx.setLineDash([2, 2]);
        }
        let img = await this.getCache(source);
        if (borderRadius) {
          let canvas = this.imageRadiusClip(img, borderRadius);
          this.ctx.drawImage(canvas, x, y, w, h);
          border && this.borderRadiusClip(x, y, w, h , borderRadius);
        } else{
          this.ctx.drawImage(img, x, y, w, h);
          bw && this.ctx.strokeRect(x - bw / 2, y - bw / 2, w + bw, h + bw);
        }
        callback && await callback(this);
      };
      this.drawLine = async (sx, sy, ex, ey, w, color, style, shadow, callback) => {
        if (shadow) {
          this.setShadow(shadow);
        } else {
          this.setShadow('0 0 0 transparent');
        }
        style === 'dashed' && this.ctx.setLineDash([2, 2]);
        this.ctx.beginPath();
        this.ctx.moveTo(sx,sy);
        this.ctx.lineWidth = w;
        this.ctx.lineTo(ex, ey);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
        callback && await callback(this);
      };
      this.drawText = async (text, x, y, props = {}) => {
        let { color = '#000', fontSize = '10px', fontWeight = '', fontStyle = '', letterSpacing = '',
         width, textAlign = 'left', hasBreak = false, lineHeight, shadow, callback} = props;
        if (shadow) {
          this.setShadow(shadow);
        } else {
          this.setShadow('0 0 0 transparent');
        }
        this.ctx.font = `${fontStyle} ${fontWeight} ${fontSize} PingFangSC-Regular`;
        this.ctx.fillStyle = color;
        if (width) {
          for (let i = 0; i < text.length; i++) {
            if (this.ctx.measureText(text.slice(0, i + 1)).width > width) {
              this.drawText(text.slice(0, i), x, y, {
                ...props,
                hasBreak: true
              });
              lineHeight = lineHeight ? px2Num(lineHeight) : px2Num(fontSize);
              this.drawText(text.slice(i), x, y + lineHeight, props);
              return
            }
          }
        }
        if (textAlign) {
          this.ctx.textAlign = textAlign;
        }
        if (width || hasBreak) {
          switch (textAlign) {
            case 'right':
              x = x + width;
              break
            case 'center':
              x = (x + width) / 2;
              break
          }
        }
        letterSpacing
        ? this.ctx.letterSpacingText(text, x, y + ~~fontSize.replace(/([\d]+)px/, '$1'), ~~px2Num(letterSpacing))
        : this.ctx.fillText(text, x, y + ~~fontSize.replace(/([\d]+)px/, '$1'));
        callback && await callback(this, this.ctx.measureText(text));

      };
      this.reset = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      };
    }
    async loadImg (src) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        if (!this.isBase64(src) && !this.isSomeHost(src)) {
          img.crossOrigin = 'Anonymous';
        }
        img.src = src;
        img.addEventListener('load', loadEvt);
        img.addEventListener('error', errorEvt);
        function loadEvt () {
          removeEvt();
          return resolve(img)
        }
        function errorEvt() {
          console.error('loadImg 图片加载失败: ' + src);
          removeEvt();
          return resolve()
        }
        function removeEvt () {
          img.removeEventListener('load', loadEvt);
          img.removeEventListener('error', errorEvt);
        }
      })
    }
    async getCache (source) {
      if (typeof source === 'string') {
        let key = this.isBase64(source) ? source.slice(-18) : source;
        if (!Object.hasOwnProperty(this.cache, key)) {
          let img = await this.loadImg(source);
          if (img) {
            this.cache[key] = img;
          }
        }
        return this.cache[key] || null
      } else {
        return source
      }
      
    }
    isBase64 (src) {
      return /^data:image\/jpg;base64,/.test(src)
    }
    isSomeHost (src) {
      let result = src.match(/^https?:\/\/[^\/\?#:]+/);
      if (result && result[0] === window.location.hostname) {
        return true
      } else {
        return false
      }
    }
    imageRadiusClip (imgObj, r) {
      let canvas = document.createElement('canvas');
      let w = imgObj.width;
      let h = imgObj.height;
      canvas.width = w;
      canvas.height = h;
      let ctx = canvas.getContext('2d');
      let pattern = ctx.createPattern(imgObj, 'no-repeat');
      let min_size = Math.min(w, h);
      let x = 0;
      let y = 0;
      r = min_size * percent2Num(r);
      if (r > min_size / 2) r = min_size / 2;
      // 开始绘制
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
      ctx.fillStyle = pattern;
      ctx.fill();
      return canvas
    }
    borderRadiusClip (x, y, w, h, r) {
      let min_size = Math.min(w, h);
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
    setShadow (shadow) {
      let [,shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor]  = (shadow || {}).match(/([\d]+)[\s]+([\d]+)[\s]+([\d]+)[\s]+([rgba#()\d,\.\s\w]+)/);
      this.ctx.shadowOffsetX = shadowOffsetX;
      this.ctx.shadowOffsetY = shadowOffsetY;
      this.ctx.shadowBlur = shadowBlur;
      this.ctx.shadowColor = shadowColor;
    }
    output (tiny) {
      if (!tiny) {
        return this.canvas.toDataURL()
      } else {
        return this.canvas.toDataURL('image/jpeg', tiny)
      }
    }
  }

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
    var align = context.textAlign || 'left';
    
    // 这里仅考虑水平排列
    var originWidth = context.measureText(text).width;
    // 应用letterSpacing占据宽度
    var actualWidth = originWidth + letterSpacing * (arrText.length - 1);
    // 根据水平对齐方式确定第一个字符的坐标
    if (align == 'center') {
        x = x - actualWidth / 2;
    } else if (align == 'right') {
        x = x - actualWidth;
    }
    
    // 临时修改为文本左对齐
    context.textAlign = 'left';
    // 开始逐字绘制
    arrText.forEach(function (letter) {
        var letterWidth = context.measureText(letter).width;
        context.fillText(letter, x, y);
        // 确定下一个字符的横坐标
        x = x + letterWidth + letterSpacing;
    });
    // 对齐方式还原
    context.textAlign = align;
  };

  const Cans = class Cans extends Cansf{
    constructor (canvas) {
      super(canvas);
      this.render = async (config) => {
        this.setCanvas(config);
        await this.resolveImages(config.images);
        await this.resolveTexts(config.texts);
        await this.resolveLines(config.lines);
        return this
      };
    }
    setCanvas ({background, width, height}) {
      width && (this.canvas.width = width);
      height && (this.canvas.height = height);
      this.ctx.fillStyle = background;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    async resolveLines (lines = []) {
      for (let i = 0; i < lines.length; i++) {
        let {sx, sy, ex, ey, lineWidth, color, style, shadow, callback} = lines[i];
        await this.drawLine(sx, sy, ex, ey, lineWidth, color, style, shadow, callback);
      }
    }
    async resolveTexts (texts = []) {
      for (let i = 0; i < texts.length; i++) {
        let { text, x, y, ...arg } = texts[i];
        await this.drawText(text, x, y, arg);
      }
    }
    async resolveImages (images = []) {
      let res = await Promise.all(images.map(v => this.getCache(v.source)));
      for (let i = 0; i < res.length; i++) {
        let img = res[i];
        if (!img) {
          console.error('图片加载失败 无法渲染: ' + images[i].source);
          break
        }
        const {x, y, width, height, border, shadow, borderRadius, callback} = images[i];
        await this.drawImage(
          img,
          x,
          y,
          width,
          height,
          {
            border,
            shadow,
            borderRadius,
            callback
          }
        );
      }
    }
  };

  var config = {
    background: '#0f0',
    width: 750,
    height: 1334,
    images: [
      {
        source: 'https://cdn.leoao.com/$24OI2B848%5B%5BK82IT0%25C25W1512445425623.jpg',
        x: 0,
        y: 0,
        width: 550,
        height: 633,
        async callback (cans) {
          await cans.drawImage('https://cdn.leoao.com/experice-rule/rank_1.png', 160, 1146, 102, 30);
          // 如果想要在render结果返回之前执行 请吧callback写成async函数或返回promise
        }
      },
      {
        source: 'https://cdn.leoao.com/62d7e00789971e28713d033599290b1c_hd.jpg',
        x: 30,
        y: 1161,
        width: 100,
        height: 100,
        border: '10px solid #000',
        borderRadius: '50%'
      },
      {
        source: 'https://cdn.leoao.com/62d7e00789971e28713d033599290b1c_hd.jpg',
        x: 500,
        y: 800,
        width: 100,
        height: 100,
        borderRadius: '30%'
      },
      {
        source: 'https://cdn.leoao.com/62d7e00789971e28713d033599290b1c_hd.jpg',
        x: 630,
        y: 800,
        width: 100,
        height: 100,
        shadow: '0 0 20 rgba(0,0,0, .5)'
      }
    ],
    texts: [
      {
        text: '字符间距测试',
        fontSize: '36px',
        fontWeight: 'bold',
        fontFamily: 'Avenir',
        letterSpacing: '20px',
        color: '#000',
        x: 150,
        y: 1200,
        callback (cans, data) {
          console.log('回调测试', cans, data);
        }
      },
      {
        text: '自动换行 + 行高测试 自动换行 + 行高测试 自动换行 + 行高测试 自动换行 + 行高测试 自动换行 + 行高测试 自动换行 + 行高测试 自动换行 + 行高测试 自动换行 + 行高测试 自动换行 + 行高测试 ',
        fontSize: '28px',
        fontWeight: 'bold',
        fontFamily: '',
        lineHeight: '36px',
        textAlign: 'left',
        color: '#000',
        width: 375,
        x: 100,
        y: 700
      },
      {
        text: '居中 + 斜体 + 阴影',
        fontSize: '56px',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontFamily: '',
        textAlign: 'center',
        shadow: '0 0 20 rgba(0,0,0, .5)',
        color: '#ff0',
        width: 750,
        x: 0,
        y: 1050
      },
      {
        x: 0,
        y: 970,
        // width: 750,
        fontSize: '36px',
        color: '#fff',
        textAlign: 'left',
        text: '添加店长微信↑↑↑↑'
      }
    ],
    lines: [
      {
        sx: 0,
        sy: 0,
        ex: 750,
        ey: 750,
        lineWidth: 10,
        color: 'red',
        style: 'solid',
        callback (cans) {
          console.log('回调测试');
        }
      },
      {
        sx: 750,
        sy: 0,
        ex: 0,
        ey: 750,
        lineWidth: 5,
        color: '#ff0',
        style: 'dashed'
      },
    ]
  };

  !async function () {
    var cans = new Cans();
    await cans.render(config);
    var output = cans.output();
    let img = new Image();
    img.style.width = '375px';
    img.src = output;
    document.body.appendChild(img);
    // console.log(cans)
  }();

}());
//# sourceMappingURL=bundle.js.map
