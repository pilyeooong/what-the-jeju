import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const WishList = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  
  return (
    <div>
      
    </div>
  )
}

export default WishList;
