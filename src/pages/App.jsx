import React from 'react';
import Nav from '../components/Nav.jsx';
import Model3D from '../components/Model3D.jsx';
import Panel from '../components/Panel.jsx';


class App extends React.Component {
   render() {
      return (
         <div>
            <Nav/>
            <Model3D/>
            <Panel/>
         </div>
      );
   }
}

export default App;
