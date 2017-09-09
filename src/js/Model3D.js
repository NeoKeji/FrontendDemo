//class of 3d model
class Model3D{
    constructor(scene, loadDone){
        this.scene = scene !== undefined ? scene : new THREE.Scene();
        this.modelLoadDone = loadDone !== undefined ? loadDone: (mesh) => {};
        this.mesh = null;
    }

    // Brief: load 3d model in JSON format
    // Params:
    // string model, url to model file
    // string texture, url to texture image file
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

    // Brief: load 3d model in Obj format
    // Params:
    // string model, url to model file
    // string texture, url to texture image file
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

    // Brief: load 3d model in Obj format with texture configured in mtl file
    // Params:
    // string model, url to model file
    // string mtl, url to mtl file
    loadObjModelWithMtl(model, mtl){
        //THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load( mtl, ( materials ) => {

            materials.preload();
            materials.shading = THREE.SmoothShading;

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.load( model, ( object ) => {

                this.mesh = object;
                this.scene.add(object);

                this.modelLoadDone(this.mesh);

            }, this.onLoadProgress, this.onLoadError );

        });

    }

    // Brief: Called during the process of model loading, log loading progress
    onLoadProgress( xhr ){
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    }

    // Brief: Called if model loading fails
    onLoadError(xhr){
        alert("Load Model Error!");
    }
}

export default Model3D;
