window.addEventListener("load", () => {
  // 水波容器类名
  const DEFAULT_WATER_BTN_CLASS = "k-water-btn";
  // 水波的颜色
  const DEFAULT_WATER_FILL_COLOR_ATTR = "data-k-water-fill-color";
  // 水波绘制的画布类名
  const DEFAULT_WATER_BTN_CANVAS_CLASS = "k-water-btn-canvas";
  // 是否关闭连续的波纹(默认开启, 不开启则将该值设为"source-out")
  // const DEFAULT_GLOBAL_COMPOSITE_OPERATION = "source-over";
  const DEFAULT_GLOBAL_COMPOSITE_OPERATION = "data-k-water-unconstant";
  // 默认的水波颜色
  const DEFAULT_FILL_COLOR = "#fff";
  // 默认的水波透明度
  const DEFAULT_GLOBAL_OPACITY = 0.2;
  //  水波的扩散速度
  const DEFAULT_WATER_SPEED = 2;

  let waterTaskList = [];
  let timer = 0;
  let element = createCanvasElement(document.createElement("div"));
  let pen = element.getContext("2d");

  const $containerList = [
    ...document.querySelectorAll(`.${DEFAULT_WATER_BTN_CLASS}`)
  ];
  $containerList.forEach(v => {
    initChildren(v);
    initClickEvent(v);
  });

  timer = window.requestAnimationFrame(render);

  function render() {
    pen.clearRect(0, 0, element.width, element.height);

    waterTaskList.forEach((v, i) => {
      if (v.radius > Math.max(element.width, element.height) + 10) {
        // 运动结束后从任务列表中移除该水波
        waterTaskList.splice(i, 1);
      } else {
        v.radius += DEFAULT_WATER_SPEED;
      }
      v.draw();
    });

    window.requestAnimationFrame(render);
  }

  function initChildren(container) {
    const $canvas = createCanvasElement(container);

    container.appendChild($canvas);
  }

  function initClickEvent(container) {
    container.addEventListener("mousedown", e => {
      const $canvas = container.querySelector(
        `.${DEFAULT_WATER_BTN_CANVAS_CLASS}`
      );

      if (!$canvas) {
        return;
      }

      $canvas.style.opacity = 1;

      const fillColor =
        container.getAttribute(DEFAULT_WATER_FILL_COLOR_ATTR) ||
        DEFAULT_FILL_COLOR;
      const globalCompositeOperation = container.getAttribute(
        DEFAULT_GLOBAL_COMPOSITE_OPERATION
      )
        ? "source-out"
        : "source-over";
      const clientX = e.clientX;
      const clientY = e.clientY;
      const rect = $canvas.getBoundingClientRect();
      const position = {
        x: ~~(clientX - rect.left),
        y: ~~(clientY - rect.top)
      };

      element = $canvas;
      pen = element.getContext("2d");

      waterTaskList.push(
        new Water({
          position,
          radius: 0,
          fillColor,
          globalCompositeOperation
        })
      );
    });
    container.addEventListener("mouseleave", e => {
      const $canvas = container.querySelector(
        `.${DEFAULT_WATER_BTN_CANVAS_CLASS}`
      );

      if (!$canvas) {
        return;
      }

      $canvas.style.opacity = 0;
    });
  }

  /**
   * @summary canvas.width & canvas.height 不能设置为 "100%", 会被当做数值
   * @summary 故需获取父级元素的宽高
   * @param {HTMLElement} container 波浪按钮的容器
   */
  function createCanvasElement(container) {
    const $canvas = document.createElement("canvas");
    const containerRect = container.getBoundingClientRect();

    $canvas.classList += DEFAULT_WATER_BTN_CANVAS_CLASS;
    $canvas.setAttribute("width", `${containerRect.width}px`);
    $canvas.setAttribute("height", `${containerRect.height}px`);
    $canvas.style.cssText += `
      ;position: absolute;
      top: 0;
      left: 0;
      opacity: 1;
      pointer-events: none;
      background-color: transparent;
    `;

    return $canvas;
  }

  /**
   * @description 波纹类
   */
  class Water {
    constructor(options) {
      this.radius = options.radius;
      this.position = options.position;
      this.fillColor = options.fillColor;
      this.globalCompositeOperation = options.globalCompositeOperation;
      this.timer = 0;
    }
    draw() {
      pen.save();
      pen.beginPath();
      pen.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
      pen.fillStyle = this.fillColor;
      pen.globalCompositeOperation = this.globalCompositeOperation;
      pen.globalAlpha = DEFAULT_GLOBAL_OPACITY;
      pen.fill();
      pen.closePath();
      pen.restore();
    }
  }
});
