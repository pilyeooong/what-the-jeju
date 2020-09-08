import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import './Place.scss';

import Place from './Place';

import { LOAD_PLACES_REQUEST } from '../../reducers/place';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

const PlaceList = () => {
  const dispatch = useDispatch();

  const { places } = useSelector(state => state.place);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    })
  })

  useEffect(() => {
    dispatch({
      type: LOAD_PLACES_REQUEST,
    })   
  }, []);

  console.log(places);

  return (
    <div className="placesContainer">
      {places && places.map(place => <Place place={place} key={place.id} />)}
    </div>
  )
}

export default PlaceList;
