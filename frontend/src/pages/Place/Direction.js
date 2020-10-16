import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

import AppLayout from '../../components/AppLayout';
import DirectionForm from '../../components/Directions/DirectionForm';

const Direction = () => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.me);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    })
  }, []);
  return (
    <AppLayout>
      {me && <DirectionForm me={me} />}
    </AppLayout>
  );
};

export default Direction;
