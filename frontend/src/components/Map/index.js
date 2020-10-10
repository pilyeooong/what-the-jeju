import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GEOCODE_PLACE_REQUEST, SEARCH_DIRECTION_REQUEST } from '../../reducers/place';

const Style = {
  width: '100%',
  height: '400px',
};

const Map = ({ wayPoints }) => {
  const [searchedOrigin, setSearchedOrigin] = useState('');
  const [searchedDestination, setSearchedDestination] = useState('');

  const [currentMap, setCurrentMap] = useState(null);

  const destination = useSelector(state => state.place.destination);
  const origin = useSelector(state => state.place.origin);
  const directionPaths = useSelector(state => state.place.directionPaths);

  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT}&submodules=geocoder`;
    document.head.appendChild(script);

    script.onload = () => {
      const { naver } = window;
      let mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 15,
      };
      const map = new naver.maps.Map('map', mapOptions);
      const jeju = new naver.maps.LatLng(33.3590628, 126.534361);
      map.setCenter(jeju);
      setCurrentMap(map);
    };
  }, []);

  useEffect(() => {
    if (origin.lat && origin.lng) {
      const findPlace = new window.naver.maps.LatLng(
        origin.lat,
        origin.lng
      );
      currentMap.panTo(findPlace);
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(origin.lat, origin.lng),
        map: currentMap
      });
    }
  }, [origin.lat, origin.lng, currentMap]);

  useEffect(() => {
    if (destination.lat && destination.lng) {
      const findPlace = new window.naver.maps.LatLng(
        destination.lat,
        destination.lng
      );
      currentMap.panTo(findPlace);
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(destination.lat, destination.lng),
        map: currentMap
      });
    }
  }, [destination.lat, destination.lng]);

  useEffect(() => {
    if (directionPaths.length !== 0) {
      new window.naver.maps.Polyline({
        map: currentMap,
        path: directionPaths,
        strokeColor: 'red',
        strokeWeight: 3
      });
      wayPoints.forEach(wayPoint => new window.naver.maps.Marker({ position: new window.naver.maps.LatLng(wayPoint.lat, wayPoint.lng), map: currentMap }))
    }
  }, [wayPoints, currentMap, directionPaths]);

  const onSubmitPlace = useCallback((type) => (e) => {
    e.preventDefault();
    if(type === 'origin') {
      dispatch({
        type: GEOCODE_PLACE_REQUEST,
        data: {
          type: 'origin',
          place: searchedOrigin
        },
      });
    } else {
      dispatch({
        type: GEOCODE_PLACE_REQUEST,
        data: {
          type: 'destination',
          place: searchedDestination
        }
      })
    }
  }, [searchedOrigin, searchedDestination]);

  const onChangeOrigin = useCallback((e) => {
    setSearchedOrigin(e.target.value);
  }, []);

  const onChangeDestination = useCallback((e) => {
    setSearchedDestination(e.target.value);
  }, []);

  const onSearchDirection = useCallback(() => {
    if (wayPoints.length === 0) {
      alert('동선에 포함 시킬 핫플레이스를 추가해주세요');
      return;
    }
    console.log(wayPoints);
    dispatch({
      type: SEARCH_DIRECTION_REQUEST,
      data: {
        origin,
        destination,
        wayPoints,
      }
    })
  }, [origin, destination, wayPoints]);

  return (
    <>
      <div>
        <label htmlFor="">출발지</label>
        <input type="text" value={searchedOrigin} onChange={onChangeOrigin} />
        <button onClick={onSubmitPlace('origin')}>찾기</button>
      </div>
      <div>
        <label htmlFor="">목적지</label>
        <input type="text" value={searchedDestination} onChange={onChangeDestination} />
        <button onClick={onSubmitPlace('destination')}>찾기</button>
      </div>
      <div id="map" style={Style}></div>
      <button onClick={onSearchDirection}>동선 검색</button>
    </>
  );
};

export default Map;