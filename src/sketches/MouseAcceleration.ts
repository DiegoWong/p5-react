import type { P5CanvasInstance } from "@p5-wrapper/react";
import p5 from 'p5'

export function MouseAcceleration(p5i: P5CanvasInstance) {
  let ball: Ball | null = null;
  class Ball {
    postion: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;
    topspeed: number = 10;

    constructor() {
      this.postion = p5i.createVector(p5i.width / 2, p5i.height / 2);
      this.velocity = p5i.createVector(0, 0);
      this.acceleration = p5i.createVector(0, 0);
    }

    move() {
      const mouse = p5i.createVector(p5i.mouseX, p5i.mouseY);
      this.acceleration = p5.Vector.sub(mouse, this.postion);
      const distance = 640 - this.acceleration.mag()
      const mag = p5i.map(distance, 0, 640, 0, 10);
      this.acceleration.setMag(mag);
      this.acceleration.limit(1);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.topspeed);
      this.postion.add(this.velocity);
    }

    show() {
      p5i.background(255);
      p5i.circle(this.postion.x, this.postion.y, 20);
      p5i.fill(p5i.color(76, 0, 153));
    }
  }

  p5i.setup = () => {
    p5i.createCanvas(640, 400);
    p5i.background(255);
    ball = new Ball();
  }
  p5i.draw = () => {
    ball?.move();
    ball?.show();
  }

}

