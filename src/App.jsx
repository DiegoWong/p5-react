import { P5Canvas } from "@p5-wrapper/react";
import { followMouseSketch } from "./sketches/followMouseSketch";
import centerDots from "./sketches/centerDots";
import { GaussianRandomWalkSketch } from "./sketches/GaussianRandomWalk";
import { Noise2DSketch } from "./sketches/noise2d";
import { ArrowAccelerator } from "./sketches/ArrowAccelerator";
import "./App.css";
import { useEffect, useState } from "react";
import { PerlinAccelerator } from "./sketches/PerlinAccelerator";
import { MouseAcceleration } from "./sketches/MouseAcceleration";
function LoadingUI() {
  return <p>The sketch is being loaded.</p>;
}

function App() {
  return (
    <div className="app">
      <h2>Mouse Acceleration</h2>
      <P5Canvas sketch={MouseAcceleration} loading={LoadingUI} />
    </div>
  );
}

export default App;
