import * as THREE from "three"
import gsap from "gsap"

export default function example() {
  const canvas = document.querySelector("#test-canvas")
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  // Scene
  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog("#000", 3, 7)

  // Camera -- PerspectiveCamera
  const camera = new THREE.PerspectiveCamera(
    75, // fov
    window.innerWidth / window.innerHeight, // aspect
    0.1, // near
    1000 // far
  )

  camera.position.y = 1
  camera.position.z = 5
  scene.add(camera)

  // Light
  const light = new THREE.DirectionalLight("#fff", 1)
  light.position.x = 1
  light.position.y = 3
  light.position.z = 5
  scene.add(light)

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({
    color: "#333",
  })

  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // 기본 고정 default time
  let oldTime = Date.now()

  // draw
  function draw() {
    const newTime = Date.now()
    const deltaTime = newTime - oldTime
    oldTime = newTime

    renderer.render(scene, camera)

    window.requestAnimationFrame(draw)
  }
  draw()

  // gsap
  gsap.to(mesh.position, {
    duration: 1,
    y: 2,
  })

  // event
  function setSize() {
    // camera 조정
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }
  window.addEventListener("resize", setSize)
}
