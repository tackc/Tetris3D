import { useHelper } from "@react-three/drei";
import { MutableRefObject, useRef } from "react";
import { DirectionalLight, DirectionalLightHelper } from "three";

const Lights = () => {
  const directionalLightRef = useRef<DirectionalLight>(null);
  useHelper(
    directionalLightRef as MutableRefObject<DirectionalLight>,
    DirectionalLightHelper,
    1,
    "#00ffff"
  );

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[-10, 10, 10]} ref={directionalLightRef} />
    </>
  );
};
export default Lights;
