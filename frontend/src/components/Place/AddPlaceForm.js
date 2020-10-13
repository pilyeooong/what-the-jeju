import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';
import { API_HOST } from '../../utils/Constants';

import {
  SEARCH_ADDRESS_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_PLACE_REQUEST,
} from '../../reducers/place';

import './AddPlaceForm.scss';

import Logo from '../Logo';
import Modal from '../Modal';

const AddPlaceForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, placeAddresses } = useSelector((state) => state.place);
  const uploadPlaceError = useSelector(state => state.place.uploadPlaceError);

  const [click, setClick] = useState(false);
  const [addressesToShow, setAddressesToShow] = useState([]);
  const [totalAddressesPageNum, setTotalAddressesPageNum] = useState([]);
  const [currentAddressesPage, setCurrentAddressesPage] = useState(1);

  const [searchValue, onChangeSearchValue] = useInput('');
  const [category, onChangeCategory] = useInput('');
  const [name, onChangeName] = useInput('');
  const [description, onChangeDescription] = useInput('');

  const [address, setAddress] = useState('');
  const [searchType, setSearchType] = useState('address');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  useEffect(() => {
    setTotalAddressesPageNum([]);
    setCurrentAddressesPage(1);
    let totalPageNum = Math.ceil(placeAddresses.length / 5);
    for (let i = 1; i <= totalPageNum; i++) {
      setTotalAddressesPageNum((prev) => [...prev, i]);
    }
  }, [placeAddresses]);

  useEffect(() => {
    setAddressesToShow(
      placeAddresses.slice(
        (currentAddressesPage - 1) * 5,
        currentAddressesPage * 5
      )
    );
  }, [currentAddressesPage, placeAddresses]);

  useEffect(() => {
    if (uploadPlaceError) {
      alert(uploadPlaceError);
    }
  }, [uploadPlaceError]);

  const onChangeSearchType = useCallback(
    (e) => {
      setSearchType(e.target.value);
    },
    [searchType]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (category.length === 0 || category === 'none') {
        alert('카테고리를 선택해주세요');
        return;
      }
      const formData = new FormData();
      imagePaths.forEach((src) => {
        formData.append('image', src);
      });
      formData.append('category', category);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('address', address);
      formData.append('lat', lat);
      formData.append('lng', lng);
      return dispatch({
        type: UPLOAD_PLACE_REQUEST,
        data: formData,
      });
    },
    [category, name, description, address, imagePaths]
  );

  const onClickAddressPageNum = useCallback(
    (number) => () => {
      setCurrentAddressesPage(number);
    },
    []
  );

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

  const onClickAddressSearch = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: SEARCH_ADDRESS_REQUEST,
        data: {
          searchType,
          searchValue,
        },
      });
    },
    [searchValue, searchType]
  );

  const onClickSearchedAddress = useCallback(
    (idx) => (e) => {
      const selectedAddress = placeAddresses.find((place) => place.idx === idx);
      setLng(selectedAddress.lng);
      setLat(selectedAddress.lat);
      setAddress(e.target.innerText);
      setClick(false);
    },
    [placeAddresses, click]
  );

  return (
    <>
    <Logo title={'핫플 추가하기'} />
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <select
          className="form-category"
          placeholder="카테고리"
          value={category}
          onChange={onChangeCategory}
        >
          <option defaultValue value="none">------------</option>
          <option value="cafe">카페</option>
          <option value="ocean">해변</option>
          <option value="museum">박물관</option>
        </select>
        <input
          type="text"
          className="form-input"
          placeholder="이름"
          value={name}
          onChange={onChangeName}
          required
        />
        <input
          type="text"
          className="form-input"
          placeholder="설명"
          value={description}
          onChange={onChangeDescription}
          required
        />
        <button className="form-address-button" type="button" onClick={onClickAddressModal}>
          주소검색
        </button>
        <input
          type="text"
          className="form-input"
          placeholder="주소"
          value={address}
          // disabled
          required
        />
        <input
          type="file"
          className=""
          name="image"
          multiple
          onChange={onChangeImages}
          required
        />
        <div className="form-image">
          {imagePaths.map((v, i) => (
            <div className="form-image__thumbnail">
              <img src={`${API_HOST}/${v}`} />
            </div>
          ))}
        </div>
        <div className="form-upload">
          <button className="form-upload__button" type="submit">업로드</button>
        </div>
      </form>
      </div>
      <Modal title={'주소검색'} isClicked={click} setClick={setClick}>
        <form>
          <div className="searchTypeButtons">
            <input
              name="searchType"
              defaultChecked
              type="radio"
              value="address"
              onChange={onChangeSearchType}
            />
            <label>도로명주소로 찾기</label>
            <input
              name="searchType"
              type="radio"
              value="keyword"
              onChange={onChangeSearchType}
            />
            <label>키워드로 찾기</label>
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={onChangeSearchValue}
            placeholder={
              searchType === 'address'
                ? '도로명 + 건물번호'
                : '키워드를 입력해주세요'
            }
          />
          <button type="submit" onClick={onClickAddressSearch}>
            검색
          </button>
        </form>
        {addressesToShow.length !== 0
          ? addressesToShow.map((address, idx) => (
              <div
                className="addressList"
                key={idx}
                onClick={onClickSearchedAddress(address.idx)}
              >
                <a>{address.address_name}</a>
                <span>{address.place_name}</span>
              </div>
            ))
          : null}
        {totalAddressesPageNum &&
          totalAddressesPageNum.map((pageNum, idx) => (
            <a key={idx} onClick={onClickAddressPageNum(pageNum)}>
              <span>{pageNum} </span>
            </a>
          ))}
      </Modal>
    </>
  );
};

export default AddPlaceForm;
