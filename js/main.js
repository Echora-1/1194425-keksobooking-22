import {assignInactiveStatus as assignPageInactiveStatus} from './page-states.js';
import {loadMap, createAdMarkers} from './leaflet.js';
import {} from './form.js';
import {getData} from './server-connection.js';
import {setMapChanges as setMapFilterChanges} from './filter.js';

assignPageInactiveStatus();

loadMap();
getData((data) => {
  createAdMarkers(data);
  setMapFilterChanges(() => createAdMarkers(data));
});

