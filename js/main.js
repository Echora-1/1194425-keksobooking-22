import {getSimilarAds} from './data.js';
import {assignDisabledStatus as assignPageDisabledStatus} from './page-states.js';
import {loading as loadingMap, createAdMarkers} from './map.js';

const SIMILAR_COUNT = 10;
const similarAds = getSimilarAds(SIMILAR_COUNT);

assignPageDisabledStatus(true);
loadingMap();
createAdMarkers(similarAds);
