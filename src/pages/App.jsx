import React from 'react';
import Nav from '../components/Nav.jsx';

class App extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <div className='main-wrap'>
        <header className='main-header'>
          <Nav/>
        </header>
        <div className='main-content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
