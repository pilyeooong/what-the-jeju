import React from 'react'
import { Route, Switch } from 'react-router-dom';
import PlaceDetail from './PlaceDetail';

const PlaceRouter = ({ match }) => {
  return (
    <>
      <Switch>
        <Route exact path={match.url + '/:placeId'} component={PlaceDetail} />
      </Switch>
    </>
  )
}

export default PlaceRouter
