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
}

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
                this.loadDressTopHalfModel(objPath, mtlPath, callBackFunc);
            }
            else{
                this.removeDressTopHalfModel();
            }
        }
        else if(category == this.categories.Pants){
            if(this.dressBelowHalfModel == null){
                if(this.curBodyModelName != 'KB_Model') {
                    this.loadBodyModel('KB_Model');
                    console.log('load KB_Model');
                }
                this.loadDressBelowHalfModel(objPath, mtlPath, callBackFunc);
            }
            else{
                this.removeDressBelowHalfModel();
            }
        }
        else if(category == this.categories.Dress){
            if(this.dressEnsembleModel == null){
                if(this.curBodyModelName != 'AB_Model') {
                    this.loadBodyModel('AB_Model');
                    console.log('load AB_Model');
                }
                this.loadDressEnsembleModel(objPath, mtlPath, callBackFunc);
            }
            else{
                this.removeDressEnsembleModel();
            }
        }
        else if(category == this.categories.Hair){
            if(this.hairModel == null){
                this.loadHairModel(objPath, mtlPath, callBackFunc);
            }
            else{
                this.removeHairModel();
            }
        }
        else if(category == this.categories.Glasses){
            if(this.glassModel == null){
                this.loadGlassModel(objPath, mtlPath, callBackFunc);
            }
            else{
                this.removeGlassModel();
            }
        }
        else if(category == this.categories.Hats){
            if(this.hatModel == null){
                this.loadHatModel(objPath, mtlPath, callBackFunc);
            }
            else{
                this.removeHatModel();
            }
        }
        else if(category == this.categories.Shoes){
            if(this.shoeModel == null){
                this.loadShoeModel(objPath, mtlPath, callBackFunc);
            }
            else{
                this.removeShoeModel();
            }
        }
    }

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
