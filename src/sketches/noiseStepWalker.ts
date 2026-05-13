import type { P5CanvasInstance } from "@p5-wrapper/react";

export function GaussianRandomWalkSketch(p5: P5CanvasInstance) {
  class Walker {
    x: number;
    y: number;
    ts: number;

    constructor() {
      this.x = p5.width / 2;
      this.y = p5.height / 2;
      this.ts = 0;
    }

    step() {
      const noiseStep = p5.map(p5.noise(this.ts), 0, 1, -5, 5);
      this.x += noiseStep;
      this.y += noiseStep;
      this.ts += 0.01;
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
