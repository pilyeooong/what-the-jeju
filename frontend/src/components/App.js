import React from 'react';

import '../global-styles/main.scss';

import AppLayout from './AppLayout/AppLayout';
import PlaceList from './Place/PlaceList';

function App() {
  return (
    <AppLayout>
      <PlaceList />
    </AppLayout>
  );
}

export default App;
