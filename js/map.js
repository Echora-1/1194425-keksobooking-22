import {assignActiveStatus as assignPageActiveStatus} from './page-states.js';
import {create as createAd} from './ad-constructor.js';
import {getAdMatch} from './filter.js';
/* global L:readonly */
const STARTING_LATITUDE = 35.6895000;
const STARTING_LONGITUDE = 139.6917100;
const URL_TEMPLATEL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const AMOUNT_MARKERS = 10;
const map = L.map('map-canvas');
const markersLayer = new L.LayerGroup();
const mainMarkerIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const adMarkerIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: STARTING_LATITUDE,
    lng: STARTING_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);
mainMarker.addTo(map);

L.tileLayer(
  URL_TEMPLATEL,
  {
    attribution: COPYRIGHT,
  },
).addTo(map);

const setStartPosition = () => {
  mainMarker.setLatLng({lat: STARTING_LATITUDE, lng: STARTING_LONGITUDE});
  map.setView({
    lat: STARTING_LATITUDE,
    lng: STARTING_LONGITUDE,
  }, 13);
};

const load  = () => {
  map.on('load', () => {
    assignPageActiveStatus();
  })
  setStartPosition();
};


const createAdMarkers = (data) => {
  markersLayer.clearLayers();
  data.slice()
    .filter(ad => getAdMatch(ad))
    .slice(0, AMOUNT_MARKERS)
    .forEach((element) => {
      const marker = L.marker({
        lat: element.location.lat,
        lng: element.location.lng,
      },
      {
        icon: adMarkerIcon,
      },
      );
      marker.bindPopup(
        createAd(element),
        {
          keepInView: true,
        },
      );
      markersLayer.addLayer(marker);
    });
  markersLayer.addTo(map);
}

const recordStartingAddress = (input) => {
  const coordinates = mainMarker.getLatLng();
  input.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};

const setMoveMainMarker = (input) => {
  mainMarker.on('move', (evt) => {
    const coordinates = evt.target.getLatLng();
    input.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
  });
};

export {load, createAdMarkers, setStartPosition, recordStartingAddress, setMoveMainMarker};

