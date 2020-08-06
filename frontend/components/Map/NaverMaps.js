import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Style = {
  width: '100%',
  height: '400px',
};

const NaverMaps = () => {
  const [currentMap, setCurrentMap] = useState(null);

  const [origin, setOrigin] = useState({ name: '', lat: 0, lng: 0 });
  const [destination, setDestination] = useState({ name: '', lat: 0, lng: 0 });

  const onChangeOrigin = (e) => {
    setOrigin({ ...origin, name: e.target.value });
  };
  const onChangeDestination = (e) => {
    setDestination({ ...destination, name: e.target.value });
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

  const onSubmitPlace = (place) => async (e) => {
    e.preventDefault();

    const type = e.target.id;
    naver.maps.Service.geocode({ query: place.name }, async function (status, response) {
      if (status === naver.maps.Service.Status.Error) {
        alert('Error');
      }
      if (response.v2.addresses[0]) {
        if(type === "origin") {
          setOrigin({ ...origin, lat: response.v2.addresses[0].y, lng: response.v2.addresses[0].x });
        } else {
          setDestination({ ...destination, lat: response.v2.addresses[0].y, lng: response.v2.addresses[0].x });
        }
        console.log(type, place);
        const findPlace = new naver.maps.LatLng(place.lat, place.lng);
        currentMap.panTo(findPlace);
        new naver.maps.Marker({
          position: findPlace,
          map: currentMap,
        });
      } else {
        alert('정확한 도로명 기입 필요');
      }
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
    new naver.maps.Polyline({
      path: result.data.route.traoptimal[0].path,
      strokeColor: '#00CA00',
      strokeOpacity: 0.8,
      strokeWeight: 6,
      zIndex: 2,
      clickable: true,
      map: currentMap,
    });
  };

  return (
    <>
      <form action="" id="origin" onSubmit={onSubmitPlace(origin)}>
        <input type="text" value={origin.name} onChange={onChangeOrigin} />
        <button type="submit">출발지 찾기</button>
      </form>
      <form action="" id="destination" onSubmit={onSubmitPlace(destination)}>
        <input
          type="text"
          value={destination.name}
          onChange={onChangeDestination}
        />
        <button type="submit">목적지 찾기</button>
      </form>
      {/* <form action="" onSubmit={onSubmitDirection}>
        <input type="text" value={origin} onChange={onChangeOrigin} />
        <input type="text" value={destination} onChange={onChangeDestination} />
        <button type="submit">검색</button>
      </form> */}
      <div id="map" style={Style}></div>;
    </>
  );
};

export default NaverMaps;
