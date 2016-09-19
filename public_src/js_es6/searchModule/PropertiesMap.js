import React from 'react';
import { Map, Marker, InfoWindow } from './maps';

class PropertiesMap extends React.Component{
  constructor() {
    super();
    this.state = {
      selectedPlace: '',
      activeMarker: null,
      showingInfoWindow: false,
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.render = this.render.bind(this);
  }

  onMarkerClick(marker) {
    console.log('Clicked:', marker);
    this.setState({
      selectedPlace: 'Anything',
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  render() {
    const props = this.props;
    return (
      <div style={{ width: '100%', height: '500px' }}>
        <Map google={window.google} >

          {
            props.locations.map(loc => console.log(loc) || (
              <Marker
                onClick={this.onMarkerClick}
                google={window.google}
                pos={loc}
                icon="http://res.cloudinary.com/golden-eagle/image/upload/v1473755159/g4172_lefldr.png"
              />
            ))
          }

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
              <div>
                <h1>{this.state.selectedPlace}</h1>
              </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}


export default PropertiesMap
