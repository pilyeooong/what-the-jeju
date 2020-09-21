import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_PLACE_REQUEST } from '../../reducers/place';

import ImageSlider from '../../components/ImageSlider';
import PlaceInfo from '../../components/Place/PlaceInfo';
import AppLayout from '../../components/AppLayout/AppLayout';

const PlaceDetail = (props) => {
  const dispatch = useDispatch();
  const {
    match: {
      params: { placeId },
    },
  } = props;

  const { placeDetail } = useSelector((state) => state.place);

  useEffect(() => {
    dispatch({
      type: LOAD_PLACE_REQUEST,
      data: placeId,
    });
  }, []);

  return (
    <AppLayout>
      <div className>
        {placeDetail && (
          <>
            <ImageSlider images={placeDetail.Images} />
            <PlaceInfo placeDetail={placeDetail} />
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default PlaceDetail;
