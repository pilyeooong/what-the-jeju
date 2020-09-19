import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CHECK_JEJU_NATIVE_REQUEST } from '../../reducers/user';

const Profile = () => {
  const dispatch = useDispatch();

  const getLocation = useCallback(() => {
    const { navigator } = window;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch({
            type: CHECK_JEJU_NATIVE_REQUEST,
            data: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  }, []);


  return (
    <div>
      <button onClick={getLocation}>도민 인증</button>
    </div>
  );
};

export default Profile;
