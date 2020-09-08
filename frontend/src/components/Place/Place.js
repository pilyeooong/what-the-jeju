import React from 'react'
import PropTypes from 'prop-types';

import './Place.scss';

const Place = ({ place }) => {
  return (
    <div className="placeItem">
      <div className="placeImage">
        <img src={place.Images[0].src} alt=""/>
      </div>
      <div className="placeInfo">
        {place.name}
      </div>
    </div>
  )
}

Place.propTypes = {
  place: PropTypes.object.isRequired,
}

export default Place;
