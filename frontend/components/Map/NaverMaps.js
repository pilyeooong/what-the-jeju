import React, { useState, useEffect } from 'react';

const Style = {
  width: '100%',
  height: '400px',
};

const NaverMaps = () => {
  const [place, setPlace] = useState('태평로 549');
  const [currentMap, setCurrentMap] = useState(null);

  const onChangePlace = (e) => {
    setPlace(e.target.value);
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
      map.setCenter(jeju);
      setCurrentMap(map);
    };
  }, []);

  const onSubmitPlace = (e) => {
    e.preventDefault();
    naver.maps.Service.geocode({ query: place }, function (status, response) {
      if (status === naver.maps.Service.Status.Error) {
        alert('Error');
      }
      if (response.v2.addresses[0]) {
        const lat = response.v2.addresses[0].y;
        const lng = response.v2.addresses[0].x;
        const findPlace = new naver.maps.LatLng(lat, lng);
        currentMap.panTo(findPlace);
      } {
        alert('정확한 도로명 기입 필요');
      }
    });
  };

  return (
    <>
      <form action="" onSubmit={onSubmitPlace}>
        <input type="text" value={place} onChange={onChangePlace} />
        <button type="submit">찾기</button>
      </form>
      <div id="map" style={Style}></div>;
    </>
  );
};

export default NaverMaps;
