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

  onMarkerClick(marker, propInfo) {
    console.log('Clicked:', marker);
    this.setState({
      selectedPlace: propInfo.html,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  render() {
    const props = this.props;
    const filteredProperties = props.properties.filter(propInfo => propInfo.location && propInfo.location.lat)
    return (
      <div style={{ width: '100%', height: '500px' }}>
        <Map google={window.google} >

          {
            filteredProperties.map(propInfo => (
              <Marker
                onClick={(marker) => this.onMarkerClick(marker, propInfo)}
                google={window.google}
                pos={propInfo.location}
                icon="http://res.cloudinary.com/golden-eagle/image/upload/v1473755159/g4172_lefldr.png"
              />
            ))
          }

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div className="gew_search-mapInfoWindow">
              <div dangerouslySetInnerHTML={{ __html: this.state.selectedPlace }} />
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}


export default PropertiesMap
