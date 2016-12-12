import React from 'react';
import Nav from '../components/Nav.jsx';
import Model3D from '../components/Model3D.jsx';
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
        <Panel content={
          <BodyGenerationPanel/>
        }/>
      </div>
    );
  }
}

export default BodyGeneration;
