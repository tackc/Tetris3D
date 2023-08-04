import { useRef } from "react";
import { Mesh } from "three";
import { IMinoProps } from "../definitions";

// https://jsfiddle.net/prisoner849/kmau6591/
const vertexShader = `
    varying vec2 vUv;
    void main()	{
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `;
const fragmentShader = `
		//#extension GL_OES_standard_derivatives : enable
    
    varying vec2 vUv;
    uniform float thickness;
   	
    float edgeFactor(vec2 p){
    	vec2 grid = abs(fract(p - 0.5) - 0.5) / fwidth(p) / thickness;
  		return min(grid.x, grid.y);
    }
    
    void main() {
			
      float a = edgeFactor(vUv);
      
      // vec3 c = mix(vec3(1), vec3(0), a);
      vec3 c = mix(vec3(1, 0, 0), vec3(0,0,1), a);
      
      gl_FragColor = vec4(c, 1.0);
    }
  `;

const Mino = ({ position = [0.5, 0.5, 0] }: IMinoProps) => {
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh position={position} ref={meshRef}>
      <boxGeometry></boxGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          thickness: {
            value: 20.0,
          },
        }}
      />
    </mesh>
  );
};

export default Mino;
