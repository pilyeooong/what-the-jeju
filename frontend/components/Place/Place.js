import React from 'react'
import PropTypes from 'prop-types';

import styles from './Place.module.scss';

const Place = ({ place }) => {
  return (
    <div className={styles.placeItem}>
      <div className={styles.placeImage}>
        <img src={place.Images[0].src} alt=""/>
      </div>
      <div className={styles.placeInfo}>
        {place.name}
      </div>
    </div>
  )
}

Place.propTypes = {
  place: PropTypes.object.isRequired,
}

export default Place;
