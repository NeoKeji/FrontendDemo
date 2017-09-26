import React from 'react';
import Model3D from '../js/Model3d.js'
import HumanModel3D from '../js/HumanModel3D.js'
import SceneLightModel from '../js/SceneLightModel.js'
import Panel from './panel.jsx';
import Tabs from './Tabs.jsx';
import TabsContentPanel from './TabsContentPanel.jsx';
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
};

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
        this.viewSide = 1;
        this.currentLightType = 1;
        this.sceneLightModel = null;
        this.model = null;

        this.effectControllerGUI = null;

        this.effectController = {
            showGround: true,
            showAxes:   false,
            viewSide: 1,
            lightType: 1
        };

        this.viewDOM = null;

        this.state = {
            showImage: false,
            imageUrl: "src/assets/images/bodygenerationpage/u649.png"
        };

        this.resizeFunc = this.resizeFunc.bind(this);
        this.onKeyUpFunc = this.onKeyUpFunc.bind(this);
        this.modelLoadDone = this.modelLoadDone.bind(this);
        this.handlePanelItemSelection = this.handlePanelItemSelection.bind(this);
    }

  // Brief:
  // Show View3D node or static demo image node
  // If this.state.showImage is true, show demo image, otherwise Render View3D
    render() {
        return (
            <div>
               <div className="view3d" ref={(dom) => {this.viewDOM = dom}} style={{display: !this.state.showImage?'block':'None'}}>
               </div>
               <div className="demo-image" style={{display: this.state.showImage?'block':'None'}}>
                  <img src={this.state.imageUrl} style={{width:'70%',marginTop:'5%', marginBottom:'2%', marginLeft:'2%', marginRight: '20%'}}/>
               </div>
               <Panel content={<Tabs tabsContentPanel={TabsContentPanel} view3dItemSelHandler={this.handlePanelItemSelection}/>}/>
            </div>
        );
    }

    // Brief: Callback function to handle user's click event from Menu Panel
    // Params:
    // boolean View3dShowImage true to display demo image otherwise render View3D
    // string View3dImageUrl image url point to the image to display
    // obj SelItem user selected object
    handlePanelItemSelection(View3dShowImage, View3dImageUrl, SelItem){
        this.updateDress(SelItem);
        if(SelItem == null || SelItem.itemData.modelUrl == ""){
            this.setState({
            showImage: View3dShowImage,
            imageUrl: View3dImageUrl
            });
        }
    }

    //Brief: update dress
    updateDress(SelItem){
        if(SelItem == null || SelItem.itemData.modelUrl == ""){
            return;
        }

        var rootPath = "Resources/Models/";
        var objPath = rootPath + SelItem.itemData.modelUrl;
        var mtlPath = rootPath + SelItem.itemData.mtlUrl;
        this.model.loadModelByCategory(objPath, mtlPath, null, SelItem.itemData.category);
    }

    // Brief: Called after render node is created
    componentDidMount(){
        this.setupEffectController();
        this.initView();
        this.display();
    }

    // Brief: THings to do before View3D unmount
    componentWillUnmount(){
        this.effectControllerGUI.destroy();
    }

    // Brief: initialize View3D controls GUI
    // this control gui use dat.GUI library
    setupEffectController(){
        this.effectControllerGUI = new dat.GUI({
            height:28*2 - 1
        });

        this.effectControllerGUI.domElement.id = 'effect-controller';

        this.effectControllerGUI.add(this.effectController, 'showGround').name("Show Ground Plane");
        this.effectControllerGUI.add(this.effectController, 'showAxes').name("Show Axes");
        this.effectControllerGUI.add(this.effectController,'viewSide', { front:1, back: 2, left: 3,right:4 }).name("View Side");
        this.effectControllerGUI.add(this.effectController, 'lightType',{ default:1, spotlight:2, outdoorLight:3}).name("Light Type");
    }

    // Brief: initialize View3D
    initView(){
        // this.scene = new THREE.Scene();

        this.createRenderer(this.viewWidth, this.viewHeight, VIEW_DEFAULT_PARAMS.useWebglRender);
        this.addCamera();
        this.addLighting();

        var objPath = VIEW_DEFAULT_PARAMS.path.obj + VIEW_DEFAULT_PARAMS.fileName.obj;
        var mtlPath = VIEW_DEFAULT_PARAMS.path.mtl + VIEW_DEFAULT_PARAMS.fileName.mtl;
        this.model = new HumanModel3D(this.scene, this.modelLoadDone);
        this.model.loadBodyModel('KB_Model');


        //this.model = new Model3D(this.scene, this.modelLoadDone);

        //this.model.loadObjModelWithMtl(VIEW_DEFAULT_PARAMS.path.obj + VIEW_DEFAULT_PARAMS.fileName.obj, VIEW_DEFAULT_PARAMS.path.mtl+VIEW_DEFAULT_PARAMS.fileName.mtl);
        //this.model.loadObjModelWithMtl("Resources/Models/Female/AngelababyWithSubDiv.obj", "Resources/Models/Female/AngelababyWithSubDiv.mtl");
        //this.model.loadObjModelWithMtl("Resources/Models/Accessories/hair/hair_long.obj", "Resources/Models/Accessories/hair/hair_long.mtl");
        //this.model.loadObjModelWithMtl("Resources/Models/Accessories/hair/hair_short.obj", "Resources/Models/Accessories/hair/hair_short.mtl");
        //this.model.loadObjModelWithMtl("Resources/Models/KobeFace/KobeFace.obj", "Resources/Models/KobeFace/KobeFace.mtl");
        //this.model.loadObjModelWithMtl("Resources/Models/AngelaBaby/AngelababyFace.obj", "Resources/Models/AngelaBaby/AngelababyFace.mtl");
        //this.model.loadObjModelWithMtl("Resources/Models/Accessories/glasses/glasses_men.obj", "");
        //this.model.loadObjModelWithMtl("Resources/Models/Accessories/glasses/glass_women.obj", "");
        //this.model.loadObjModelWithMtl("Resources/Models/Clothes/LakersJersey/LakerJersey.obj", "Resources/Models/Clothes/LakersJersey/LakerJersey.mtl");
        //this.model.loadObjModelWithMtl("Resources/Models/Clothes/LakersShorts/LakerShorts.obj", "Resources/Models/Clothes/LakersShorts/LakerShorts.mtl");

        if(this.effectController.showGround)
            this.drawPlane(1,12,12)
        if(this.effectController.showAxes)
            this.drawAxes(15);

        window.addEventListener( 'resize', this.resizeFunc );
        window.addEventListener( 'keyup', this.onKeyUpFunc, true );

    }

    //Brief: This function is called automatically after model load finish
    modelLoadDone(model){
        this.fitCamera(model);
    }

    // Brief: Add a basic triangle geometry for test purpose
    // Params:
    // THREE.Scene scene, the scene where the geometry will be addded
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


    // Brief: Function to render View3D
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

        if(this.viewSide!=this.effectController.viewSide)
        {
            this.setLookDirection(this.effectController.viewSide);
            this.viewSide = this.effectController.viewSide;
        }

        if(this.currentLightType!=Number(this.effectController.lightType)){
            var lightTypeNumber = Number(this.effectController.lightType);
            this.sceneLightModel.setSceneLight(lightTypeNumber);
            this.currentLightType = this.effectController.lightType;
        }

        if(this.sceneLightModel != null){
            this.sceneLightModel.updateLightPosition(this.camera.position);
        }

        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }

    // Brief: Function called when the explorer window size changes
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

    // Brief: Functions to handle keyup event from user
    onKeyUpFunc(event){
        console.log("Key " + event.key + " is pressed")
        switch( event.key ){
            case 'c': // 'C'
                if(event.ctrlKey){ //Press ctrl + c to change model
                    this.model.loadNextBodyModel();
                }
            break;
        }
    }

    // Brief: Initialize renderer
    // Params:
    // int width, height, the width and height of renderer
    // Boolean useWebgl, the option for use WebglRenderer or CanvasRenderer
    createRenderer(width, height, useWebgl){

        if(useWebgl == true)
            this.renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
        else
            this.renderer = new THREE.CanvasRenderer();

        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(VIEW_DEFAULT_PARAMS.clearColor);
        //document.body.appendChild(this.renderer.domElement);
        this.viewDOM.appendChild( this.renderer.domElement );
    }

    // Brief: Function to add light to the scene
    addLighting() {

        this.sceneLightModel = new SceneLightModel(this.scene,VIEW_DEFAULT_PARAMS.ambientLight.color, VIEW_DEFAULT_PARAMS.ambientLight.intensity);
        this.sceneLightModel.setSceneLight(1);
    }

    // Brief: Function to add camera to the scene
    addCamera(){
        this.camera = new THREE.PerspectiveCamera(VIEW_DEFAULT_PARAMS.camera.fov, this.viewWidth/this.viewHeight, VIEW_DEFAULT_PARAMS.camera.near, VIEW_DEFAULT_PARAMS.camera.far);
        this.camera.position.set(3, 10, 40);
        this.camera.up.set(0,1,0);
        //this.camera.lookAt(new THREE.Vector3(0, 6, 0));
        this.scene.add(this.camera);

        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        this.controls.target.set(5,8,0);
    }

    // Brief: Automatically fit camera's position and orientation based on model's size and position
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

    // Brief: Draw and add a virtual ground plane to the scene
    // Params:
    // int step_size is the size of each grid_size
    // int size_x, size_z decide plane size in x and z direction
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

    // Brief: Remove the virtual ground plane from the scene
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

    // Brief: Draw virtual Axes Triad to the scene
    // Params:
    // int size, the size of each of the tree axes
    drawAxes(size){
        if(this.axes != null){
            return;
        }

        var axisHelper = new THREE.AxisHelper(size);
        axisHelper.name = objectNames.coordAxes;
        this.scene.add(axisHelper);
        this.axes = axisHelper;
    }

    // Brief: Remove the virtual axes traid from the scene
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

    setLookDirection(vSide)
    {
      switch(vSide)
      {
        case "1":
         this.camera.position.set(3, 10, 40);
         this.controls.target.set(5,8,0);
         break;
        case "2":
         this.camera.position.set(3, 10, -40);
         this.controls.target.set(-5,8,0);
         break;
        case "3":
         this.camera.position.set(40, 10, 0);
         this.controls.target.set(0,8,-5);
         break;
        case "4":
         this.camera.position.set(-40, 10, 0);
         this.controls.target.set(0,8,5);
         break;
        default:
         this.camera.position.set(3, 10, 40);
         this.controls.target.set(5,8,0);
      }
    }

}

export default View3D;
