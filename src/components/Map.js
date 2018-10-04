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
      zoom: this.props.zoom
    });

    // when we stop moving the map set `isFlaying` to false
    this.map.on('moveend', () => this.map.isFlying = false);

    this.map.on('zoom', () => {
      if(this.map.isFlying) return false; // if `isFlying` is true do nothing
      const zoom = this.map.getZoom();
      const pitch = zoom * 4;

      // otherwise set pitch when zooming, so that as you zoom out the pitch reduces
      this.map.setPitch(pitch);
    });

    this.map.on('load', () => {
      // when the map loads add 3d buildings layer
      // lifted directly from documentation
      const layers = this.map.getStyle().layers;
      const labelLayerId = layers.find(layer => layer.type === 'symbol' && layer.layout['text-field']).id;

      this.map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          // 'fill-extrusion-color': '#f00',
          'fill-extrusion-height': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            15.05, ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            15.05, ['get', 'min_height']
          ],
          'fill-extrusion-opacity': .6
        }
      }, labelLayerId);
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
