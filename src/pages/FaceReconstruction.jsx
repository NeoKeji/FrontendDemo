import React from 'react';
import Nav from '../components/Nav.jsx';
import View3D from '../components/View3D.jsx';
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
        <img src='../src/assets/images/facereconstructionpage/3d_view_u348.PNG' style={{width:'20%',marginTop:'8%',marginLeft:'30%'}}/>
        <Panel content={
          <Tabs tabsContentPanel={FaceReconstructionPanel} tabItems={mockData.tabItems}/>
        } clazz='faceCtrlPanel'/>
      </div>
    );
  }
}

export default FaceReconstruction;
