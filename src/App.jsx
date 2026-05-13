import { P5Canvas } from "@p5-wrapper/react";
import { followMouseSketch } from "./sketches/followMouseSketch";
import { Balloon } from "./sketches/Balloon";
import { GaussianRandomWalkSketch } from "./sketches/GaussianRandomWalk";
import { Noise2DSketch } from "./sketches/noise2d";
import { ArrowAccelerator } from "./sketches/ArrowAccelerator";
import "./App.css";
import { PerlinAccelerator } from "./sketches/PerlinAccelerator";
import { MouseAcceleration } from "./sketches/MouseAcceleration";
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
  }
  return (
    <div className="app">
      <h2>{sketch}</h2>
      <P5Canvas sketch={sketches[sketch]} loading={LoadingUI} />
    </div>
  );
}

export default App;
