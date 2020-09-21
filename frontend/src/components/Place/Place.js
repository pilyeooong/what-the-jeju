import React, { useRef, useCallback } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { API_HOST } from '../../utils/Constants';

import './Place.scss';

const Place = ({ place }) => {

  const placeLink = useRef();

  const onClickPlace = useCallback(() => {
    placeLink.current.click();
  }, []);

  const tempHashtags = ["바다", "명소", "드라이빙"];

  return (
    <div className="placeItem" onClick={onClickPlace}>
      <div className="placeImage">
        <img src={`${API_HOST}/${place.Images[0].src}`} alt=""/>
      </div>
      <div className="placeInfo">
        <Link to={`/place/${place.id}`} ref={placeLink}>
          <strong>{place.name}</strong>
        </Link>
        <span className="placeAddress">제주도 > 서귀포시</span>
        <div className="placeHashtags">
          {tempHashtags.map(tag => <span className="hashtag">#{tag}</span>)}
        </div>
      </div>
    </div>
  )
}

Place.propTypes = {
  place: PropTypes.object.isRequired,
}

export default Place;
