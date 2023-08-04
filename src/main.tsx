import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.scss";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";

export type Controls =
  | "moveLeft"
  | "moveRight"
  | "moveDownSlow"
  | "moveDownFast"
  | "rotateClockwise"
  | "rotateCounterClockwise";

const map: KeyboardControlsEntry<Controls>[] = [
  { name: "moveLeft", keys: ["ArrowLeft", "KeyA"] },
  { name: "moveRight", keys: ["ArrowRight", "KeyD"] },
  { name: "moveDownSlow", keys: ["ArrowDown", "KeyS"] },
  { name: "moveDownFast", keys: ["Space"] },
  { name: "rotateClockwise", keys: ["KeyE"] },
  { name: "rotateCounterClockwise", keys: ["KeyQ"] },
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <KeyboardControls map={map}>
      <App />
    </KeyboardControls>
  </React.StrictMode>
);
