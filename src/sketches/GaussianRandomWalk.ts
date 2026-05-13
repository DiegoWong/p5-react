import type { P5CanvasInstance } from "@p5-wrapper/react";

export function GaussianRandomWalkSketch(p5: P5CanvasInstance) {
  class Walker {
    x: number;
    y: number;

    constructor() {
      this.x = p5.width / 2;
      this.y = p5.height / 2;
    }

    step() {
      const stepSize = p5.randomGaussian(0, 5);
      this.x += stepSize * p5.random(-1, 1);
      this.y += stepSize * p5.random(-1, 1);
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
