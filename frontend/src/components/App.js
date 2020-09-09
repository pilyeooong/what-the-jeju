import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../global-styles/main.scss';


import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Place from '../pages/Place';

function App() {
  return (
    <Router>
      <Switch>
        <>
          <Route exact path="/" component={Home} />
          <Route path="/place" component={Place} />
          <Route path="/auth" component={Auth} />
          <footer>&copy;.2020 reactstagram.pilyeooong</footer>
        </>
      </Switch>
    </Router>
  );
}

export default App;
