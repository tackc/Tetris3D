import { useEffect, useRef } from "react";
import Square from "./Square";
import I from "./I";
import T from "./T";
import { useKeyboardControls } from "@react-three/drei";
import { Controls } from "../main";
import { Group } from "three";
import { IBoardProps } from "../definitions";
import S from "./S";
import Z from "./Z";
import J from "./J";
import L from "./L";

// https://tildesites.bowdoin.edu/~echown/courses/210/javalab9/TetrisAssignment.pdf

const Board = ({ position }: IBoardProps) => {
  const activeTetrominoRef = useRef<Group>(null);

  const move = (x: 1 | 0 | -1, y: 0 | -1 = 0) => {
    if (activeTetrominoRef.current) {
      activeTetrominoRef.current.position.x += x;
      activeTetrominoRef.current.position.y += y;
    }
  };

  const rotate = (angle: number) => {
    if (activeTetrominoRef.current) {
      activeTetrominoRef.current.rotateZ(angle);
    }
  };

  const [sub, get] = useKeyboardControls<Controls>();

  useEffect(() => {
    return sub(
      (state) => state,
      (pressed) => {
        if (pressed.moveLeft) {
          move(1);
        }
        if (pressed.moveRight) {
          move(-1);
        }
        if (pressed.moveDownSlow) {
          move(0, -1);
        }
        if (pressed.rotateClockwise) {
          rotate(Math.PI / 2);
        }
        if (pressed.rotateCounterClockwise) {
          rotate(-Math.PI / 2);
        }
      }
    );
  }, []);

  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 1]}></planeGeometry>
        <meshNormalMaterial />
      </mesh>
      <mesh rotation={[-Math.PI, 0, 0]} position={[0, 10, 0.5]}>
        <planeGeometry args={[10, 20]}></planeGeometry>
        <meshNormalMaterial />
      </mesh>

      {/* Active Shape (component) */}
      {/* Locked Shapes (2d array of Minos) */}

      {/* The I */}
      <I position={[-3, 8.5, 0]} groupRef={activeTetrominoRef} />

      {/* The O */}
      <Square position={[0, 1, 0]} groupRef={activeTetrominoRef} />

      {/* The T */}
      <T position={[0.5, 5, 0]} groupRef={activeTetrominoRef} />

      {/* The S */}
      <S position={[3.3, 9, 0]} groupRef={activeTetrominoRef} />

      {/* The Z */}
      <Z position={[0.5, 11, 0]} groupRef={activeTetrominoRef} />

      {/* The J */}
      <J position={[3.5, 14, 0]} groupRef={activeTetrominoRef} />

      {/* The L */}
      <L position={[-3.5, 16, 0]} groupRef={activeTetrominoRef} />
    </group>
  );
};

export default Board;
