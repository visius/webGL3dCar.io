import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js'


const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const CAR = new THREE.Object3D( );
const loader = new GLTFLoader()
loader.load('assets/free_1975_porsche_911_930_turbo.glb', function(glb){
	console.log(glb)
	CAR.add( glb.scene );

	CAR.scale.set(0.3,0.3,0.3)
	CAR.rotation.x = 0.45;
	CAR.rotation.y = -0.5;

	
	scene.add(CAR);
}, function(xhr){
	console.log((xhr.loaded/xhr.total * 100) + "% loaded")
},	function(error){console.log('An error occured')
})


const light = new THREE.DirectionalLight(0xffffff, 1.5)
const ambiLight = new THREE.AmbientLight(0xffffff, 15)
ambiLight.position.set(2,10,5)
light.position.set(2,10,5)
scene.add(light)
scene.add(ambiLight)

//Boiler plate code
const sizes = { with: window.innerWidth, height: window.innerHeight }

const camera = new THREE.PerspectiveCamera(75, sizes.with/sizes.height, 0.1, 10000)
camera.position.set(0,0,1.2)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({ canvas: canvas })
renderer.setClearColor(0xf0f0f0)
renderer.setSize(sizes.with, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//------ mouse control------//
const clock = new THREE.Clock()

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2
const windowY = window.innerHeight / 2

function onDocumentMouseMove (event)  {

    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const tick = () => {

    // Movement Update
    targetX = mouseX * 0.006
    targetY = mouseY * 0.004
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // CAR.rotation.x += (.5 * (targetY - CAR.rotation.x)) * .1
    // CAR.rotation.y += (.5 * (targetX - CAR.rotation.y)) * .1
	CAR.rotation.y -= 0.004;

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
	renderer.render( scene, camera );

}
tick()


// function animate() {
	
// 	requestAnimationFrame( animate );
// 	renderer.render( scene, camera );
// }
// animate();
