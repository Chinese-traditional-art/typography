const createCanvas = (info = {}) => {
  const {
    width,
    height,
    styles = {},
  } = info;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  Object.keys(styles).forEach((k) => {
    canvas.style[k] = styles[k];
  });

  return canvas;
};

class SealCanvas {
  constructor(opt = {}) {
    this.canvas = createCanvas({
      width: 40,
      height: 60,
    });
    this.ctx = this.canvas.getContext('2d');

    this.text = opt.text;
    this.bgc = '#e70012';
  }

  getSeal() {
    const ctx = this.ctx;

    ctx.fillStyle = this.bgc;
    ctx.beginPath();
    ctx.ellipse(20, 30, 20, 30, 0, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '30px/30px kxzd';
    ctx.fillText(this.text, 5, 30 + 10);

    return this.canvas;
  }
}

/**
  new Seal({
    selectEl: '#j-border',
    text: '',
  });
 */
export default class Seal {
  constructor(opts = {}) {
    const {
      selectEl,
      text = '',
    } = opts;
    this.dom = document.querySelector(selectEl);

    const sealDom = new SealCanvas({
      text,
    }).getSeal();

    this.dom.appendChild(sealDom);
  }
}