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

  const clock = new THREE.Clock()

  // draw
  function draw() {
    const delta = clock.getDelta()
    // 컴퓨터 사양에 따라 time에 따라 실행 간격의 차이가 생기며, time 의 양도 달라짐
    // 즉, 성능이 좋은 컴퓨터에서는 time 양이 많아 frame 당 움직이는 양도 많아져서 부드러운 animation 가능
    mesh.rotation.y += delta
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
