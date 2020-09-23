import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GEOCODE_PLACE_REQUEST } from '../../reducers/place';

const Style = {
  width: '100%',
  height: '400px',
};

const Map = () => {
  const [place, setPlace] = useState('태평로 549');
  const [currentMap, setCurrentMap] = useState(null);

  const dispatch = useDispatch();
  const { destination } = useSelector((state) => state.place);

  const onChangePlace = (e) => {
    setPlace(e.target.value);
  };

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

  const onSubmitPlace = (e) => {
    e.preventDefault();
    dispatch({
      type: GEOCODE_PLACE_REQUEST,
      data: place,
    });
  };

  // useEffect(() => {
  //   if (destination.lat && destination.lng) {
  //     const findPlace = new window.naver.maps.LatLng(
  //       destination.lat,
  //       destination.lng
  //     );
  //     currentMap.panTo(findPlace);
  //   }
  // }, [destination.lat, destination.lng]);

  return (
    <>
      <form action="" onSubmit={onSubmitPlace}>
        <input type="text" value={place} onChange={onChangePlace} />
        <button type="submit">찾기</button>
      </form>
      <div id="map" style={Style}></div>
    </>
  );
};

export default Map;
