import React from 'react';
import Map from '../components/Map/Map';

const places = [
  { lat: 37.347061, lng: 126.952753 },
  { lat: 37.344265, lng: 126.948384 },
  { lat: 37.34859, lng: 126.958301 },
];

const Home = () => {
  return (
    <div>
      <Map pickupLocation={{ lat: places[0].lat, lng: places[0].lng }} dropLocation={{ lat: places[1].lat, lng: places[1].lng }}/>
      {/* <Map pickupLocation="London" dropLocation="LosAngeles" /> */}
    </div>
  );
};

export default Home;
