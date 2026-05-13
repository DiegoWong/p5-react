import type { P5CanvasInstance } from "@p5-wrapper/react";

interface CenterDotsProps {
  deviation: number;
}

function centerDots(p5: P5CanvasInstance) {
  let deviation: number = 50;
  class Painter {
    x: number;
    y: number;
    colors: string[];
    color: number;
    constructor() {
      this.x = p5.width / 2;
      this.y = p5.height / 2;
      this.colors = [
        "red",
        "green",
        "blue",
        "yellow",
        "purple",
        "orange",
        "pink",
        "brown",
        "gray",
        "black",
      ];
      this.color = p5.randomGaussian(0, this.colors.length - 1);
    }

    paint() {
      const rx = p5.randomGaussian(300, deviation);
      const ry = p5.randomGaussian(200, deviation);
      this.x = rx;
      this.y = ry;
      this.color = Math.floor(p5.randomGaussian(0, this.colors.length - 1));
    }

    show() {
      p5.stroke(this.colors[this.color] as string);
      p5.fill(this.colors[this.color] as string);
      p5.circle(this.x, this.y, 10);
    }
  }
  p5.updateWithProps = (props) => {
    if (props.deviation) {
      deviation = Number(props.deviation);
    }
  };
  let painter: Painter | null = null;
  p5.setup = () => {
    p5.createCanvas(600, 400);
    p5.background(255);
    painter = new Painter();
  };
  p5.draw = () => {
    painter?.paint();
    painter?.show();
  };
}

export default centerDots;
