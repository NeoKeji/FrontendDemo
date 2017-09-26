import Model3D from '../js/Model3d.js'

const BODY_MODEL_PARAMS = {
    KB_Model: {
        fileName:{
            obj:'KBWithSubDiv.obj',
            mtl:'KBWithSubDiv.mtl'
        },
        path:{
            obj:'Resources/Models/Male/',
            mtl:'Resources/Models/Male/'
        }
    },
    AB_Model: {
        fileName:{
            obj:'AngelababyWithSubDiv.obj',
            mtl:'AngelababyWithSubDiv.mtl'
        },
        path:{
            obj:'Resources/Models/Female/',
            mtl:'Resources/Models/Female/'
        }
    },
    KB_Face: {
        fileName:{
            obj:'KobeFace.obj',
            mtl:'KobeFace.mtl'
        },
        path:{
            obj:'Resources/Models/KobeFace/',
            mtl:'Resources/Models/KobeFace/'
        }
    },
    AB_Face: {
        fileName:{
            obj:'AngelababyFace.obj',
            mtl:'AngelababyFace.mtl'
        },
        path:{
            obj:'Resources/Models/AngelaBaby/',
            mtl:'Resources/Models/AngelaBaby/'
        }
    },
};

class HumanModel3D{
    constructor(scene, modelLoadDoneFun){
        this.scene = scene !== undefined ? scene : new THREE.Scene();
        this.curBodyModelName = '';
        this.bodyModel = null;
        this.dressTopHalfModel = null;
        this.dressBelowHalfModel = null;
        this.dressEnsembleModel = null;
        this.glassModel = null;
        this.hairModel = null;
        this.hatModel = null;
        this.shoeModel = null;
        this.currentObjPath = null;

        this.modelLoadDoneCallBack = modelLoadDoneFun;

        this.categories = {
            Tops:0,
            Pants:1,
            Dress:2,
            Hair:3,
            Glasses:4,
            Hats:5,
            Shoes:6
        }
    }

    loadModelByCategory(objPath, mtlPath, callBackFunc, category){
        if(category == this.categories.Tops){
            if(this.dressTopHalfModel == null){
                if(this.curBodyModelName != 'KB_Model') {
                    this.loadBodyModel('KB_Model');
                    console.log('load KB_Model');
                }
                //this.loadDressTopHalfModel(objPath, mtlPath, callBackFunc);
            }
            else{
                //this.removeDressTopHalfModel();
            }

            this.removeDressTopHalfModel();
            if(this.currentObjPath == objPath){
                this.currentObjPath = null;
            }
            else{
                this.loadDressTopHalfModel(objPath, mtlPath, callBackFunc);
                this.currentObjPath = objPath;
            }
        }
        else if(category == this.categories.Pants){
            if(this.dressBelowHalfModel == null){
                if(this.curBodyModelName != 'KB_Model') {
                    this.loadBodyModel('KB_Model');
                    console.log('load KB_Model');
                }
                //this.loadDressBelowHalfModel(objPath, mtlPath, callBackFunc);
            }
            else{
                //this.removeDressBelowHalfModel();
            }

            this.removeDressBelowHalfModel();
            if(this.currentObjPath == objPath){
                this.currentObjPath = null;
            }
            else{
                this.loadDressBelowHalfModel(objPath, mtlPath, callBackFunc);
                this.currentObjPath = objPath;
            }


        }
        else if(category == this.categories.Dress){
            if(this.dressEnsembleModel == null){
                if(this.curBodyModelName != 'AB_Model') {
                    this.loadBodyModel('AB_Model');
                    console.log('load AB_Model');
                }
                //this.loadDressEnsembleModel(objPath, mtlPath, callBackFunc);
            }
            else{
                //this.removeDressEnsembleModel();
            }

            this.removeDressEnsembleModel();
            if(this.currentObjPath == objPath){
                this.currentObjPath = null;
            }
            else{
                this.loadDressEnsembleModel(objPath, mtlPath, callBackFunc);
                this.currentObjPath = objPath;
            }

        }
        else if(category == this.categories.Hair){
            this.removeHairModel();
            if(this.currentObjPath == objPath){
                this.currentObjPath = null;
            }
            else{
                this.loadHairModel(objPath, mtlPath, callBackFunc);
                this.currentObjPath = objPath;
            }
        }
        else if(category == this.categories.Glasses){

            this.removeGlassModel();
            if(this.currentObjPath == objPath){
                this.currentObjPath = null;
            }
            else{
                this.loadGlassModel(objPath, mtlPath, callBackFunc);
                this.currentObjPath = objPath;
            }

        }
        else if(category == this.categories.Hats){

            this.removeHatModel();
            if(this.currentObjPath == objPath){
                this.currentObjPath = null;
            }
            else{
                this.loadHatModel(objPath, mtlPath, callBackFunc);
                this.currentObjPath = objPath;
            }
        }
        else if(category == this.categories.Shoes){

            this.removeShoeModel();
            if(this.currentObjPath == objPath){
                this.currentObjPath = null;
            }
            else{
                this.loadShoeModel(objPath, mtlPath, callBackFunc);
                this.currentObjPath = objPath;
            }
        }
    }

    //Brief: Load Neo 3d avatar based on model's name
    //Params:
    //string modelName: key name corresponding to the model to load
    loadBodyModel(modelName){
        var objPath = BODY_MODEL_PARAMS[modelName].path.obj + BODY_MODEL_PARAMS[modelName].fileName.obj;
        var mtlPath = BODY_MODEL_PARAMS[modelName].path.mtl + BODY_MODEL_PARAMS[modelName].fileName.mtl;
        if(this.bodyModel != null) {
            this.scene.remove(this.bodyModel.mesh);
            this.bodyModel = null;
        }
        this.bodyModel = new Model3D(this.scene, this.modelLoadDoneCallBack);
        this.bodyModel.loadObjModelWithMtl(objPath, mtlPath);
        this.curBodyModelName = modelName;
    }

    //Brief: get an array of all avatar model names and then find current avatar model index.
    //then load the next avatar model into the scene
    loadNextBodyModel(){
        var nextModelIndex = 0;
        var allModelNames = Object.keys(BODY_MODEL_PARAMS);
        var curModelIndex = allModelNames.findIndex( x => x == this.curBodyModelName );

        if(curModelIndex != -1){
            nextModelIndex = curModelIndex + 1;
            if( nextModelIndex >= allModelNames.length ) nextModelIndex = 0;
        }

        this.removeAllClothes();
        this.loadBodyModel(allModelNames[nextModelIndex]);
        console.log("Load avatar " + this.curBodyModelName);
    }

    //Brief: remove all the clothes in the scene, keep only the avatar body model
    removeAllClothes(){
        this.removeDressTopHalfModel();
        this.removeDressBelowHalfModel();
        this.removeDressEnsembleModel();
        this.removeHatModel();
        this.removeGlassModel();
        this.removeHairModel();
        this.removeShoeModel();
    }

    loadDressTopHalfModel(objPath, mtlPath, callBackFunc){
        this.removeDressEnsembleModel();
        this.dressTopHalfModel = new Model3D(this.scene, callBackFunc);
        this.dressTopHalfModel.loadObjModelWithMtl(objPath, mtlPath);
    }

    removeDressTopHalfModel(){
        if(this.dressTopHalfModel == null){
            return;
        }
        this.scene.remove(this.dressTopHalfModel.mesh);
        this.dressTopHalfModel = null;
    }

    loadDressBelowHalfModel(objPath, mtlPath, callBackFunc){
        this.removeDressEnsembleModel();
        this.dressBelowHalfModel = new Model3D(this.scene, callBackFunc);
        this.dressBelowHalfModel.loadObjModelWithMtl(objPath, mtlPath);
    }

    removeDressBelowHalfModel(){
        if(this.dressBelowHalfModel == null){
            return;
        }
        this.scene.remove(this.dressBelowHalfModel.mesh);
        this.dressBelowHalfModel = null;
    }

    loadDressEnsembleModel(objPath, mtlPath, callBackFunc){
        this.removeDressTopHalfModel();
        this.removeDressBelowHalfModel();
        this.dressEnsembleModel = new Model3D(this.scene, callBackFunc);
        this.dressEnsembleModel.loadObjModelWithMtl(objPath, mtlPath);
    }

    removeDressEnsembleModel(){
        if(this.dressEnsembleModel == null){
            return;
        }
        this.scene.remove(this.dressEnsembleModel.mesh);
        this.dressEnsembleModel = null;
    }

    loadGlassModel(objPath, mtlPath, callBackFunc){
        this.glassModel = new Model3D(this.scene, callBackFunc);
        this.glassModel.loadObjModel(objPath, mtlPath);
    }

    removeGlassModel(){
        if(this.glassModel == null){
            return;
        }
        this.scene.remove(this.glassModel.mesh);
        this.glassModel = null;
    }

    loadHairModel(objPath, mtlPath, callBackFunc){
        this.hairModel = new Model3D(this.scene, callBackFunc);
        this.hairModel.loadObjModelWithMtl(objPath, mtlPath);
    }
    removeHairModel(){
        if(this.hairModel == null){
            return;
        }
        this.scene.remove(this.hairModel.mesh);
        this.hairModel = null;
    }


    loadHatModel(objPath, mtlPath, callBackFunc){
        this.hatModel = new Model3D(this.scene, callBackFunc);
        this.hatModel.loadObjModel(objPath, mtlPath);
    }
    removeHatModel(){
        if(this.hatModel == null){
            return;
        }
        this.scene.remove(this.hatModel.mesh);
        this.hatModel = null;
    }

    loadShoeModel(objPath, mtlPath, callBackFunc){
        this.shoeModel = new Model3D(this.scene, callBackFunc);
        this.shoeModel.loadObjModel(objPath, mtlPath);
    }
    removeShoeModel(){
        if(this.shoeModel == null){
            return;
        }
        this.scene.remove(this.shoeModel.mesh);
        this.shoeModel = null;
    }

}

export default HumanModel3D;
