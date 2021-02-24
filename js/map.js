import {assignActiveStatus as assignPageActiveStatus} from './page-states.js';
import {createAd} from './card-constructor.js';


/* global L:readonly */
const STARTING_LATITUDE = 35.6895000;
const STARTING_LONGITUDE = 139.6917100;
const addressInput = document.querySelector('#address');
const map = L.map('map-canvas');
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

const load  = () => {
  map.on('load', () => {
    assignPageActiveStatus();

  })
    .setView({
      lat: STARTING_LATITUDE,
      lng: STARTING_LONGITUDE,
    }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.addTo(map);
  mainMarker.on('move', (evt) => {
    const coordinates = evt.target.getLatLng();
    addressInput.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
  });
};

const createAdMarkers = (data) => {
  data.forEach((element) => {
    const marker = L.marker({
      lat: element.location.x,
      lng: element.location.y,
    },
    {
      icon: adMarkerIcon,
    },
    );

    marker.addTo(map).bindPopup(
      createAd(element),
      {
        keepInView: true,
      },
    );
  });
}

export {load, createAdMarkers, STARTING_LATITUDE, STARTING_LONGITUDE};
