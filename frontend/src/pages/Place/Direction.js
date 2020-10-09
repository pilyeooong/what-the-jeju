import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

import DirectionForm from '../../components/Directions/DirectionForm';
import Map from '../../components/Map';

const Direction = () => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.me);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    })
  }, []);
  return (
    <>
      {me && <DirectionForm me={me} />}
    </>
  );
};

export default Direction;
