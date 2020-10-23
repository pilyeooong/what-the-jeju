import React, { useEffect, useState, useCallback } from 'react';

import { API_HOST } from '../../utils/Constants';

import Map from '../../components/Map';

import './DirectionForm.scss';

const DirectionForm = ({ me }) => {
  const [wished, setWished] = useState(me.Wished);
  const [wayPoints, setWayPoints] = useState([]);

  const onAddWayPoint = useCallback(
    (place) => () => {
      if(wayPoints.length === 5) {
        return alert('최대 5개까지만 경유지 설정이 가능합니다.');
      }
      const afterAdded = wished.filter((wish) => wish.id !== place.id);
      setWayPoints((prev) => [...prev, place]);
      setWished(afterAdded);
    },
    [wished]
  );

  const onDeleteWayPoint = useCallback(
    (place) => () => {
      const afterDeleted = wayPoints.filter(
        (wayPoint) => wayPoint.id !== place.id
      );
      setWayPoints(afterDeleted);
      setWished((prev) => [...prev, place]);
    },
    [wayPoints]
  );

  return (
    <div className="container">
      {wished.length === 0 && wayPoints === 0 ? (
        <span>찜한 핫플레이스가 없어요</span>
      ) : (
        <>
          <div className="listTitle">찜한 목록</div>
          <div className="directionFormList">
            {wished.map((wish) => (
              <div className="addedPlace">
                <img src={`${API_HOST}/${wish.Images[0].src}`} alt="" />
                <div className="wishPlaceInfo">
                  <span>{wish.name}</span>
                  <i className="fas fa-plus" onClick={onAddWayPoint(wish)}></i>
                </div>
              </div>
            ))}
            {wished.length === 0 && <div>찜 목록이 비었습니다.</div>}
          </div>
          <div className="listTitle">경유지 추가하기</div>
          <div className="directionFormList">
            {wayPoints &&
              wayPoints.map((wayPoint) => (
                <div className="addedPlace">
                  <img src={`${API_HOST}/${wayPoint.Images[0].src}`} alt="" />
                  <div className="wishPlaceInfo">
                    <span>{wayPoint.name}</span>
                    <i
                      className="fas fa-minus"
                      onClick={onDeleteWayPoint(wayPoint)}
                    ></i>
                  </div>
                </div>
              ))}
          </div>
          <Map wayPoints={wayPoints} />
        </>
      )}
    </div>
  );
};

export default DirectionForm;
