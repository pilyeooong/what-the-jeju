import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LOAD_PLACES_REQUEST } from '../../reducers/place';

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
      ) : places.length === 0 ? (
        <div className="placeNotExist">아직 등록된 장소가 없습니다 ㅠㅠ</div>
      ) : (
        places.map((place) => <Place place={place} key={place.id} />)
      )}
    </div>
  );
};

export default PlaceList;
