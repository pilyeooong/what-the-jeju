import React from 'react'

const PlaceDetail = (props) => {
  const { match: { params: { placeId }}} = props;
  return (
    <div>
      here is place Detail
    </div>
  )
}

export default PlaceDetail;
