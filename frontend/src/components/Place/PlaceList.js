import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LOAD_PLACES_REQUEST } from '../../reducers/place';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

import Place from './Place';

import Loader from 'react-loader-spinner';

import './Place.scss';

const PlaceList = () => {
  const dispatch = useDispatch();

  const { places, loadPlaceLoading } = useSelector((state) => state.place);

  useEffect(() => {
    dispatch({
      type: LOAD_PLACES_REQUEST,
    });
  }, []);

  useEffect(() => {
    console.log(window.innerWidth);
  }, [window.innerWidth]);


  return (
    <div className="placesContainer">
      {loadPlaceLoading ? (
        <Loader
          className="place-loading"
          type="TailSpin"
          color="#9D9D9D"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        places.map((place) => <Place place={place} key={place.id} />)
      )}
    </div>
  );
};

export default PlaceList;
