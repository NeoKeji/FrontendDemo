import React from 'react';
import Nav from '../components/Nav.jsx';
import Model3D from '../components/Model3D.jsx';
import Panel from '../components/Panel.jsx';
import Tabs from '../components/Tabs.jsx';
import TabsContentPanel from '../components/TabsContentPanel.jsx';

// <Model3D/>

class App extends React.Component {
  constructor(props){
    super(props);
    
  }
  render() {
    return (
      <div>
        <Model3D/>
        <Panel content={
          <Tabs tabsContentPanel={TabsContentPanel}/>
        }/>
      </div>
    );
  }
}

export default App;
