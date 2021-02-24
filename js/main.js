import {assignInactiveStatus as assignPageInactiveStatus} from './page-states.js';
import {load as loadMap, createAdMarkers} from './map.js';
import {} from './form.js';
import {getData} from './server-connection.js';

assignPageInactiveStatus();
loadMap();
getData(createAdMarkers);
