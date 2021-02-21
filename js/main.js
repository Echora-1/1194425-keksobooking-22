import {getSimilarAds} from './data.js';
import {getActiveOrInactiveStatus as getActiveOrInactivePageStatus} from './page-states.js';
import {toLoad as toLoadMap, createAdMarkers} from './map.js';
import {} from './form.js';

const SIMILAR_COUNT = 10;
const similarAds = getSimilarAds(SIMILAR_COUNT);

getActiveOrInactivePageStatus('inactive');
toLoadMap();
createAdMarkers(similarAds);
