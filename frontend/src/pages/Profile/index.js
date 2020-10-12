import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CHECK_JEJU_NATIVE_REQUEST } from '../../reducers/user';
import { API_HOST } from '../../utils/Constants';

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const me = useSelector((state) => state.user.me);

  useEffect(() => {
    if (!me) {
      alert('로그인 한 유저만 접근할 수 있습니다.');
      history.push('/');
    }
  }, [me]);

  const getLocation = useCallback(() => {
    const { navigator } = window;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch({
            type: CHECK_JEJU_NATIVE_REQUEST,
            data: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
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
      {me &&
        <span>프로필화면</span>
        // me.Wished.map((wishedPlace) => (
        //   <div>
        //     {wishedPlace.name}
        //     <img
        //       src={`${API_HOST}/${wishedPlace.Images[0].src}`}
        //       alt={wishedPlace.Images[0].src}
        //     ></img>
        //   </div>))
      }
      <button onClick={getLocation}>도민 인증</button>
    </div>
  );
};

export default Profile;
