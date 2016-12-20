//class of 3d model
class Model3D{
  constructor(scene){
    this.scene = scene !== undefined ? scene : new THREE.Scene();
    this.mesh = null;
  }


  loadJSONModel(model, texture){
    var self = this;
    var modelTexture = THREE.ImageUtils.loadTexture(texture);
    this.mesh = null;

    var loader = new THREE.JSONLoader();
    loader.load(model, function(geometry){
      var material = new THREE.MeshPhongMaterial( {map: modelTexture});
      var mesh = new THREE.Mesh(geometry, material);

      mesh.scale.set(1,1,1);

      self.mesh = mesh;
      self.scene.add(mesh);
    }, this.onLoadProgress, this.onLoadError);

  }

  loadObjModel(model, texture){
    var self = this;
    var modelTexture = THREE.ImageUtils.loadTexture(texture);

    var loader = new THREE.OBJLoader();
    loader.load( model, function(object) {
      object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material.map = modelTexture; //Here assumption is there is only one geometry in the obj file
				}
			} );

      object.scale.set(1,1,1);

      self.mesh = object;
      self.scene.add(object);
    }, this.onLoadProgress, this.onLoadError);

  }

  loadObjModelWithMtl(model, mtl){
    var self = this;
    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load( mtl, function ( materials ) {

      materials.preload();

      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials( materials );
      objLoader.load( model, function ( object ) {

        self.mesh = object;
        self.scene.add(object);
      }, this.onLoadProgress, this.onLoadError );

    });

  }

  onLoadProgress( xhr ){
    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  }

  onLoadError(xhr){
    alert("Load Model Error!");
  }
}

export default Model3D;
