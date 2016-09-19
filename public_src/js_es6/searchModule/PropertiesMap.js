import React from 'react';
import { Map, Marker } from './maps';

const PropertiesMap = props => (
  <div style={{ width: '100%', height: '500px' }}>
    <Map google={window.google} >
      <Marker
        onClick={() => console.log('Clicked me')}
        google={window.google}
        pos={{ lat: 51.496322, lng: -0.178736 }}
        icon="http://res.cloudinary.com/golden-eagle/image/upload/v1473755159/g4172_lefldr.png"
      />
    </Map>
  </div>
);


export default PropertiesMap
