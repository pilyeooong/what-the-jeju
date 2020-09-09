import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Place.scss';

const Place = ({ place }) => {
  return (
    <div className="placeItem">
      <div className="placeImage">
        <img src={place.Images[0].src} alt=""/>
      </div>
      <div className="placeInfo">
        <Link to={`/place/${place.id}`}>
          {place.name}
        </Link>
      </div>
    </div>
  )
}

Place.propTypes = {
  place: PropTypes.object.isRequired,
}

export default Place;
