//class of 3d model
class Model3D{
  constructor(scene, loadDone){
    this.scene = scene !== undefined ? scene : new THREE.Scene();
    this.modelLoadDone = loadDone !== undefined ? loadDone: (mesh) => {};
    this.mesh = null;
  }


  loadJSONModel(model, texture){
    var modelTexture = THREE.ImageUtils.loadTexture(texture);
    this.mesh = null;

    var loader = new THREE.JSONLoader();
    loader.load(model, geometry => {
      var material = new THREE.MeshPhongMaterial( {map: modelTexture});
      var mesh = new THREE.Mesh(geometry, material);

      mesh.scale.set(1,1,1);

      this.mesh = mesh;
      this.scene.add(mesh);
    }, this.onLoadProgress, this.onLoadError);

  }

  loadObjModel(model, texture){
    var modelTexture = THREE.ImageUtils.loadTexture(texture);

    var loader = new THREE.OBJLoader();
    loader.load( model, object => {
      object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material.map = modelTexture; //Here assumption is there is only one geometry in the obj file
				}
			} );

      object.scale.set(1,1,1);

      this.mesh = object;
      this.scene.add(object);

      this.modelLoadDone(this.mesh);

    }, this.onLoadProgress, this.onLoadError);

  }

  loadObjModelWithMtl(model, mtl){
    //THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load( mtl, ( materials ) => {

    materials.preload();
    materials.shading = THREE.SmoothShading;

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.load( model, ( object ) => {

      // var modifier = new THREE.BufferSubdivisionModifier( 3 );
      // object.traverse(function (child) {
      //   if(child instanceof THREE.Mesh){
      //     child.geometry.computeVertexNormals();
      //     child.geometry.computeFaceNormals();
      //     modifier.modify(child.geometry);
      //   }
      //  });

      this.mesh = object;
      this.scene.add(object);

      this.modelLoadDone(this.mesh);

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
