import p5 from 'p5'
import type { P5CanvasInstance } from "@p5-wrapper/react";

export function Balloon(p5i: P5CanvasInstance) {
  let t = 0;

  class Balloon {
    x: number;
    y: number;
    helium: p5.Vector;
    wind: p5.Vector;
    acceleration: p5.Vector;
    velocity: p5.Vector;
    position: p5.Vector;

    constructor() {
      this.x = p5i.width / 2;
      this.y = p5i.height;
      this.helium = p5i.createVector(0, -0.01);
      this.wind = p5i.createVector(0.01, 0);
      this.acceleration = p5i.createVector(0, 0);
      this.velocity = p5i.createVector(0, 0);
      this.velocity.limit(5);
      this.position = p5i.createVector(this.x, this.y);
    }

    rebound() {
      const mag = p5i.map(p5i.noise(t), 0, 1, -1, -5);
      this.acceleration.setMag(mag)
    }

    reboundWind() {
      const mag = p5i.map(p5i.noise(t), 0, 1, -1, -5);
      this.wind.setMag(mag)
    }

    move() {
      this.acceleration.add(this.helium);
      this.acceleration.add(this.wind);
      this.velocity.add(this.acceleration);
      this.position.add(this.acceleration)
      if (this.position.y < 0) {
        this.rebound()
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
      }
      if (this.position.x > p5.width || this.position.x < 0) {
        this.reboundWind()
        this.velocity.add(this.wind);
        this.position.add(this.velocity);
      }
      t += 0.01
    }

    draw() {
      console.log(this.position.x, this.position.y)
      p5i.background(255);
      p5i.circle(this.position.x, this.position.y, 20);
      p5i.fill(p5i.color(76, 0, 153));
    }

  }

  let balloon: Balloon | null = null
  p5i.setup = () => {
    p5i.createCanvas(600, 240);
    p5i.background(255);
    p5i.colorMode(p5i.HSB);
    balloon = new Balloon();

  };



  p5i.draw = () => {
    balloon?.move();
    balloon?.draw()
  };
}
