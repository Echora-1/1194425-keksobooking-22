import {getSimilarAds} from './data.js';
import {assignInactiveStatus as assignPageInactiveStatus} from './page-states.js';
import {load as loadMap, createAdMarkers} from './map.js';
import {} from './form.js';

const SIMILAR_COUNT = 10;
const similarAds = getSimilarAds(SIMILAR_COUNT);

assignPageInactiveStatus();
loadMap();
createAdMarkers(similarAds);
