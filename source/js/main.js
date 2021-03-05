import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {setThrottle} from './utils.js';
import {assignInactiveStatus as assignPageInactiveStatus} from './page-states.js';
import {load as loadMap, createAdMarkers} from './map.js';
import {} from './form.js';
import {getData} from './server-connection.js';
import {setMapChanges as setMapFilterChanges} from './filter.js';

const RERENDER_DELAY = 500;

assignPageInactiveStatus();

loadMap();
getData((data) => {
  createAdMarkers(data);
  setMapFilterChanges(setThrottle(() => createAdMarkers(data), RERENDER_DELAY));
});

