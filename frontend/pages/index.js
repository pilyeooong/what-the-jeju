import React from 'react';
import Map from '../components/Map/Map';
import NaverMaps from '../components/Map/NaverMaps';

const places = [
  { lat: 33.499648, lng: 126.531275 },
  { lat: 33.255300, lng: 126.560114 },
  { lat: 37.34859, lng: 126.958301 },
];

const Home = () => {
  return (
    <div>
      <NaverMaps />
      {/* <Map startPoint={{ lat: places[0].lat, lng: places[0].lng }} endPoint={{ lat: places[1].lat, lng: places[1].lng }}/> */}
      {/* <Map pickupLocation="London" dropLocation="LosAngeles" /> */}
    </div>
  );
};

export default Home;
