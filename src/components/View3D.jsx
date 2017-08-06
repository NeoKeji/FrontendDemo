import React from 'react';
import Model3D from '../js/Model3d.js'
import Panel from './panel.jsx';
import Tabs from './Tabs.jsx';
import '../assets/style/view3D.less';

const VIEW_DEFAULT_PARAMS  = {
  ambientLight:{
      color : 0xFFFFFF,
      intensity: 0.5
  },
  directionalLight:{
      color: 0xffffff,
      intensity: 0.3
  },
  pointLight:{
      color: 0xFFF0DD,
      intensity: 1.0
  },
  z:250,
  fileName:{
    obj:'KBWithSubDiv.obj',
    mtl:'KBWithSubDiv.mtl'
  },
  path:{
    obj:'Resources/Models/Male/',
    mtl:'Resources/Models/Male/'
  },
  modelInitOffset:{
    x:-50,
    y:-95,
    z:0
  },
  camera:{
    fov:  45,
    near: 0.1,
    far:  1000
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
    this.headLight = null;
    this.groundPlane = null;
    this.axes = null;

    this.effectController = {
        showGround: true,
        showAxes:   false
    };

    this.viewDOM = null;

    this.state = {
      showImage: false,
      imageUrl: "../src/assets/images/bodygenerationpage/u649.png"
    };

    this.resizeFunc = this.resizeFunc.bind(this);
    this.modelLoadDone = this.modelLoadDone.bind(this);
    this.handlePanelItemSelection = this.handlePanelItemSelection.bind(this);
  }

  render() {
      return (
        <div>
           <div className="view3d" ref={(dom) => {this.viewDOM = dom}} style={{display: !this.state.showImage?'block':'None'}}>
           </div>
           <div className="demo-image" style={{display: this.state.showImage?'block':'None'}}>
              <img src={this.state.imageUrl} style={{width:'70%',marginTop:'5%', marginBottom:'2%', marginLeft:'2%', marginRight: '20%'}}/>
           </div>
           <Panel content={<Tabs view3dItemSelHandler={this.handlePanelItemSelection}/>}/>
        </div>
      );
  }

  handlePanelItemSelection(View3dShowImage, View3dImageUrl){
      this.setState({
        showImage: View3dShowImage,
        imageUrl: View3dImageUrl
      });
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

    var model = new Model3D(this.scene, this.modelLoadDone);

    model.loadObjModelWithMtl(VIEW_DEFAULT_PARAMS.path.obj + VIEW_DEFAULT_PARAMS.fileName.obj, VIEW_DEFAULT_PARAMS.path.mtl+VIEW_DEFAULT_PARAMS.fileName.mtl);
    //model.loadObjModelWithMtl("Resources/Models/Female/AngelababyWithSubDivision.obj", "Resources/Models/Female/AngelababyWithSubDivision.mtl");
    //model.loadObjModelWithMtl("Resources/Models/Male/KbSimplified.obj", "Resources/Models/Male/KbSimplified.mtl");
    // model.loadObjModelWithMtl("Resources/Models/KobeFace/KobeFace.obj", "Resources/Models/KobeFace/KobeFace.mtl");
    //model.loadObjModelWithMtl("Resources/Models/AngelaBaby/AngelaBabyFace.obj", "Resources/Models/AngelaBaby/AngelaBabyFace.mtl");
    //model.loadJSONModel("../../Resources/Models/Male/KobeFused.json","../../Resources/Models/Male/KbSimplified.png");

    if(this.effectController.showGround)
        this.drawPlane(1,12,12)
    if(this.effectController.showAxes)
        this.drawAxes(15);

    window.addEventListener( 'resize', this.resizeFunc );

  }

  modelLoadDone(model){
    this.fitCamera(model);
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

    this.headLight.position.copy(this.camera.position);

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
    this.viewDOM.getDOMNode().appendChild( this.renderer.domElement );
  }

  addLighting() {

    var ambientLight = new THREE.AmbientLight(VIEW_DEFAULT_PARAMS.ambientLight.color, VIEW_DEFAULT_PARAMS.ambientLight.intensity);
    this.scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( VIEW_DEFAULT_PARAMS.directionalLight.color, VIEW_DEFAULT_PARAMS.directionalLight.intensity);
    directionalLight.position.set( 0, 0, 1000 );
    this.scene.add( directionalLight );

    this.headLight = new THREE.PointLight(VIEW_DEFAULT_PARAMS.pointLight.color, VIEW_DEFAULT_PARAMS.pointLight.intensity);
    //light.position.set(-100,200,100); Fix headLight position to the camera
    this.scene.add(this.headLight);
  }

  addCamera(){
    this.camera = new THREE.PerspectiveCamera(VIEW_DEFAULT_PARAMS.camera.fov, this.viewWidth/this.viewHeight, VIEW_DEFAULT_PARAMS.camera.near, VIEW_DEFAULT_PARAMS.camera.far);
    this.camera.position.set(3, 10, 40);
    this.camera.up.set(0,1,0);
    //this.camera.lookAt(new THREE.Vector3(0, 6, 0));
    this.scene.add(this.camera);

    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    this.controls.target.set(5,8,0);
  }

  fitCamera(mesh){
    const viewObjectRatio = 1.6;

    var modelBox,modelHeight,modelWidth,modelPos;
    if(mesh != null){
      modelBox = new THREE.Box3().setFromObject(mesh);
      modelHeight = modelBox.max.y - modelBox.min.y;
      modelWidth = modelBox.max.x - modelBox.min.x;
      modelPos = modelBox.getCenter();
    }

    var dist = modelHeight * viewObjectRatio/ (2 * Math.tan(VIEW_DEFAULT_PARAMS.camera.fov/2 * Math.PI/180));
    this.camera.position.set(modelPos.x, modelPos.y + 5, modelPos.z + dist);
    this.controls.target.set(modelPos.x, modelPos.y, modelPos.z);
  }

  //step_size is the size of each grid_size
  //size_x, size_z decide plane size in x and z direction
  drawPlane(step_size, size_x, size_z){
    if(this.groundPlane != null){
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
    this.groundPlane = gridPlane;
  }

  removePlane(){
      if(this.groundPlane == null){
          return;
      }

      var object = this.scene.getObjectById(this.groundPlane.id);
      if(object != null){
          this.scene.remove(object);
          this.groundPlane = null;
      }
  }

  drawAxes(size){
    if(this.axes != null){
        return;
    }

      var axisHelper = new THREE.AxisHelper(size);
      axisHelper.name = objectNames.coordAxes;
      this.scene.add(axisHelper);
      this.axes = axisHelper;
  }

  removeAxes(){
    if(this.axes == null){
        return;
    }

    var object = this.scene.getObjectById(this.axes.id);

      if(object != null){
          this.scene.remove(object);
          this.axes = null
      }
  }

}

export default View3D;
