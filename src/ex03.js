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
  // 캔버스 베경의 투명도를 설정할 때는 renderer 에서 설정
  //   renderer.setClearAlpha(0) // 1 : 불투명, 0 : 투명
  //   renderer.setClearColor("#00fdf0")

  // Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color("blue") // scene 에서 설정한 배경색은 renderer 에서 설정한 배경색을 무시함

  // Camera -- PerspectiveCamera
  const camera = new THREE.PerspectiveCamera(
    75, // fov
    window.innerWidth / window.innerHeight, // aspect
    0.1, // near
    1000 // far
  )

  camera.position.y = 2
  camera.position.z = 5
  scene.add(camera)

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    color: "#333",
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // draw
  renderer.render(scene, camera)

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