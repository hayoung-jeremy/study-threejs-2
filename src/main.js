import * as THREE from "three"

const canvas = document.querySelector("#test-canvas")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
