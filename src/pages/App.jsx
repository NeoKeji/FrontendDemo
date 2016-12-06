import React from 'react';
import Nav from '../components/Nav.jsx';
import Model3D from '../components/Model3D.jsx';
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
         <Model3D/>
        <Panel content={Tabs}/>
      </div>
    );
  }
}

export default App;
