import React from 'react';
import Nav from '../components/Nav.jsx';
import Model3D from '../components/Model3D.jsx';
import Panel from '../components/Panel.jsx';
import Tabs from '../components/Tabs.jsx';
import FaceReconstructionPanel from '../components/FaceReconstructionPanel.jsx';

// <Model3D/>

var mockData = {
  tabItems : [{
    text: 'Front View',
    val: 'Front View'
  },{
    text: 'Left View',
    val: 'Left View'
  },{
    text: 'Right View',
    val: 'Right View'
  }]
};

class FaceReconstruction extends React.Component {
  constructor(props){
    super(props);
    
  }
  render() {
    return (
      <div>
        面部重构页面
        <Panel content={
          <Tabs tabsContentPanel={FaceReconstructionPanel} tabItems={mockData.tabItems}/>
        }/>
      </div>
    );
  }
}

export default FaceReconstruction;
