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

  // draw
  function draw() {
    // 각도는 Radian 사용
    // Radian == 2 파이, 즉 360도
    // mesh.rotation.y += 0.1
    mesh.rotation.y += THREE.MathUtils.degToRad(1)
    renderer.render(scene, camera)

    // 둘 다 사용 가능하지만, webXR 에서는 setAnimationLoop 가 필수
    // window.requestAnimationFrame(draw)
    renderer.setAnimationLoop(draw)
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
