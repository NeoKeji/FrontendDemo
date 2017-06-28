import React from 'react';
import Model3D from '../js/Model3d.js'
import '../assets/style/view3D.less';

const VIEW_DEFAULT_PARAMS  = {
  ambientLight : 0xBBBBBB,
  directionalLight : 0xffffff,
  z:250,
  fileName:{
    obj:'male02.obj',
    mtl:'male02_dds.mtl'
  },
  path:{
    obj:'Resources/Models/male02/',
    mtl:'Resources/Models/male02/'
  },
  modelInitOffset:{
    x:-50,
    y:-95,
    z:0
  },
  clearColor: 0xF7F7F7,
  useWebglRender: true
};

const objectNames = {
    groundPlane: 'ground-plane',
    coordAxes:  'coord-axes'
}

//View3D component used to display 3d model
class View3D extends React.Component {

  constructor(props){
    super(props);

    this.scene = new THREE.Scene();
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.viewWidth = window.innerWidth;
    this.viewHeight = window.innerHeight;
    this.mouseX = 0;
    this.mouseY = 0;
    this.windowHalfX = 0;
    this.windowHalfY = 0;

    this.effectController = {
        showGround: true,
        showAxes:   false
    };
  }

  render() {
      return (
         <div ref='viewContainer'>
         View3D
         </div>
      );
  }

  componentDidMount(){
    this.setupEffectController();
    this.initView();
    this.display();
  }

  setupEffectController(){
      var effectController = new dat.GUI({
          height:28*2 - 1
      });

      effectController.domElement.id = 'effect-controller';

      effectController.add(this.effectController, 'showGround').name("Show Ground Plane");
      effectController.add(this.effectController, 'showAxes').name("Show Axes");
  }

  initView(){
    // this.scene = new THREE.Scene();

    this.createRenderer(this.viewWidth, this.viewHeight, VIEW_DEFAULT_PARAMS.useWebglRender);

    this.addCamera();

    this.addLighting();

    var model = new Model3D(this.scene);

    //model.loadObjModelWithMtl(VIEW_DEFAULT_PARAMS.path.obj + VIEW_DEFAULT_PARAMS.fileName.obj, VIEW_DEFAULT_PARAMS.path.mtl+VIEW_DEFAULT_PARAMS.fileName.mtl);
    model.loadObjModel("../../Resources/Models/Male/KbSimplified.obj", "../../Resources/Models/Male/KbSimplified.png");
    //model.loadJSONModel("../../Resources/Models/Male/KobeFused.json","../../Resources/Models/Male/KbSimplified.png");
    if(this.effectController.showGround)
        this.drawPlane(1,12,12)
    if(this.effectController.showAxes)
        this.drawAxes(15);


    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    this.controls.target.set(5,6,0)

    window.addEventListener( 'resize', this.resizeFunc );

  }

  //Add a basic triangle geometry for test purpose
  drawGeometry(scene){
    var triangleGeometry = new THREE.Geometry();

    triangleGeometry.vertices.push(new THREE.Vector3(0,17,0));
    triangleGeometry.vertices.push(new THREE.Vector3(3,0,0));
    triangleGeometry.vertices.push(new THREE.Vector3(-3,0,0));

    triangleGeometry.faces.push( new THREE.Face3(0,1,2));

    var basicMaterial = new THREE.MeshBasicMaterial({
      color: 0x2685AA,
      side: THREE.DoubleSide
    });

    var triangleMesh = new THREE.Mesh(triangleGeometry, basicMaterial);
    scene.add(triangleMesh);
  }

  display() {
    requestAnimationFrame(()=>{this.display();});

    if(this.effectController.showGround){
        this.drawPlane(1,12,12);
    }else{
        this.removePlane();
    }

    if(this.effectController.showAxes){
        this.drawAxes(15);
    }else{
        this.removeAxes();
    }

    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }

  /*_onWindowResize() {

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    this.state.renderer.setSize( window.innerWidth, window.innerHeight );
    this.state.camera.aspect = window.innerWidth / window.innerHeight;
    this.state.camera.updateProjectionMatrix();

  }*/

  resizeFunc(){

    var width = window.innerWidth,
        height = window.innerHeight;
    if(height == 0){
        height = 1;
    }

    this.renderer.setSize(width, height);
    this.camera.aspect = width/height;
    this.camera.updateProjectionMatrix();

  }

  createRenderer(width, height, useWebgl){

    if(useWebgl == true)
      this.renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
    else
      this.renderer = new THREE.CanvasRenderer();

    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(VIEW_DEFAULT_PARAMS.clearColor);
    //document.body.appendChild(this.renderer.domElement);
    this.refs.viewContainer.getDOMNode().appendChild( this.renderer.domElement );
  }

  addLighting() {

    var ambientLight = new THREE.AmbientLight(VIEW_DEFAULT_PARAMS.ambientLight );
    this.scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( VIEW_DEFAULT_PARAMS.directionalLight );
    directionalLight.position.set( 0, 0, 1000 );
    this.scene.add( directionalLight );

    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100,200,100);
    this.scene.add(light);
  }

  addCamera(){

    this.camera = new THREE.PerspectiveCamera(45, this.viewWidth/this.viewHeight, 0.1, 4000);
    this.camera.position.set(3, 6, 40);
    this.camera.up.set(0,1,0);
    //this.camera.target.set(0,50,0);
    // this.camera.lookAt(new THREE.Vector3(0, -100, 0));
    this.scene.add(this.camera);

  }

  //step_size is the size of each grid_size
  //size_x, size_z decide plane size in x and z direction
  drawPlane(step_size, size_x, size_z){
    if(this.scene.getObjectByName(objectNames.groundPlane) != null){
        return;
    }

    if(size_x <= 0 || size_z <= 0){
      return;
    }

    var gridGeometry = new THREE.Geometry();
    var wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xA9A9A9 });

    gridGeometry.vertices.push(new THREE.Vector3(0,0,-size_z/2));
    gridGeometry.vertices.push(new THREE.Vector3(0,0,size_z/2));
    gridGeometry.vertices.push(new THREE.Vector3(-size_x/2,0,0));
    gridGeometry.vertices.push(new THREE.Vector3(size_x/2,0,0));

    for(var x = step_size; x < size_x/2; x += step_size){
      gridGeometry.vertices.push(new THREE.Vector3(x,0,-size_z/2));
      gridGeometry.vertices.push(new THREE.Vector3(x,0,size_z/2));

      gridGeometry.vertices.push(new THREE.Vector3(-x,0,-size_z/2));
      gridGeometry.vertices.push(new THREE.Vector3(-x,0,size_z/2));
    }

    for(var z = step_size; z < size_z/2; z += step_size){
      gridGeometry.vertices.push(new THREE.Vector3(-size_x/2,0,z));
      gridGeometry.vertices.push(new THREE.Vector3(size_x/2,0,z));

      gridGeometry.vertices.push(new THREE.Vector3(-size_x/2,0,-z));
      gridGeometry.vertices.push(new THREE.Vector3(size_x/2,0,-z));
    }

    var gridPlane = new THREE.Line(gridGeometry, wireframeMaterial, THREE.LinePieces);
    gridPlane.name = objectNames.groundPlane;
    this.scene.add(gridPlane);
  }

  removePlane(){
      var object = this.scene.getObjectByName(objectNames.groundPlane);
      if(object != null){
          this.scene.remove(object);
      }
  }

  drawAxes(size){
      if(this.scene.getObjectByName(objectNames.coordAxes) != null){
          return;
      }

      var axisHelper = new THREE.AxisHelper(size);
      axisHelper.name = objectNames.coordAxes;
      this.scene.add(axisHelper);
  }

  removeAxes(){
      var object = this.scene.getObjectByName(objectNames.coordAxes);
      if(object != null){
          this.scene.remove(object);
      }
  }

}

export default View3D;
