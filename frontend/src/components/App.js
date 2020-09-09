import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../global-styles/main.scss';

import AppLayout from './AppLayout/AppLayout';
import PlaceList from './Place/PlaceList';
import PlaceDetail from './Place/PlaceDetail';

function App() {
  return (
    <Router>
      <Switch>
        <>
          <AppLayout>
            <Route exact path="/" component={PlaceList} />
            <Route exact path="/:placeId" component={PlaceDetail} />
          </AppLayout>
          <footer>&copy;.2020 reactstagram.pilyeooong</footer>
        </>
      </Switch>
    </Router>
  );
}

export default App;
