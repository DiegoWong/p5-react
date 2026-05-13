import type { P5CanvasInstance } from "@p5-wrapper/react";

export function followMouseSketch(p5: P5CanvasInstance) {
  class Walker {
    x: number;
    y: number;

    constructor() {
      this.x = p5.width / 2;
      this.y = p5.height / 2;
    }

    step() {
      const r = p5.random(1);

      if (r < 0.5) {
        if (p5.mouseX > this.x) {
          this.x += 1;
        } else {
          this.x -= 1;
        }
        if (p5.mouseY > this.y) {
          this.y += 1;
        } else {
          this.y -= 1;
        }
      } else {
        this.x += p5.random(-1, 1);
        this.y += p5.random(-1, 1);
      }
    }

    show() {
      p5.stroke(0);
      p5.point(this.x, this.y);
    }
  }

  let walker: Walker | null = null;
  p5.setup = () => {
    p5.createCanvas(600, 400);
    p5.background(255);
    walker = new Walker();
  };

  p5.draw = () => {
    walker?.show();
    walker?.step();
  };
}
