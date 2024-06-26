import { AccumulativeShadows, RandomizedLight } from "@react-three/drei"
import { useRef } from "react"


const Backdrop = () => {
  const shadowsRef = useRef()

  return (
    <AccumulativeShadows
      ref={shadowsRef}
      temporal
      frames={60}
      alphaTest={0.35}
      scae={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.45}
        ambient={0.25}
        position={[6, 6, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop