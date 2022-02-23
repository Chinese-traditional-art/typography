const createDiv = (styles = {}) => {
  const div = document.createElement('div');
  Object.keys(styles).forEach((k) => {
    div.style[k] = styles[k];
  });

  return div;
};

const createCanvas = (info = {}) => {
  const {
    width,
    height,
    styles,
  } = info;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  Object.keys(styles).forEach((k) => {
    canvas.style[k] = styles[k];
  });

  return canvas;
};

class SimpleBorderLine {
  constructor(opt = {}) {
    this.canvas = createCanvas(opt);
    this.ctx = this.canvas.getContext('2d');

    this.r = 1;
    this.cw = opt.width;
    this.ch = opt.height;
    this.step = 3;

    this.dotColor = opt.dotColor || 'tomato';
  }

  getBorderLine() {
    this.draw();
    return this.canvas;
  }

  draw() {
    const isHorizontal = this.cw / this.ch > 1;
    const axisX = isHorizontal ? this.cw : this.ch;
    const axisY = isHorizontal ? this.ch : this.cw;

    for (let i = 0; i < axisX; i += this.step) {
      for (let j = 0; j < axisY / 4; j += this.step) {
        if (this.getDrawFlag()) {
          this.drawDot({
            y: isHorizontal ? j : i,
            x: isHorizontal ? i : j,
          });
        }
      }
      for (let jj = axisY; jj > 3 * axisY / 4; jj -= this.step) {
        if (this.getDrawFlag()) {
          this.drawDot({
            y: isHorizontal ? jj : i,
            x: isHorizontal ? i : jj,
          });
        }
      }
    }
  }

  drawDot(coord = {}) {
    const {
      x,
      y,
    } = coord;
    const ctx = this.ctx;

    ctx.fillStyle = this.dotColor;
    ctx.beginPath();
    ctx.arc(x, y, this.r + Number(Math.random().toFixed(2)), 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }

  getDrawFlag() {
    return Math.random() > 0.9;
  }
}

/**
  new DotsBorder({
    selectEl: '#j-border',
    borderWidth: 10,
    borderColor: '#333',
    borderDotColor: '#ffffff',
  });
 */
export default class DotsBorder {
  constructor(opts = {}) {
    const {
      selectEl, // : '#j-border',
      borderWidth, // : 10,
      borderColor, // : '#333',
      borderDotColor, // : '#ffffff',
    } = opts;
    this.dom = document.querySelector(selectEl);
    const {
      width,
      height,
    } = window.getComputedStyle(this.dom);
    this.shadowDom = createDiv({
      width,
      height,
      position: 'absolute',
      top: '0',
      left: '0',
      pointerEvents: 'none',
      zIndex: '100',
    });

    this.elInfo = {
      width: this.dom.offsetWidth,
      height: this.dom.offsetHeight,
    };
    /**
      tttttttttttttttttttttttr
      l                      r
      l                      r
      l                      r
      lbbbbbbbbbbbbbbbbbbbbbbb
     */
    const borderLineDataArr = [
      // top
      {
        width: this.elInfo.width - borderWidth,
        height: borderWidth,
        bgc: borderColor,
        dotColor: borderDotColor,
        position: 'absolute',
        top: 0,
        left: 0,
      },
      // right
      {
        width: borderWidth,
        height: this.elInfo.height - borderWidth,
        bgc: borderColor,
        dotColor: borderDotColor,
        position: 'absolute',
        top: 0,
        left: `${this.elInfo.width - borderWidth}px`,
      },
      // bottom
      {
        width: this.elInfo.width - borderWidth,
        height: borderWidth,
        bgc: borderColor,
        dotColor: borderDotColor,
        position: 'absolute',
        top: `${this.elInfo.height - borderWidth}px`,
        left: `${borderWidth}px`,
      },
      // left
      {
        width: borderWidth,
        height: this.elInfo.height - borderWidth,
        bgc: borderColor,
        dotColor: borderDotColor,
        position: 'absolute',
        top: `${borderWidth}px`,
        left: 0,
      },
    ];
    borderLineDataArr.forEach((bld = {}) => {
      const bldDom = new SimpleBorderLine({
        width: bld.width,
        height: bld.height,
        dotColor: bld.dotColor,
        styles: {
          position: bld.position,
          backgroundColor: bld.bgc,
          top: bld.top,
          left: bld.left,
        },
      }).getBorderLine();
      this.shadowDom.appendChild(bldDom);
    });
    this.dom.appendChild(this.shadowDom);
  }
}