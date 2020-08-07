import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { GEOCODE_PLACE_REQUEST } from '../../reducers/place';

const Style = {
  width: '100%',
  height: '400px',
};

const NaverMaps = () => {
  const dispatch = useDispatch();
  const { origin, destination } = useSelector((state) => state.place);

  const [currentMap, setCurrentMap] = useState(null);

  const [startPoint, setStartPoint] = useState('이당로 105');
  const [endPoint, setEndPoint] = useState('이당로 110');

  const onChangeStartPoint = (e) => {
    setStartPoint(e.target.value);
  };

  const onChangeEndPoint = (e) => {
    setEndPoint(e.target.value);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NAVER_MAP_CLIENT}&submodules=geocoder`;
    document.head.appendChild(script);

    script.onload = () => {
      const { naver } = window;
      let mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 15,
      };
      const map = new naver.maps.Map('map', mapOptions);
      const jeju = new naver.maps.LatLng(33.3590628, 126.534361);
      const center = new naver.maps.LatLng(37.3595704, 127.105399);
      map.setCenter(center);
      setCurrentMap(map);
    };
  }, []);

  useEffect(() => {
    if (currentMap) {
      const findPlace = new naver.maps.LatLng(
        parseFloat(origin.lat),
        parseFloat(origin.lng)
      );
      new naver.maps.Marker({
        position: new naver.maps.LatLng(
          parseFloat(origin.lat),
          parseFloat(origin.lng)
        ),
        map: currentMap,
      });
      currentMap.panTo(findPlace);
    }
  }, [origin.lat, origin.lng]);

  useEffect(() => {
    if (currentMap) {
      const findPlace = new naver.maps.LatLng(
        parseFloat(destination.lat),
        parseFloat(destination.lng)
      );
      new naver.maps.Marker({
        position: new naver.maps.LatLng(
          parseFloat(destination.lat),
          parseFloat(destination.lng)
        ),
        map: currentMap,
      });
      currentMap.panTo(findPlace);
    }
  }, [destination.lat, destination.lng]);

  const onSubmitPlace = (place) => (e) => {
    e.preventDefault();
    const type = e.target.id;
    dispatch({
      type: GEOCODE_PLACE_REQUEST,
      data: {
        type,
        place,
      },
    });
  };

  const onSubmitDirection = async (e) => {
    e.preventDefault();
    const data = {
      origin,
      destination,
    };
    const result = await axios.post(
      'http://localhost:4000/api/place/directions',
      { data }
    );
    // new naver.maps.Polyline({
    //   path: result.data.route.traoptimal[0].path,
    //   strokeColor: '#00CA00',
    //   strokeOpacity: 0.8,
    //   strokeWeight: 6,
    //   zIndex: 2,
    //   clickable: true,
    //   map: currentMap,
    // });
    console.log(result);
  };

  return (
    <>
      <form action="" id="origin" onSubmit={onSubmitPlace(startPoint)}>
        <input
          type="text"
          value={startPoint}
          onChange={onChangeStartPoint}
        />
        <button type="submit">출발지 찾기</button>
      </form>
      <form action="" id="destination" onSubmit={onSubmitPlace(endPoint)}>
        <input type="text" value={endPoint} onChange={onChangeEndPoint} />
        <button type="submit">목적지 찾기</button>
      </form>
      <button onClick={onSubmitDirection}>길 찾기</button>
      <div id="map" style={Style}></div>;
    </>
  );
};

export default NaverMaps;
