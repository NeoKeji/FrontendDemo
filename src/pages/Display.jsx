import React from 'react';
import Nav from '../components/Nav.jsx';
import View3D from '../components/View3D.jsx';


class Display extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <div>
        <View3D/>
      </div>
    );
  }
}

export default Display;
