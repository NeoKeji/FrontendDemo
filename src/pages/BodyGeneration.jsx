import React from 'react';
import Nav from '../components/Nav.jsx';
import View3D from '../components/View3D.jsx';
import Panel from '../components/Panel.jsx';
import BodyGenerationPanel from '../components/BodyGenerationPanel.jsx';

// <Model3D/>

class BodyGeneration extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <div>
        <img src='../src/assets/images/bodygenerationpage/u649.png' style={{width:'20%',marginTop:'8%',marginLeft:'20%'}}/>
        <Panel content={
          <BodyGenerationPanel/>
        } clazz='bodyGenerationPanel'/>
      </div>
    );
  }
}

export default BodyGeneration;
