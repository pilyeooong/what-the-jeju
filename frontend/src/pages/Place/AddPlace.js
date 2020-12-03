import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddPlaceForm from '../../components/Place/AddPlaceForm';
import { UPLOAD_PLACE_DONE } from '../../reducers/place';

const AddPlace = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { uploadPlaceDone } = useSelector(state => state.place);
  const { me } = useSelector(state => state.user);


  useEffect(() => {
    if (uploadPlaceDone) {
      history.push('/');
      dispatch({
        type: UPLOAD_PLACE_DONE
      })
    }
  }, [uploadPlaceDone]);

  useEffect(() => {
    if(!me) {
      alert('로그인이 필요합니다');
      history.push('/');
    }
  }, [me]);

  return <AddPlaceForm />
}

export default AddPlace;