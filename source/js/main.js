import 'leaflet/dist/leaflet.js';
import 'leaflet/dist/leaflet.css';
import {setThrottle} from './utils.js';
import {assignInactiveStatus as assignPageInactiveStatus} from './page-states.js';
import {load as loadMap, createAdMarkers} from './map.js';
import {} from './form.js';
import {getData} from './server-connection.js';
import {onMapChanges as onMapFilterChanges} from './filter.js';

const RERENDER_DELAY = 500;

assignPageInactiveStatus();

loadMap();
getData((data) => {
  createAdMarkers(data);
  onMapFilterChanges(setThrottle(() => createAdMarkers(data), RERENDER_DELAY));
});

