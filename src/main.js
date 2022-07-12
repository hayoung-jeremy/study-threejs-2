import * as THREE from "three"

const canvas = document.querySelector("#test-canvas")
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

// Scene
const scene = new THREE.Scene()

// Camera -- PerspectiveCamera
// const camera = new THREE.PerspectiveCamera(
//   75, // fov
//   window.innerWidth / window.innerHeight, // aspect
//   0.1, // near
//   1000 // far
// )

// camera.position.y = 2
// camera.position.z = 5
// scene.add(camera)

// Camera -- OrthographicCamera
const camera = new THREE.OrthographicCamera(
  -(window.innerWidth / window.innerHeight), // left
  window.innerWidth / window.innerHeight, // right
  1, // top
  -1, // bottom
  0.1, // near
  1000 // far
)
camera.position.x = 2
camera.position.y = 2
camera.position.z = 10
camera.lookAt(0, 0, 0)
camera.zoom = 0.5
camera.updateProjectionMatrix()
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
