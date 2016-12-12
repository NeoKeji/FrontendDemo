import React from 'react';
import Nav from '../components/Nav.jsx';
import View3D from '../components/View3D.jsx';
import Panel from '../components/Panel.jsx';
import Tabs from '../components/Tabs.jsx';

//

class App extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <div>
        <Nav/>
        <Panel content={Tabs}/>
        <View3D/>
      </div>
    );
  }
}

export default App;
