//light class to simulate different scene
class SceneLightModel{
    constructor(scene, lightColor, lightIntensity){
        this.scene = scene !== undefined ? scene : new THREE.Scene();
        this.pointLight = null;
        this.directionalLight = null;
        this.ambientLight = null;
        this.spotLight = null;
        this.hemiSphereLight = null;
        this.defaultLightColor = lightColor !== undefined ? lightColor : 0xffffff;
        this.defaultLightIntensity = lightIntensity !== undefined ? lightIntensity : 1;

        this.basicLightExist = false;
        this.currentMainLight = null;
    }

    // Brief: 1,default light; 2, spotLight; 3,outdoorLight;
    setSceneLight(lightType){
        if(!this.basicLightExist){
            this.configBasciLight();
            this.basicLightExist = true;
        }
        if(this.currentMainLight!=null){
            this.currentMainLight.visible = false;
        }

        switch(lightType){
            case 1:
                this.configDefaultLight();
                break;
            case 2:
                this.configSpotLight();
                break;
            case 3:
                this.configOutdoorLight();
                break;
            default:
                this.configDefaultLight();            
                break;
        }

    }

    updateLightPosition(newPosition){

        if(this.currentMainLight == this.pointLight){
            this.currentMainLight.position.set(newPosition.x, newPosition.y, newPosition.z );
        }
        else if(this.currentMainLight == this.hemiSphereLight){
            this.currentMainLight.position.set(newPosition.x, newPosition.y, -1000 );
        }

    }

    //Brief: defualt light on
    configDefaultLight(){
        if(this.pointLight != null){
            this.pointLight.visible = true;
        }
        else{
            this.pointLight = new THREE.PointLight(this.defaultLightColor, this.defaultLightIntensity );
            this.scene.add(this.pointLight);
        }
        this.currentMainLight = this.pointLight;
    }

    //Brief: spot light on
    configSpotLight(){

        if(this.spotLight != null){
            this.spotLight.visible = true;
        }
        else{
            this.spotLight = new THREE.SpotLight( this.defaultLightColor, this.defaultLightIntensity );
            this.spotLight.position.set(-16,36,12 );
            this.spotLight.castShadow=true;
            this.spotLight.angle = Math.PI /6;
            this.scene.add(this.spotLight);
        }
        this.currentMainLight = this.spotLight;
        
        // if(this.spotLightHelper == null){
        //     let lightHelper = new THREE.SpotLightHelper(  this.headLight );
        //     this.spotLightHelper = lightHelper;
        // }
        // this.scene.add(this.spotLightHelper);

        // if(this.spotLightShadowMesh == null){
        //     var material = new THREE.MeshPhongMaterial( { color: 0x808080, dithering: true } );
        //     var geometry = new THREE.BoxGeometry( 2000, 1, 2000 );
        //     var mesh = new THREE.Mesh( geometry, material );
        //     mesh.position.set( 0, - 1, 0 );
        //     mesh.receiveShadow = true;
        //     this.spotLightShadowMesh = mesh;
        // }
        // this.scene.add(this.spotLightShadowMesh);
    }

    //Brief: out door light on
    configOutdoorLight(){
        if(this.hemiSphereLight != null){
            this.hemiSphereLight.visible = true;
        }
        else{
 
            this.hemiSphereLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
            //sphLight.color.setHSL( 0.6, 1, 0.6 );
            //sphLight.groundColor.setHSL( 0.095, 1, 0.75 );
            this.hemiSphereLight.position.set( 0,0, 500 );
            this.scene.add( this.hemiSphereLight);
        }
        this.currentMainLight = this.hemiSphereLight;
    }

    configBasciLight(){
        this.ambientLight = new THREE.AmbientLight( this.defaultLightColor, this.defaultLightIntensity );
        this.scene.add( this.ambientLight );
        this.directionalLight = new THREE.DirectionalLight( this.defaultLightColor,  this.defaultLightIntensity );
        this.directionalLight.position.set( 0, 0, 1000 );
        this.scene.add( this.directionalLight );
    }

}

export default SceneLightModel;