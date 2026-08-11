import { P5Canvas } from "@p5-wrapper/react";
import "./App.css";
import { ArrowAccelerator } from "./sketches/ArrowAccelerator";
import { Balloon } from "./sketches/Balloon";
import { followMouseSketch } from "./sketches/followMouseSketch";
import { GaussianRandomWalkSketch } from "./sketches/GaussianRandomWalk";
import { MouseAcceleration } from "./sketches/MouseAcceleration";
import { Noise2DSketch } from "./sketches/noise2d";
import { PerlinAccelerator } from "./sketches/PerlinAccelerator";
import { BorderForce } from "./sketches/BorderForce";
function LoadingUI() {
  return <p>The sketch is being loaded.</p>;
}

function App({ sketch }) {
  const sketches = {
    "Balloon": Balloon,
    "Mouse Acceleration": MouseAcceleration,
    "Gaussian RandomWalk Sketch": GaussianRandomWalkSketch,
    "Noise Noise2D Sketch": Noise2DSketch,
    "Follow Mouse Sketch": followMouseSketch,
    "Arrow Accelerator": ArrowAccelerator,
    "Perlin Accelerator": PerlinAccelerator,
    "Border Force": BorderForce,
  }
  return (
    <div className="app">
      <h2>{sketch}</h2>
      <P5Canvas sketch={sketches[sketch]} loading={LoadingUI} />
    </div>
  );
}

export default App;
