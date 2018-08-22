
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    pitch: 45,
    bearing: -17.6,
    center: [-3.7, 40.45], // starting position
    zoom: 15 // starting zoom,
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.on('load', function() {
    // Insert the layer beneath any symbol layer.
    var layers = map.getStyle().layers.reverse();
    var labelLayerIdx = layers.findIndex(function (layer) {
        return layer.type !== 'symbol';
    });
    var labelLayerId = labelLayerIdx !== -1 ? layers[labelLayerIdx].id : undefined;
    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': {
                'type': 'identity',
                'property': 'height'
            },
            'fill-extrusion-base': {
                'type': 'identity',
                'property': 'min_height'
            },
            'fill-extrusion-opacity': .6
        }
    }, labelLayerId);
});