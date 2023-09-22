import { useEffect, useRef, useState } from "react";
import { Line, useKeyboardControls } from "@react-three/drei";
import { Controls } from "../main";
import { Group } from "three";
import { IBoardProps } from "../definitions";
import ActiveShape from "./ActiveShape";
import Mino from "./Mino";

// https://tildesites.bowdoin.edu/~echown/courses/210/javalab9/TetrisAssignment.pdf

const SHAPE_ORIENTATIONS = [
  // The T
  [
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  // The I
  [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  ],
  // The J
  [
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
  ],
  // The L
  [
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
  ],
  // The S
  [
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  // The Z
  [
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
  ],
  // The O
  [
    [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
  ],
];

const randomShape = (): number => {
  return Math.floor(Math.random() * SHAPE_ORIENTATIONS.length);
};

const Board = ({ position }: IBoardProps) => {
  const [matrix, setMatrix] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  ]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [currentOrientation, setCurrentOrientation] = useState(0);
  const [currentShape, setCurrentShape] = useState(randomShape());

  const activeTetrominoRef = useRef<Group>(null);

  const [sub, get] = useKeyboardControls<Controls>();

  const checkCollisions = (
    x: number,
    y: number,
    shape: number[][]
  ): boolean => {
    let collisionDetected = false;
    const collisions = shape.map((row, i) =>
      row.map((column, j) => {
        if (
          y + i >= matrix.length ||
          x + j >= matrix[0].length ||
          x + j < 0 ||
          y + i < 0
        ) {
          if (column === 1) {
            collisionDetected = true;
          }
          return -1;
        }
        const boardColumn = matrix[y + i][x + j];

        if (column === 1 && boardColumn === 1) {
          console.log("collision detected");
          collisionDetected = true;
          return 1;
        } else {
          return 0;
        }
      })
    );

    return collisionDetected;
  };

  const resetActiveShape = () => {
    setX(0);
    setY(0);
    setCurrentShape(randomShape());
  };

  useEffect(() => {
    return sub(
      (state) => state,
      (pressed) => {
        if (pressed.moveLeft) {
          const newX = x - 1;
          const shape = SHAPE_ORIENTATIONS[currentShape][currentOrientation];

          if (checkCollisions(newX, y, shape)) {
            console.log("collision detected");
          } else {
            setX(newX);
          }
        }
        if (pressed.moveRight) {
          // Check if moveRight is allowed
          const newX = x + 1;
          const shape = SHAPE_ORIENTATIONS[currentShape][currentOrientation];

          if (checkCollisions(newX, y, shape)) {
            console.log("collision detected");
          } else {
            setX(newX);
          }
        }
        if (pressed.moveDownSlow) {
          const newY = y + 1;
          const shape = SHAPE_ORIENTATIONS[currentShape][currentOrientation];

          if (checkCollisions(x, newY, shape)) {
            const newMatrix = [...matrix];
            shape.map((row, i) => {
              row.map((column, j) => {
                if (column === 1) {
                  newMatrix[i + y][j + x] = 1;
                  console.log("inserting to board");
                }
              });
            });
            setMatrix(newMatrix);
            resetActiveShape();
          } else {
            setY(newY);
          }
        }
        if (pressed.rotateClockwise) {
          const newOrientation =
            (currentOrientation + 1) % SHAPE_ORIENTATIONS[currentShape].length;
          const shape = SHAPE_ORIENTATIONS[currentShape][newOrientation];

          if (checkCollisions(x, y, shape)) {
            console.log("collision detected");
          } else {
            setCurrentOrientation(newOrientation);
          }
        }
        if (pressed.rotateCounterClockwise) {
          const nextOrientation = currentOrientation - 1;
          const newOrientation =
            nextOrientation < 0
              ? SHAPE_ORIENTATIONS[currentShape].length - 1
              : nextOrientation;

          const shape = SHAPE_ORIENTATIONS[currentShape][newOrientation];

          if (checkCollisions(x, y, shape)) {
            console.log("collision detected");
          } else {
            setCurrentOrientation(newOrientation);
          }
        }
      }
    );
  }, [x, y, currentOrientation, matrix]);

  useEffect(() => {
    console.log("matrix changed");
    let rowsToClear = 0;

    matrix.map((row, i) => {
      let rowFull = true;
      row.map((column, j) => {
        if (column === 0) {
          rowFull = false;
        }
      });
      if (rowFull) {
        // setMatrix(newShiftedMatrix)
        console.log("rowFull = true");
        rowsToClear++;
      }
    });

    console.log("rows cleared", rowsToClear);
  }, [matrix]);

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

      {matrix.map((row, i) =>
        row.map((column, j) => {
          if (column === 1) {
            return (
              <Mino
                key={`${i}${j}`}
                position={[9 - j - 4.5, matrix.length - 0.5 - i, 0]}
              />
            );
          } else {
            return null;
          }
        })
      )}

      {matrix.map((row, i) => (
        <Line
          points={[
            [5, i + 1, 0.45],
            [-5, i + 1, 0.45],
          ]}
          color={0xffff00}
        />
      ))}

      {matrix[0].map((column, i) => (
        <Line
          points={[
            [i - 5, 0, 0.45],
            [i - 5, 20, 0.45],
          ]}
          color={0xffff00}
        />
      ))}

      <ActiveShape
        position={[x, y, 0]}
        groupRef={activeTetrominoRef}
        shapeMatrix={SHAPE_ORIENTATIONS[currentShape][currentOrientation]}
      />
    </group>
  );
};

export default Board;
