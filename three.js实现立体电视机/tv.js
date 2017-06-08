var AMOUNT = 100;
var container;
var camera, scene, renderer;
var video, image, imageContext,
    imageReflection, imageReflectionContext, imageReflectionGradient,
    texture, textureReflection;
var mesh;
var mouseX = 0;
var mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();

animate();

function init() {

    // 新建一个盒子
    container = document.createElement('div');
    document.body.appendChild(container);

    // 新建一个canvas,用于新建映射内容
    video = document.getElementById('video');
    image = document.createElement('canvas');
    image.width = 480;
    image.height = 204;
    imageContext = image.getContext('2d');
    // imageContext.fillStyle = '#111';
    // imageContext.fillRect(100, 100, 480, 204);

    // 新建scene,camera，以及设置属性
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    // 设置纹理样式
    texture = new THREE.Texture(image);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // 设置材料
    var material = new THREE.MeshBasicMaterial({
        map: texture,
        overdraw: true
    });

    // 新建一个canvas
    imageReflection = document.createElement('canvas');
    imageReflection.width = 480;
    imageReflection.height = 204;
    imageReflectionContext = imageReflection.getContext('2d');
    imageReflectionContext.fillStyle = '#000000';
    imageReflectionContext.fillRect(0, 0, 480, 204);
    imageReflectionGradient = imageReflectionContext.createLinearGradient(0, 0, 0, 204);
    imageReflectionGradient.addColorStop(0.8, 'rgba(240, 240, 240, 1)');
    imageReflectionGradient.addColorStop(1, 'rgba(240, 240, 240, 0.8)');

    // 设置纹理
    textureReflection = new THREE.Texture(imageReflection);
    textureReflection.minFilter = THREE.LinearFilter;
    textureReflection.magFilter = THREE.LinearFilter;

    // 设置材料
    var materialReflection = new THREE.MeshBasicMaterial({
        // map: textureReflection,
        side: THREE.BackSide,
        overdraw: true
    });

    // 设置几何平面，即电视机效果
    var plane = new THREE.PlaneGeometry(480, 204, 1, 1);
    mesh = new THREE.Mesh(plane, material);
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.5;
    scene.add(mesh);

    // 倒影
    mesh = new THREE.Mesh(plane, materialReflection);
    mesh.position.y = -306;
    mesh.rotation.x = -Math.PI;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.5;
    scene.add(mesh);

    var separation = 150;
    var amountx = 10;
    var amounty = 10;
    var PI2 = Math.PI * 2;

    // 创建粒子效果
    var material = new THREE.ParticleCanvasMaterial({
        color: 0x0808080,
        program: function (context) {
            context.beginPath();
            context.arc(0, 0, 1, 0, PI2, true);
            context.closePath();
            context.fill();
        }
    });

    //创建一个10x10的粒子矩阵 
    for (var ix = 0; ix < amountx; ix++) {
        for (var iy = 0; iy < amounty; iy++) {
            particle = new THREE.Particle(material);
            particle.position.x = ix * separation - ((amountx * separation) / 2);
            particle.position.y = -153
            particle.position.z = iy * separation - ((amounty * separation) / 2);
            scene.add(particle);
        }
    }

    // 渲染图形
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY) * 0.2;
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        imageContext.drawImage(video, 0, 0);
        if (texture) texture.needsUpdate = true;
        if (textureReflection) textureReflection.needsUpdate = true;
    }

    imageReflectionContext.drawImage(image, 0, 0);
    imageReflectionContext.fillStyle = imageReflectionGradient;
    imageReflectionContext.fillRect(0, 0, 480, 204);
    renderer.render(scene, camera);

}