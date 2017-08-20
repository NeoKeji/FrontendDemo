import React from 'react';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';
import ReactDOM from 'react-dom';

//import App from '../components/App.jsx';
import App from '../pages/App.jsx';
import Display from '../pages/Display.jsx';
import FaceReconstruction from '../pages/FaceReconstruction.jsx';
import BodyGeneration from '../pages/BodyGeneration.jsx';
import LoginPage from '../pages/LoginPage.jsx';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Display}/>
      <Route path="/face" component={FaceReconstruction}/>
      <Route path="/body" component={BodyGeneration}/>
      <Route path="/login" component={LoginPage}/>
    </Route>
  </Router>
), document.getElementById('app'))
