import React, { useEffect, useState, useCallback } from 'react';

import { API_HOST } from '../../utils/Constants';

import Map from '../../components/Map';

import './DirectionForm.scss';

const DirectionForm = ({ me }) => {
  const [wished, setWished] = useState(me.Wished);
  const [wayPoints, setWayPoints] = useState([]);

  useEffect(() => {
    console.log('wished', wished);
    console.log('wayPoints', wayPoints);
  }, [wished, wayPoints]);

  const onAddWayPoint = useCallback((place) => () => {
    const afterAdded = wished.filter((wish) => wish.id !== place.id);
    setWayPoints((prev) => [...prev, place]);
    setWished(afterAdded);
  }, [wished]);

  const onDeleteWayPoint = useCallback((place) => () => {
    const afterDeleted = wayPoints.filter(wayPoint => wayPoint.id !== place.id);
    setWayPoints(afterDeleted);
    setWished(prev => [...prev, place]);
  }, [wayPoints]);

  return (
    <div>
      {wished.length === 0 && wayPoints === 0 ? (
        <span>찜한 핫플레이스가 없어요</span>
      ) : (
        <>
          <span>찜한 목록</span>
          <div className="wishedList">
            {wished.map((wish) => (
              <div className="wishPlace">
                <img src={`${API_HOST}/${wish.Images[0].src}`} alt="" />
                <div className="wishPlaceInfo">
                  <span>{wish.name}</span>
                  <i className="fas fa-plus" onClick={onAddWayPoint(wish)}></i>
                </div>
              </div>
            ))}
            {wished.length === 0 && <span>찜 목록이 비었습니다.</span>}
          </div>
          <div className="wishedList">
            {wayPoints &&
              wayPoints.map((wayPoint) => (
                <div className="wishPlace">
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
