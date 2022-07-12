import * as THREE from "three"

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

  // Camera -- PerspectiveCamera
  const camera = new THREE.PerspectiveCamera(
    75, // fov
    window.innerWidth / window.innerHeight, // aspect
    0.1, // near
    1000 // far
  )

  camera.position.z = 5
  scene.add(camera)

  // Light
  const light = new THREE.DirectionalLight("#fff", 1)
  light.position.z = 2
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
    // draw 함수 내에서 실행된 시점 newTime
    const newTime = Date.now()
    const deltaTime = newTime - oldTime
    // 다음번 drawing 의 기본 값을 위해 oldTime 을 이전번 draw 함수의 newTime 으로 바꿔줌
    oldTime = newTime

    mesh.rotation.y += deltaTime * 0.001
    renderer.render(scene, camera)

    window.requestAnimationFrame(draw)
  }
  draw()

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
