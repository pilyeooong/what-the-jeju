import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';
import { API_HOST } from '../../utils/Constants';

import {
  SEARCH_ADDRESS_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_PLACE_REQUEST,
} from '../../reducers/place';
import Modal from '../Modal';

const AddPlaceForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, placeAddresses } = useSelector((state) => state.place);

  const [click, setClick] = useState(false);
  const [totalAddressesPageNum, setTotalAddressesPageNum] = useState([]);
  const [currentAddressesPage, setCurrentAddressesPage] = useState(1);
  const [addressesToShow, setAddressesToShow] = useState([]);

  const [searchValue, onChangeSearchValue] = useInput('');
  const [category, onChangeCategory] = useInput('');
  const [name, onChangeName] = useInput('');
  const [description, onChangeDescription] = useInput('');
  const [address, setAddress] = useState('');


  useEffect(() => {
    setTotalAddressesPageNum([]);
    setCurrentAddressesPage(1);
    let totalPageNum = Math.ceil(placeAddresses.length / 5);
    for(let i = 1; i <= totalPageNum; i++ ) {
      setTotalAddressesPageNum(prev => [...prev, i]);
    }
  }, [placeAddresses]);

  useEffect(() => {
    setAddressesToShow(placeAddresses.slice((currentAddressesPage - 1) * 5 , currentAddressesPage * 5));
  }, [currentAddressesPage, placeAddresses]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData();
      imagePaths.forEach((src) => {
        formData.append('image', src);
      });
      formData.append('category', category);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('address', address);
      return dispatch({
        type: UPLOAD_PLACE_REQUEST,
        data: formData,
      });
    },
    [name, description, address, imagePaths]
  );

  const onClickAddressPageNum = useCallback((number) => () => {
    setCurrentAddressesPage(number);
  }, []);

  const onChangeImages = useCallback((e) => {
    const imageData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageData,
    });
  }, []);

  const onClickAddressModal = useCallback(() => {
    if (!click) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [click]);

  const onClickAddressSearch = useCallback(() => {
    dispatch({
      type: SEARCH_ADDRESS_REQUEST,
      data: searchValue,
    });
  }, [searchValue]);

  const onClickSearchedAddress = useCallback((e) => {
    setAddress(e.target.innerText);
    setClick(false);
  }, [click]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <select
          placeholder="카테고리"
          value={category}
          onChange={onChangeCategory}
        >
          <option defaultValue>------------</option>
          <option value="1">카페</option>
          <option value="2">해변</option>
          <option value="3">박물관</option>
        </select>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={onChangeName}
          required
        />
        <input
          type="text"
          placeholder="설명"
          value={description}
          onChange={onChangeDescription}
          required
        />
        <button type="button" onClick={onClickAddressModal}>
          주소검색
        </button>
        <input
          type="text"
          placeholder="주소"
          value={address}
          disabled
          required
        />
        <input
          type="file"
          name="image"
          multiple
          onChange={onChangeImages}
          required
        />
        {imagePaths.map((v, i) => (
          <img src={`${API_HOST}/${v}`} />
        ))}
        <button type="submit">업로드</button>
      </form>
      <Modal title={'주소검색'} isClicked={click} setClick={setClick}>
        <input
          type="text"
          value={searchValue}
          onChange={onChangeSearchValue}
          placeholder="주소를 입력해주세요"
        />
        <button onClick={onClickAddressSearch}>검색</button>
        {addressesToShow.length !== 0
          ? addressesToShow.map((address, index) => (
              <div key={index} onClick={onClickSearchedAddress}><a>{address.address_name}</a></div>
            ))
          : null}
        {totalAddressesPageNum && totalAddressesPageNum.map(pageNum => <a onClick={onClickAddressPageNum(pageNum)}><span>{pageNum} </span></a>)}
      </Modal>
    </>
  );
};

export default AddPlaceForm;
