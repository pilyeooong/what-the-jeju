import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  LOAD_PLACE_REQUEST,
  UNWISH_PLACE_REQUEST,
  WISH_PLACE_REQUEST,
} from '../../reducers/place';

import ImageSlider from '../../components/ImageSlider';
import PlaceInfo from '../../components/Place/PlaceInfo';
import AppLayout from '../../components/AppLayout';

import './PlaceDetail.scss';

const PlaceDetail = (props) => {
  const dispatch = useDispatch();
  const {
    match: {
      params: { placeId },
    },
  } = props;

  const { placeDetail } = useSelector((state) => state.place);
  const { me } = useSelector((state) => state.user);

  const isWished = me && me.Wished.find((v) => v.id === parseInt(placeId, 10));

  useEffect(() => {
    dispatch({
      type: LOAD_PLACE_REQUEST,
      data: placeId,
    });
  }, []);

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

  return (
    <AppLayout>
      <div className="placeContainer">
        {placeDetail && (
          <>
            <div className="placeAbout">
              <ImageSlider images={placeDetail.Images} />
              <div className="placeInfo">tablet ++; content;</div>
            </div>
            <div className="placeButtons">
              <i className="far fa-heart"></i>
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
    </AppLayout>
  );
};

export default PlaceDetail;
