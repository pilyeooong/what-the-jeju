import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddPlaceForm from '../../components/Place/AddPlaceForm';

const AddPlace = () => {
  const history = useHistory();
  const { uploadPlaceDone } = useSelector(state => state.place);
  const { me } = useSelector(state => state.user);


  useEffect(() => {
    if (uploadPlaceDone) {
      history.push('/');
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