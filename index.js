import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';


//STANDARD SETUP
    const scene = new THREE.Scene(); //nieuwe 3D scene aanmaken

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //360deg POV , resolution, what is and what isn't visible

    camera.position.setZ(30); //verplaats camera op Z-as

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
    });// bring 3D objects to the scene

    renderer.setPixelRatio( window.devicePixelRatio);
    renderer.setSize ( window.innerWidth, window.innerHeight);//grootte van canvas (in dit geval full screen)

    renderer.render( scene, camera); //commando om objecten te renderen
//BACKGROUND
    const spaceTexture = new THREE.TextureLoader().load('space.jpg');
    scene.background = spaceTexture;
    //load a background image

//HELPERS
    /*const gridHelper = new THREE.GridHelper(200, 50);
       scene.add(gridHelper)*/

//OBJECTS

        //CUSTOM MODELS
     let planeMesh
     const loader = new GLTFLoader();
     loader.load('mustang.glb', function (gltfModel){
         planeMesh = gltfModel.scene.children.find((child) => child.name === "Mustang" );
         planeMesh.scale.set(planeMesh.scale.x * 0.002, planeMesh.scale.y * 0.002, planeMesh.scale.z * 0.002);
         planeMesh.position.y = 0.17;
         planeMesh.position.z = 28;
         planeMesh.position.x = 0;
         planeMesh.rotation.y = 80;
         scene.add(planeMesh);
      });
      let rails
      loader.load('rails.glb', function (gltfModel){
          rails = gltfModel.scene.children.find((child) => child.name === "Rails");
          rails.scale.set(rails.scale.x * 0.002, rails.scale.y * 0.002, rails.scale.z * 0.002);
          rails.position.y = 0;
          rails.position.z =28;
          rails.position.x =-0.5;
          rails.rotation.y = 80;
          scene.add(rails);
       });
//LIGHTS


    const pointlight = new THREE.PointLight(0xffffff)//pointlight = lightbulb
    pointlight.position.set(15,15,35)

    //const ambientLight = new THREE.AmbientLight(0xffffff);

    scene.add(pointlight)

//ORBITCONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
function animate(){
    requestAnimationFrame(animate);

    controls.update();//zorgt ervoor dat orbit controls werkend zijn.
    renderer.render( scene, camera);
}
//SCROLL Animatie

function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    planeMesh.position.x = t * 0.005;
    if (t == -1641) {
        document.querySelector("main").style.visibility = "hidden";
        document.title ="Z W 🌍" //change docu.title
      }
    else{
        document.querySelector("main").style.visibility = "visible";
        document.title ="Zach's World 🌍" // change docu. title
    }
}

document.body.onscroll = moveCamera
animate()

