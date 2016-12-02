import React from 'react';

class Model3D extends React.Component {
  
  constructor(props){
    super(props);
    
    
    this.state = {
      camera : null, 
      scene : null, 
      renderer : null,
      mouseX : 0, 
      mouseY : 0,
      windowHalfX : 0,
      windowHalfY : 0,
      
    }    
  }
  
  /* getDefaultProps() {
    console.log('getDefaultPropsgetDefaultPropsgetDefaultPropsgetDefaultPropsgetDefaultProps');
  }*/
  
  componentDidMount(){
    this.setState({
      windowHalfX : window.innerWidth / 2,
      windowHalfY : window.innerHeight / 2
    });
    this.initModel();
    this.forceUpdate(()=>{
      this.animate();
    });
    
    console.dir(this.props);
    
  }
  
  initModel(){
    
    let camera, scene, renderer;
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = this.props.z;
    
    // scene
    
    scene = new THREE.Scene();
    
    var ambient = new THREE.AmbientLight(this.props.ambientLight );
    scene.add( ambient );
    
    var directionalLight = new THREE.DirectionalLight( this.props.directionalLight );
    directionalLight.position.set( 0, 0, 1 ).normalize();
    scene.add( directionalLight );
    
    // model
    
    this.loadModel(scene);
    
    
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    this.refs.viewContainer.appendChild( renderer.domElement );
    
    
    //document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update();
    
    this.setState({
      camera, scene, renderer
    });
    
    window.addEventListener( 'resize', ()=>{this._onWindowResize()}, false );
    
  }
  
  _onWindowResize() {

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    this.state.camera.aspect = window.innerWidth / window.innerHeight;
    this.state.camera.updateProjectionMatrix();

    this.state.renderer.setSize( window.innerWidth, window.innerHeight );

  }
  
  onLoadProgress( xhr ) {
    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };
  
  loadModel(scene){
    var onError = function ( xhr ) { };
    
    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( this.props.path.mtl );
    mtlLoader.load( this.props.fileName.mtl, ( materials )=> {
    
      materials.preload();
    
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials( materials );
      objLoader.setPath( this.props.path.obj );
      objLoader.load( this.props.fileName.obj, ( object )=> {
        
        let modelInitOffset = this.props.modelInitOffset;
        modelInitOffset.x&&(object.position.x = modelInitOffset.x);
        modelInitOffset.y&&(object.position.y = modelInitOffset.y);
        modelInitOffset.z&&(object.position.z = modelInitOffset.z);
        scene.add( object );
    
      }, this.onLoadProgress.bind(this), onError );
    
    });
  }
  
  animate() {
    requestAnimationFrame(()=>{
      this.animate();
    });
    this.render3DView();
  }
 
 render3DView() {
    //helper.animate( clock.getDelta() );
    //if ( physicsHelper !== undefined && physicsHelper.visible ) physicsHelper.update();
    //if ( ikHelper !== undefined && ikHelper.visible ) ikHelper.update();
    this.state.renderer.render( this.state.scene, this.state.camera );

  }
  
  render() {
      return (
         <div ref='viewContainer'>
            
         </div>
      );
  }
}

Model3D.defaultProps  = {
  ambientLight : 0x444444,
  directionalLight : 0xffeedd,
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
  }
};

export default Model3D;


