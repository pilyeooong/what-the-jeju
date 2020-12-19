import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  LIKE_PLACE_REQUEST,
  LOAD_PLACE_REQUEST,
  UNLIKE_PLACE_REQUEST,
  UNWISH_PLACE_REQUEST,
  WISH_PLACE_REQUEST,
  SET_LIKE_ERROR_NULL,
  SET_WISH_ERROR_NULL
} from '../../reducers/place';

import ImageSlider from '../../components/ImageSlider';
import PlaceInfo from '../../components/Place/PlaceInfo';
import PageLayout from '../../components/AppLayout/PageLayout';

import './PlaceDetail.scss';

const PlaceDetail = (props) => {
  const dispatch = useDispatch();
  const {
    match: {
      params: { placeId },
    },
  } = props;

  const placeDetail = useSelector(state => state.place.placeDetail);
  const likePlaceError = useSelector(state => state.place.likePlaceError);
  const wishPlaceError = useSelector(state => state.place.wishPlaceError);
  const me = useSelector((state) => state.user.me);

  const isWished = me && me.Wished.find((v) => v.id === parseInt(placeId, 10));
  const isLiked = me && me.Liked.find(v => v.id === parseInt(placeId, 10));

  const menuSize = 'menuClicked__mid'
  
  useEffect(() => {
    dispatch({
      type: LOAD_PLACE_REQUEST,
      data: placeId,
    });
  }, []);
  
  useEffect(() => {
    if(likePlaceError) {
      alert(likePlaceError);
      dispatch({
        type: SET_LIKE_ERROR_NULL
      });
    }
  }, [likePlaceError]);

  useEffect(() => {
    if(wishPlaceError) {
      alert(wishPlaceError);
      dispatch({
        type: SET_WISH_ERROR_NULL
      });
    }
  }, [wishPlaceError]);
  
  const onClickAddWish = useCallback(() => {
    dispatch({
      type: WISH_PLACE_REQUEST,
      data: placeId,
    });
  }, []);

  const onClickRemoveWish = useCallback(() => {
    dispatch({
      type: UNWISH_PLACE_REQUEST,
      data: placeId,
    });
  }, []);

  const onClickLike = useCallback(() => {
    dispatch({
      type: LIKE_PLACE_REQUEST,
      data: placeId
    })
  }, []);

  const onClickRemoveLike = useCallback(() => {
    dispatch({
      type: UNLIKE_PLACE_REQUEST,
      data: placeId
    })
  }, []);

  return (
    <PageLayout menuSize={menuSize}>
      <div className="placeContainer">
        {placeDetail && (
          <>
            <div className="placeAbout">
              <ImageSlider images={placeDetail.Images} />
              <div className="placeInfo">tablet ++; content;</div>
            </div>
            <div className="placeButtons">
              {me && isLiked ? (
                <i onClick={onClickRemoveLike} className="fas fa-heart liked"></i>
              ) : (
                <i onClick={onClickLike} className="far fa-heart"></i>
              )}
              {me && isWished ? (
                <i
                  onClick={onClickRemoveWish}
                  className="fas fa-cart-arrow-down"
                ></i>
              ) : (
                <i onClick={onClickAddWish} className="fas fa-cart-plus"></i>
              )}
            </div>
            <PlaceInfo placeDetail={placeDetail} />
          </>
        )}
      </div>
    </PageLayout>
  );
};

PlaceDetail.propTypes = {
  props: PropTypes.object
}

export default PlaceDetail;
