import React from 'react'
import { Route, Switch } from 'react-router-dom';

import AddPlace from './AddPlace';
import PlaceDetail from './PlaceDetail';
import Direction from './Direction';

const PlaceRouter = ({ match }) => {
  return (
    <>
      <Switch>
        <Route exact path={match.url + '/add'} component={AddPlace} />
        <Route exact path={match.url + '/direction'} component={Direction} />
        <Route exact path={match.url + '/:placeId'} component={PlaceDetail} />
      </Switch>
    </>
  )
}

export default PlaceRouter
