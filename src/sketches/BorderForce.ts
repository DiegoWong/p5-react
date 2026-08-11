
import type { P5CanvasInstance } from "@p5-wrapper/react";
import p5lib from "p5";

export function BorderForce(p5: P5CanvasInstance) {
  class Walker {
    position: p5lib.Vector;
    velocity: p5lib.Vector;
    acceleration: p5lib.Vector;
    mass: number;
    diameter: number;
    repulsionStrength: number = 100;

    constructor() {
      this.position = p5.createVector(p5.width / 2, p5.height / 2);
      this.velocity = p5.createVector(0, 0);
      this.acceleration = p5.createVector(0, 0);
      this.mass = 1;
      this.velocity.limit(5);
      this.diameter = 100;
    }

    getRepulsionForce(distance: number, directionVector: p5lib.Vector, strength: number) {
      let safeDistance = Math.max(distance, 1);
      let magnitude = (strength) / (safeDistance * safeDistance);
      magnitude = Math.min(magnitude, 10);
      return directionVector.copy().setMag(magnitude)
    }



    applyForce(force: p5lib.Vector) {
      this.acceleration.add(p5lib.Vector.div(force, this.mass));
    }

    update() {
      this.position.add(this.velocity);
      this.velocity.add(this.acceleration);
      this.acceleration.mult(0);
      this.velocity.limit(20);
    }

    show() {
      p5.stroke(0);
      p5.fill(175);
      p5.circle(this.position.x, this.position.y, this.diameter);

    }

    checkEdges() {

      let distanceLeft = this.position.x - this.diameter / 2;
      let distanceRight = p5.width - (this.position.x + (this.diameter / 2))

      if (this.position.y > p5.height - this.diameter / 2) { 
        this.velocity.y *= -1;
        this.position.y = p5.height - this.diameter / 2;
      }
      
      if (distanceLeft < 100) {
        let force = p5.createVector(1, 0); // Pushes right
        const repulsion = this.getRepulsionForce(distanceLeft, force, this.repulsionStrength);
        this.applyForce(repulsion);
      }

      if (distanceRight < 100) {
        let force = p5.createVector(-1, 0); // Pushes left
        const repulsion = this.getRepulsionForce(distanceRight, force, this.repulsionStrength);
        this.applyForce(repulsion);
      }

      // if (this.position.x < 0) {
      //   this.position.x = 0
      // }
    }


    applyPushback() {

      let value = p5.map(this.position.x, 0, p5.width, -100, 100, true);

      this.applyForce(p5.createVector(-value / 100, 0));
    }
  }

  let walker: Walker | null = null;
  p5.setup = () => {
    p5.createCanvas(600, 400);
    p5.background(255);
    walker = new Walker();
  };

  p5.draw = () => {
    p5.background(255);
    walker?.show();
    const gravity = p5.createVector(0, 0.1);
    walker?.applyForce(gravity);
    if (p5.mouseIsPressed) {
      walker?.applyForce(p5.createVector(0.1, 0));
    }
    walker?.checkEdges();
    walker?.applyPushback();
    walker?.update();
  };
}
