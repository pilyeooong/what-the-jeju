import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';
import { API_HOST } from '../../utils/Constants';

import { UPLOAD_IMAGES_REQUEST, UPLOAD_PLACE_REQUEST } from '../../reducers/place';

const AddPlaceForm = () => {
  const dispatch = useDispatch();

  const { imagePaths } = useSelector(state => state.place);

  const [category, onChangeCategory] = useInput('');
  const [name, onChangeName] = useInput('');
  const [description, onChangeDescription] = useInput('');
  const [address, onChangeAddress] = useInput('');

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData();
    imagePaths.forEach(src => {
      formData.append('image', src);
    });
    formData.append('category', category);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('address', address);
    return dispatch({
      type: UPLOAD_PLACE_REQUEST,
      data: formData
    })
  }, [name, description, address, imagePaths]);

  const onChangeImages = useCallback((e) => {
    const imageData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageData.append('image', f);
    })
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageData,
    })
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <select placeholder="카테고리" value={category} onChange={onChangeCategory}>
        <option selected>------------</option>
        <option value="1">카페</option>
        <option value="2">해변</option>
        <option value="3">박물관</option>
      </select>
      <input type="text" placeholder="이름" value={name} onChange={onChangeName} required/>
      <input type="text" placeholder="설명" value={description} onChange={onChangeDescription} required/>
      <input type="text" placeholder="주소" value={address} onChange={onChangeAddress} required/>
      <input type="file" name="image" multiple onChange={onChangeImages} required/>
      {imagePaths.map((v, i) => <img src={`${API_HOST}/${v}`}/>)}
      <button type="submit">업로드</button>
    </form>
    
  )
}

export default AddPlaceForm
