import React from 'react';
import Nav from '../components/Nav.jsx';
import View3D from '../components/View3D.jsx';
import Panel from '../components/Panel.jsx';
import Tabs from '../components/Tabs.jsx';
import TabsContentPanel from '../components/TabsContentPanel.jsx';


class App extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <div>
        <View3D/>
        <Panel content={
          <Tabs tabsContentPanel={TabsContentPanel}/>
        }/>
      </div>
    );
  }
}

export default App;
