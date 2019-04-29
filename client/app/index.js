import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';
import HomeContainer from './Containers/HomeContainer/HomeContainer'
import RequestPublishContainer from './Containers/RequestPublishContainer/RequestPublishContainer'


import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={HomeContainer}/>
        {/* <Route path="/helloworld" component={HelloWorld}/> */}
        {/* <Route component={NotFound}/> */}
        {/* <Route exact path="/getAsset" component={getAssetContainer}/> */}
        <Route exact path="/requestPublish" component={RequestPublishContainer}/>

      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
