import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  SEARCH_DIRECTION_REQUEST,
  SEARCH_ADDRESS_REQUEST,
  SET_ADDRESS_FOR_DIRECTION,
} from '../../reducers/place';

import Modal from '../Modal';

const Style = {
  width: '100%',
  height: '400px',
};

const Map = ({ wayPoints }) => {
  const dispatch = useDispatch();

  const placeAddresses = useSelector((state) => state.place.placeAddresses);
  const destination = useSelector((state) => state.place.destination);
  const origin = useSelector((state) => state.place.origin);
  const paths = useSelector((state) => state.place.directionResult.paths);
  const directionResultCode = useSelector(
    (state) => state.place.directionResult.resultCode
  );
  const directionResultMessage = useSelector(
    (state) => state.place.directionResult.resultMessage
  );
  const distance = useSelector((state) => state.place.directionResult.distance);
  const duration = useSelector((state) => state.place.directionResult.duration);

  const [isOrigin, setIsOrigin] = useState(false);
  const [searchType, setSearchType] = useState('address');
  const [searchValue, setSearchValue] = useState('');
  const [searchedOrigin, setSearchedOrigin] = useState('');
  const [searchedDestination, setSearchedDestination] = useState('');
  const [displayDurationHour, setDisplayDurationHour] = useState(0);
  const [displayDurationMinute, setDisplayDurationMinute] = useState(0);
  const [displayDistance, setDisplayDistance] = useState(0);
  
  const [currentMap, setCurrentMap] = useState(null);

  const [click, setClick] = useState(false);
  const [addressesToShow, setAddressesToShow] = useState([]);
  const [totalAddressesPageNum, setTotalAddressesPageNum] = useState([]);
  const [currentAddressesPage, setCurrentAddressesPage] = useState(1);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT}&submodules=geocoder`;
    document.head.appendChild(script);

    script.onload = () => {
      const { naver } = window;
      let mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 15,
      };
      const map = new naver.maps.Map('map', mapOptions);
      const jeju = new naver.maps.LatLng(33.3590628, 126.534361);
      map.setCenter(jeju);
      setCurrentMap(map);
    };
  }, []);

  useEffect(() => {
    if (origin.lat && origin.lng) {
      const findPlace = new window.naver.maps.LatLng(origin.lat, origin.lng);
      currentMap.panTo(findPlace);
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(origin.lat, origin.lng),
        map: currentMap,
      });
      const infoWindow = new window.naver.maps.InfoWindow({
        anchorSkew: true,
        maxWidth: 140,
        backgroundColor: '#eee',
      });
      const infoMessage = [`<div>${origin.name}</div>`].join('');

      infoWindow.setContent(infoMessage);
      window.naver.maps.Event.addListener(marker, 'click', () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(currentMap, marker);
        }
      });
    }
  }, [origin.name, origin.lat, origin.lng, currentMap]);

  useEffect(() => {
    if (destination.lat && destination.lng) {
      const findPlace = new window.naver.maps.LatLng(
        destination.lat,
        destination.lng
      );
      currentMap.panTo(findPlace);
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          destination.lat,
          destination.lng
        ),
        map: currentMap,
      });
      const infoWindow = new window.naver.maps.InfoWindow({
        anchorSkew: true,
        maxWidth: 140,
        backgroundColor: '#eee',
      });
      const infoMessage = [`<div>${destination.name}</div>`].join('');

      infoWindow.setContent(infoMessage);
      window.naver.maps.Event.addListener(marker, 'click', () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(currentMap, marker);
        }
      });
    }
  }, [destination.name, destination.lat, destination.lng, currentMap]);

  useEffect(() => {
    if (paths.length !== 0) {
      new window.naver.maps.Polyline({
        map: currentMap,
        path: paths,
        strokeColor: 'red',
        strokeWeight: 3,
      });
      wayPoints.forEach(
        (wayPoint) =>
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(wayPoint.lat, wayPoint.lng),
            map: currentMap,
          })
      );
    }
  }, [wayPoints, currentMap, paths]);

  useEffect(() => {
    if (duration) {
      const totalDurationSecond = Math.round(duration / 1000);
      const totalDurationMinute = Math.round(totalDurationSecond / 60);
      setDisplayDurationHour(Math.floor(totalDurationMinute / 60));
      setDisplayDurationMinute(Math.floor(totalDurationMinute % 60));
    }
    if (distance) {
      setDisplayDistance(Math.round(distance / 1000));
    }
  }, [duration, distance]);

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

  const onChangeSearchValue = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const onClickAddressModal = useCallback(
    (type) => () => {
      if (type === 'origin') {
        setIsOrigin(true);
      } else {
        setIsOrigin(false);
      }
      if (!click) {
        setClick(true);
      } else {
        setClick(false);
      }
    },
    [click]
  );

  const onClickAddressPageNum = useCallback(
    (number) => () => {
      setCurrentAddressesPage(number);
    },
    []
  );

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

  const onChangeSearchType = useCallback(
    (e) => {
      setSearchType(e.target.value);
    },
    [searchType]
  );

  const onSearchDirection = useCallback(() => {
    if (wayPoints.length === 0) {
      alert('동선에 포함 시킬 핫플레이스를 추가해주세요');
      return;
    }
    dispatch({
      type: SEARCH_DIRECTION_REQUEST,
      data: {
        origin,
        destination,
        wayPoints,
      },
    });
  }, [origin, destination, wayPoints]);

  const onClickSearchedAddress = useCallback(
    (address) => () => {
      dispatch({
        type: SET_ADDRESS_FOR_DIRECTION,
        data: {
          type: isOrigin ? 'origin' : 'destination',
          address,
        },
      });
      const nameSetter =
        address.place_name.length === 0 ? searchValue : address.place_name;
      isOrigin
        ? setSearchedOrigin(nameSetter)
        : setSearchedDestination(nameSetter);
      setSearchValue('');
      setClick(false);
    },
    [isOrigin, searchValue]
  );

  return (
    <>
      <div className="searchDirection__form">
        <div className="searchDirection__input">
          <label htmlFor="">출발지</label>
          <input disabled type="text" value={searchedOrigin} />
          <button onClick={onClickAddressModal('origin')}>주소 검색</button>
        </div>
        <div className="searchDirection__input">
          <label htmlFor="">목적지</label>
          <input type="text" disabled value={searchedDestination} />
          <button onClick={onClickAddressModal('destination')}>
            주소 검색
          </button>
        </div>
      </div>
      <div id="map" style={Style}></div>
      <div className="searchDirection__button">
        <button onClick={onSearchDirection}>동선 검색</button>
      </div>
        <div className="searchDirection__result">
        {directionResultCode === 0 ? <><div className="">
            <span>총 이동시간</span>
            <span>
              {' '}
              {displayDurationHour}시간 {displayDurationMinute}분 소요
            </span>
          </div>
          <div className="">
            <span>총 이동거리</span>
            <span> 약 {displayDistance}km</span>
          </div> </> : <>{directionResultMessage}</>}
        </div>
      <Modal
        title={'주소검색'}
        isClicked={click}
        setClick={setClick}
        setSearchValue={setSearchValue}
      >
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
                onClick={onClickSearchedAddress(address)}
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

Map.propTypes = {
  wayPoints: PropTypes.array.isRequired,
};

export default Map;
