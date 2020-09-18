import React from 'react'

import './PlaceInfo.scss';

const PlaceInfo = ({ placeDetail }) => {
  const { name, description, address, fee } = placeDetail;
  return (
    <div className="info-container">
      <div>{name}</div>
      <div>{description}</div>
      <div>{address}</div>
      {fee === 0 ? <span>무료</span> : <span>{fee}원</span>}
    </div>
  )
}

export default PlaceInfo
