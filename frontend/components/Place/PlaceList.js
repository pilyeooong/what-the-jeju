import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import styles from './Place.module.scss';

import Place from './Place';
import { LOAD_PLACES_REQUEST } from '../../reducers/place';

const PlaceList = () => {
  const dispatch = useDispatch();

  const { places } = useSelector(state => state.place);

  useEffect(() => {
    dispatch({
      type: LOAD_PLACES_REQUEST,
    })   
  }, []);

  console.log(places);

  return (
    <div className={styles.placesContainer}>
      {places.map(place => <Place place={place} key={place.id} />)}
    </div>
  )
}

export default PlaceList;
