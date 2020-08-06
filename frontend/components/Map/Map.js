import React, { memo, useState, useEffect, useRef } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';

const Directions = (props) => {
  const [directions, setDirections] = useState();
  const { origin, destination } = props;
  const count = useRef(0);

  const options = {
    polylineOptions: {
      strokeColor: "red",
      strokeWeight: 6,
      strokeOpacity: 0.8
    }
  };

  useEffect(() => {
    count.current = 0;
    console.log(origin, destination);
  }, [origin.lat, origin.lng, destination.lat, destination.lng]);

  const directionsCallback = (result, status) => {
    console.log(result, status);
    if (status === 'OK' && count.current === 0) {
      count.current += 1;
      setDirections(result);
    }
  };
  
  return (
    <>
      <DirectionsService
        options={{ origin, destination, travelMode: 'TRANSIT' }}
        callback={directionsCallback}
      />
      <DirectionsRenderer directions={directions} options={options}/>
    </>
  );
};

const Map = (props) => {
  const { startPoint, endPoint } = props;

  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={{
          height: "100%",
          minHeight: "85vh",
          width: "100%"
        }}
        zoom={16}
        center={ startPoint ? { lat: 37.579779, lng: 126.976955 } : undefined } 
      >
        <Directions origin={startPoint} destination={endPoint} />
      </GoogleMap>
    </LoadScript>
  );
};

export default memo(Map);

