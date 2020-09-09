import React from 'react';

import AppLayout from '../components/AppLayout/AppLayout';
import PlaceList from '../components/Place/PlaceList';

const Home = () => {
  return (
    <AppLayout>
      <PlaceList />
    </AppLayout>
  );
};

export default Home;
