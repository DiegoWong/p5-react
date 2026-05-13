import type { P5CanvasInstance } from "@p5-wrapper/react";

export function GaussianRandomWalkSketch(p5: P5CanvasInstance) {
  class Walker {
    x: number;
    y: number;

    constructor() {
      this.x = p5.width / 2;
      this.y = p5.height / 2;
    }

    acceptreject() {
      // We do this “forever” until we find a qualifying random value.
      while (true) {
        // Pick a random value.
        let r1 = p5.random(1);
        // Assign a probability.
        let probability = r1 * r1;
        // Pick a second random value.
        let r2 = p5.random(1);

        //{!3} Does it qualify?  If so, we’re done!
        if (r2 < probability) {
          return r1;
        }
      }
    }

    step() {
      let step = 5;
      let xstep = this.acceptreject() * step;
      if (p5.random([false, true])) {
        xstep *= -1;
      }
      let ystep = this.acceptreject() * step;
      if (p5.random([false, true])) {
        ystep *= -1;
      }
      this.x += xstep;
      this.y += ystep;
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
