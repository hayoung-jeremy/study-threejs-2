import * as THREE from "three"
import dat from "dat.gui"

// ----- 주제: 초당 프레임 수 보기(Stats)

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas")
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

  // Scene
  const scene = new THREE.Scene()

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.y = 1
  camera.position.z = 5

  scene.add(camera)

  // Light
  const ambientLight = new THREE.AmbientLight("#fff", 0.2)
  const directionalLight = new THREE.DirectionalLight("#fff", 1)
  directionalLight.position.x = 1
  directionalLight.position.z = 2
  scene.add(directionalLight)
  scene.add(ambientLight)

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({
    color: "seagreen",
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // dat GUI -- javascript object 속성값을 그래픽 기반의 UI 로 조정할 수 있게 도와줌
  const gui = new dat.GUI()
  //   gui.add(
  //     mesh.position, // status
  //     "y", // status value
  //     -5, // min
  //     5 // max
  //   )

  gui
    .add(mesh.position, "z")
    .min(-10)
    .max(3)
    .step(0.01)
    .name("mesh's z position")

  gui
    .add(camera.position, "x")
    .min(-10)
    .max(10)
    .step(0.01)
    .name("camera x position")

  // 그리기
  const clock = new THREE.Clock()

  function draw() {
    const time = clock.getElapsedTime()

    camera.lookAt(mesh.position)
    mesh.rotation.y = time

    renderer.render(scene, camera)
    renderer.setAnimationLoop(draw)
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }

  // 이벤트
  window.addEventListener("resize", setSize)

  draw()
}
