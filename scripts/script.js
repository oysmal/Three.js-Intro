/**
 * Created by oysmal on 29.09.15.
 */

 var init = function() {
 	var width = window.innerWidth;
 	var height = window.innerHeight;
 	var aspect = width/height;
 	var fov = 45;
 	var near = 0.1;
 	var far = 1000;
 	var canvas = document.getElementById("canvas");

    // Create renderer, set antialias to true if possible
 	var renderer = new THREE.WebGLRenderer({
 		canvas: canvas, 
 		antialias: true
 	});

    // Create camera
 	var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // Create scene
 	var scene = new THREE.Scene();


 	// Load textures using Three.js's built-in functions
 	var sunTexture = THREE.ImageUtils.loadTexture('resources/texture_sun.jpg');
 	var earthTexture = THREE.ImageUtils.loadTexture('resources/texture_earth.jpg');

 	// Create our sun's geometry
 	var radius = 5;
 	var widthSegments = 16;
 	var heightSegments = 16;
 	var sunGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

 	// Create our earth's geometry
 	radius = 2.5;
 	var earthGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

 	// Create our sun's material, making it a Phong material so it supports light.
 	var sunMaterial = new THREE.MeshPhongMaterial({ map: sunTexture});

 	// Create our earth's material, making it a Phong material so it supports light.
 	var earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture});

 	// Create our sun's mesh and add it to the scene
 	var sun = new THREE.Mesh(sunGeometry, sunMaterial);
 	scene.add(sun);

    // Create an orbit node around the sun
    var sunOrbit = new THREE.Object3D();
    sun.add(sunOrbit);

 	// Create our earth's mesh, set it's position and add it as a child of the sunOrbit
 	var earth = new THREE.Mesh(earthGeometry, earthMaterial);
 	earth.position.x = 15;
 	sunOrbit.add(earth);

 	// create a point light and set it as a child of the sun
 	var pointLight = new THREE.PointLight(0xFFFFFF, 5);
 	sun.add(pointLight);

    // Create atmospheric white light
    var amb = new THREE.AmbientLight(0xFFFFFF);
    scene.add(amb);

    // Add camera to scene
	scene.add(camera);
	camera.position.z = 50;

    // Clear window to black and set size
	renderer.setClearColor(0x000000);
	renderer.setSize(width, height);

    // Render the scene
	function render() {
        rotateObject(sun, [0.0,0.01,0.0]);
        rotateObject(sunOrbit, [0.0,0.01,0.0]);
        rotateObject(earth, [0.0,0.02,0.0]);
		renderer.render(scene, camera);
		window.requestAnimFrame(render);
	}
    render();
};


var rotateObject = function(object, rotation) {
    object.rotation.x += rotation[0];
    object.rotation.y += rotation[1];
    object.rotation.z += rotation[2];
};

window.addEventListener('load', init);


// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

