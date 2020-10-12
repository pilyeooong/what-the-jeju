import React from 'react';
import PropTypes from 'prop-types';

import './PlaceInfo.scss';

const PlaceInfo = ({ placeDetail }) => {
  const { name, description, address, fee, CategoryId } = placeDetail;
  return (
    <div className="placeDetailInfo">
      <div className="placeDetailInfo__name">{name}</div>
      <div className="placeDetailInfo__description"><span>{description}</span></div>
      <div className="placeDetailInfo__basicInfo">
        <div className="placeDetailInfo__address">
          <span className="title">주소</span>
          <span>{address}</span>
        </div>
        <div className="placeDetailInfo__fee">
          <span className="title">입장료</span>
          {fee === 0 ? (
            <span>무료</span>
          ) : (
            <span>{fee}원</span>
          )}
        </div>
      </div>
    </div>
  );
};

PlaceInfo.propTypes = {
  placeDetail: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    address: PropTypes.string,
    fee: PropTypes.number,
    CategoryId: PropTypes.number,
  }).isRequired,
};

export default PlaceInfo;
