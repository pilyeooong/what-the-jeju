import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

import AppLayout from '../../components/AppLayout';
import PageLayout from '../../components/AppLayout/PageLayout';
import DirectionForm from '../../components/Directions/DirectionForm';
import { useHistory } from 'react-router-dom';

const Direction = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const me = useSelector((state) => state.user.me);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    })
  }, []);

  useEffect(() => {
    if(!me) {
      alert('로그인한 유저만 이용 가능합니다');
      history.replace('/');
    }
  }, [me])

  const menuSize = 'menuClicked__short';
  
  return (
    <PageLayout menuSize={menuSize}>
      {me && <DirectionForm me={me} />}
    </PageLayout>
  );
};

export default Direction;
