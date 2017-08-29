import React from 'react';
import Nav from '../components/Nav.jsx';

class LoginPage extends React.Component{
    constructor(props, context){
        super(props, context);

        this.objInput = null;
        this.mtlInput = null;

        this.model = {
            objFile: null,
            mtlFile: null
        }

        this.inputObjPath = this.inputObjPath.bind(this);
        this.inputMtlPath = this.inputMtlPath.bind(this);
        this.selectModel = this.selectModel.bind(this);
    }

    getFileUrl(source) {
        var url;

        //if user cancel image selection
        if(!source.value) return null;


        if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
            url = source.value;
        } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
            url = window.URL.createObjectURL(source.files.item(0));
        } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
            url = window.URL.createObjectURL(source.files.item(0));
        }
        return url;
    }

    inputObjPath(){
        this.model.objFile = this.getFileUrl(this.objInput);
        console.log(this.model);
    }

    inputMtlPath(){
        this.model.mtlFile = this.getFileUrl(this.mtlInput);
        console.log(this.model);
    }

    selectModel(event){
        this.context.router.push('/');
    }

    render(){
        return(
            <div>
                <h2 style={{marginTop:'8%',marginLeft:'30%'}}>Model Selection</h2>
                <form onSubmit={this.selectModel} style={{marginLeft: '30%', marginTop: '5%'}}>
                    Model obj file: <br/>
                    <input type="file" size="40" ref={(component) => this.objInput = component} style={{display: 'block'}} onChange={this.inputObjPath}/><br/>
                    Texture mtl file <br/>
                    <input type="file" size="40" ref={(component) => this.mtlInput = component} style={{display: 'block'}} onChange={this.inputMtlPath}/><br/>
                    <br/>
                    <button type='submit'>选择模型</button>
                </form>
            </div>
        );
    }
}

LoginPage.contextTypes = {
    router: React.PropTypes.object
}

export default LoginPage;
