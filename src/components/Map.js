import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ0bWFwcGVyIiwiYSI6ImNqbXVnMDhvOTJ3b2YzdmpwZjZmbTBjcnUifQ.AioO-9ZHdyYXk_ssF13CLQ';

class Map extends React.Component {

  componentDidMount() {
    // create a map
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [this.props.center.lng, this.props.center.lat],
      zoom: this.props.zoom,
      pitch: 30
    });

    this.map.on('load', () => {
      this.map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }));
    });

    this.markers = this.props.paintings.map(painting => {
      // create a marker for each location
      const el = document.createElement('div');
      el.className = 'marker';

      el.addEventListener('click', () => {
        // when marker is clicked 'fly' to that location
        this.map.isFlying = true; // this is to handle custom zoom functionality
        this.map.flyTo({
          center: [painting.location.longitude, painting.location.latitude],
          pitch: 65,
          zoom: 16
        });

      });

      // create add the marker to the map
      return new mapboxgl.Marker(el)
        .setLngLat([painting.location.longitude, painting.location.latitude])
        .addTo(this.map);
    });
  }

  componentDidUpdate() {
    // remove the existing markers
    // add the new markers
    // update the center point and zoom too...

    this.map.setCenter([this.props.center.lng, this.props.center.lat]);
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

export default Map;
