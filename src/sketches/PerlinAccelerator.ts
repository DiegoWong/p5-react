import p5 from "p5";
import type { P5CanvasInstance } from "@p5-wrapper/react";

export function PerlinAccelerator(p5ci: P5CanvasInstance) {
  let perlinObject: PerlinObject | null = null;
  let xt = 0
  let yt = 0
  class PerlinObject {
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;

    constructor() {
      this.position = p5ci.createVector(p5ci.width / 2, p5ci.height / 2);
      this.velocity = p5ci.createVector();
      this.acceleration = p5ci.createVector();
    }


    move() {
      const newX = p5ci.map(p5ci.noise(xt), 0, 1, -1, 1);
      const newY = p5ci.map(p5ci.noise(yt), 0, 1, -1, 1);
      this.acceleration = p5ci.createVector(newX, newY);
      this.velocity.add(this.acceleration);
      this.velocity.limit(5);
      this.position.add(this.velocity);
      xt += 0.01;
      yt += 0.1;
    }

    show() {
      p5ci.circle(this.position.x, this.position.y, 10);
      p5ci.fill(p5ci.color(76, 0, 153));
    }

    checkEdges() {

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
    }
  }

  p5ci.setup = () => {
    p5ci.createCanvas(600, 400);
    p5ci.background(255);
    perlinObject = new PerlinObject();
  };

  p5ci.draw = () => {
    p5ci.background(255);
    perlinObject?.move();
    perlinObject?.checkEdges();
    perlinObject?.show();
  };
}
