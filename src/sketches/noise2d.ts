import type { P5CanvasInstance } from "@p5-wrapper/react";

export function Noise2DSketch(p5: P5CanvasInstance) {
  let t = 0;
  p5.setup = () => {
    p5.createCanvas(600, 240);
    p5.colorMode(p5.HSB);
    p5.noiseDetail(4, 0.5);
    p5.pixelDensity(1);
    p5.background(0);
  };

  p5.draw = () => {
    p5.loadPixels();
    let xoff = 0.0;
    for (let x = 0; x < p5.width; x++) {
      let yoff = 0.0;
      for (let y = 0; y < p5.height; y++) {
        const n = p5.noise(xoff, yoff, t);
        const bright = p5.map(n, 0, 1, 0, 255);
        const hue = p5.map(n, 0, 1, 0, 360);

        const idx = 4 * (x + y * p5.width);
        const c = p5.color(hue, 100, bright);
        p5.pixels[idx] = p5.red(c);
        p5.pixels[idx + 1] = p5.green(c);
        p5.pixels[idx + 2] = p5.blue(c);
        p5.pixels[idx + 3] = 255;

        yoff += 0.01;
      }
      xoff += 0.01;
    }

    t += 0.01;
    p5.updatePixels();
  };
}
