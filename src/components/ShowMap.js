import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ0bWFwcGVyIiwiYSI6ImNqbXVnMDhvOTJ3b2YzdmpwZjZmbTBjcnUifQ.AioO-9ZHdyYXk_ssF13CLQ';

class ShowMap extends React.Component {

  componentDidMount() {
    // create a map
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [this.props.painting.location.longitude, this.props.painting.location.latitude],
      zoom: 10,
      pitch: 30
    });

    this.map.on('load', () => {
      // when the map loads add 3d buildings layer
      // lifted directly from documentation
      // const layers = this.map.getStyle().layers;
      // const labelLayerId = layers.find(layer => layer.type === 'symbol' && layer.layout['text-field']).id;

      this.map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }));

    });

    console.log(this.props.painting.location);

    this.marker = new mapboxgl.Marker()
      .setLngLat([this.props.painting.location.longitude, this.props.painting.location.latitude])
      .addTo(this.map);


  }

  render() {
    // `ref` gets a reference to the DOM element after it has been created by React
    return (
      <div>
        <div ref={el => this.mapContainer = el} className="map" />
      </div>
    );
  }
}

export default ShowMap;
