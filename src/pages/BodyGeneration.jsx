import React from 'react';
import Nav from '../components/Nav.jsx';
import Model3D from '../components/Model3D.jsx';
import Panel from '../components/Panel.jsx';
import Tabs from '../components/Tabs.jsx';

// <Model3D/>

class BodyGeneration extends React.Component {
  constructor(props){
    super(props);
    
  }
  render() {
    return (
      <div>
        <Panel content={
          'hahahahahahaha 我是身体生成页面的panel'
        }/>
      </div>
    );
  }
}

export default BodyGeneration;
