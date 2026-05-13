import type { P5CanvasInstance } from "@p5-wrapper/react";
import p5 from "p5";

export function ArrowAccelerator(p5ci: P5CanvasInstance) {
  class ArrowObject {
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;

    constructor() {
      this.position = p5ci.createVector(p5ci.width / 2, p5ci.height / 2);
      this.velocity = p5ci.createVector(0, 0);
      this.acceleration = p5ci.createVector(0, 0);
    }

    move() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
    }

    show() {
      p5ci.background(255);
      if (this.position.x > p5ci.width) {
        this.position.x = 0;
      } else if (this.position.x < 0) {
        this.position.x = p5ci.width;
      }
      if (this.position.y > p5ci.height) {
        this.position.y = 0;
      } else if (this.position.y < 0) {
        this.position.y = p5ci.height;
      }
      p5ci.circle(this.position.x, this.position.y, 10);
      p5ci.fill(p5ci.color(76, 0, 153));
    }

    accelerate() {
      this.acceleration = p5ci.createVector(0.01, 0);
    }

    decelerate() {
      this.acceleration = p5ci.createVector(-0.01, 0);
    }
  }

  let arrow: ArrowObject | null = null;
  p5ci.setup = () => {
    p5ci.createCanvas(600, 400);
    p5ci.background(255);
    arrow = new ArrowObject();
  };

  p5ci.keyPressed = () => {
    if (p5ci.key === p5ci.UP_ARROW) {
      arrow?.accelerate();
    } else if (p5ci.key === p5ci.DOWN_ARROW) {
      arrow?.decelerate();
    }
  };

  p5ci.draw = () => {
    arrow?.show();
    arrow?.move();
  };
}
