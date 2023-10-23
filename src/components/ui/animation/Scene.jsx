import { Plane, useAspect, useTexture } from '@react-three/drei'
import { createRoot, events, extend, useFrame } from '@react-three/fiber'
import { DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing'
import { MaskFunction } from 'postprocessing'
import { useLayoutEffect, useRef, useState } from 'react'
import { Group, MathUtils, Mesh, PlaneGeometry, Vector3 } from 'three'
import { Fireflies } from './Fireflies'
import './layerMaterial'

let bgUrl = '/resources/bg.jpg'
let starsUrl = '/resources/stars.png'
let groundUrl = '/resources/ground.png'
let fanUrl = '/resources/fan.png'
let fans1Url = '/resources/fans1.png'
let fans2Url = '/resources/fans2.png'

function Experience() {
  const scaleN = useAspect(1600, 1000, 1.05)
  const scaleW = useAspect(1900, 1000, 1.05)
  const textures = useTexture([bgUrl, starsUrl, groundUrl, fanUrl, fans1Url, fans2Url])
  const group = useRef()
  const layersRef = useRef([])
  const [movement] = useState(() => new Vector3())
  const [temp] = useState(() => new Vector3())
  const layers = [
    { texture: textures[0], x: 0, y: 0, z: 0, factor: 0.005, scale: scaleW },
    { texture: textures[1], x: 0, y: 0, z: 10, factor: 0.005, wiggle: 0.2, scale: scaleW },
    { texture: textures[2], x: 0, y: 0, z: 20, scale: scaleW, wiggle: 0.4 },
    { texture: textures[3], x: 10, y: 5, z: 30, scaleFactor: 0.9, wiggle: 0.4, scale: scaleN },
    {
      texture: textures[4],
      x: 0,
      y: 0,
      z: 40,
      factor: 0.03,
      scaleFactor: 1,
      wiggle: 0.6,
      scale: scaleW
    },
    {
      texture: textures[5],
      x: 0,
      y: 0,
      z: 49,
      factor: 0.03,
      scaleFactor: 1,
      wiggle: 0.4,
      scale: scaleW
    }
  ]

  useFrame((state, delta) => {
    movement.lerp(temp.set(state.pointer.x, state.pointer.y * 0.2, 0), 0.2)
    group.current.position.x = MathUtils.lerp(group.current.position.x, state.pointer.x * 20, 0.05)
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, state.pointer.y / 20, 0.05)
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, -state.pointer.x / 10, 0.05)
    layersRef.current[4].uniforms.time.value = layersRef.current[5].uniforms.time.value += delta
    layersRef.current[1].uniforms.time.value = layersRef.current[2].uniforms.time.value += delta
  }, 1)

  return (
    <group ref={group}>
      <Fireflies count={10} radius={80} colors={['orange']} />
      {layers.map(
        ({ scale, texture, ref, factor = 0, scaleFactor = 1, wiggle = 0, x, y, z }, i) => (
          <Plane
            scale={scale}
            args={[1, 1, wiggle ? 10 : 1, wiggle ? 10 : 1]}
            position={[x, y, z]}
            key={i}
            ref={ref}
          >
            <layerMaterial
              // eslint-disable-next-line react/no-unknown-property
              movement={movement}
              // eslint-disable-next-line react/no-unknown-property
              textr={texture}
              // eslint-disable-next-line react/no-unknown-property
              factor={factor}
              ref={(el) => (layersRef.current[i] = el)}
              // eslint-disable-next-line react/no-unknown-property
              wiggle={wiggle}
              scale={scaleFactor}
            />
          </Plane>
        )
      )}
    </group>
  )
}

function Effects() {
  const ref = useRef()
  useLayoutEffect(() => {
    const maskMaterial = ref.current.maskPass.getFullscreenMaterial()
    maskMaterial.maskFunction = MaskFunction.MULTIPLY_RGB_SET_ALPHA
  })
  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <DepthOfField ref={ref} target={[0, 0, 30]} bokehScale={8} focalLength={0.1} width={1024} />
      <Vignette />
    </EffectComposer>
  )
}

export function Scene() {
  return (
    <Canvas>
      <Experience />
      <Effects />
    </Canvas>
  )
}

// eslint-disable-next-line react/prop-types
function Canvas({ children }) {
  extend({ Mesh, PlaneGeometry, Group })
  const canvas = useRef(null)
  const root = useRef(null)
  useLayoutEffect(() => {
    if (!root.current) {
      root.current = createRoot(canvas.current).configure({
        events,
        orthographic: true,
        gl: { antialias: false },
        camera: { zoom: 5, position: [0, 0, 200], far: 300, near: 50 },
        onCreated: (state) => {
          state.events.connect(document.getElementById('root'))
          state.setEvents({
            compute: (event, state) => {
              state.pointer.set(
                (event.clientX / state.size.width) * 2 - 1,
                -(event.clientY / state.size.height) * +1
              )
              state.raycaster.setFromCamera(state.pointer, state.camera)
            }
          })
        }
      })
    }
    const resize = () =>
      root.current.configure({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', resize)
    root.current.render(children)
    return () => window.removeEventListener('resize', resize)
  }, [children])

  return (
    <div className='root w-full h-full m-0 p-0 -webkit-touch-callout-none overflow-hidden bg-gray-900'>
      <canvas
        ref={canvas}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: 'block'
        }}
      />
    </div>
  )
}
