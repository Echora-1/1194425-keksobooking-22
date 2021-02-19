import {assignDisabledStatus} from './page-states.js';
import {createAd} from './card-constructor.js';

/* global L:readonly */
const addressInput = document.querySelector('#address');
const map = L.map('map-canvas');
const mapСenterLatitude = 35.6895000;
const mapСenterLongitude = 139.6917100;
const mainMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const adMarkerIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: mapСenterLatitude,
    lng: mapСenterLongitude,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

const loading = () => {
  map.on('load', () => {
    assignDisabledStatus(false);
  })
    .setView({
      lat: mapСenterLatitude,
      lng: mapСenterLongitude,
    }, 10);

  addressInput.value = `${mapСenterLatitude.toFixed(5)}, ${mapСenterLongitude.toFixed(5)} `;

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.addTo(map);
  mainMarker.on('move', (evt) => {
    let coordinates = evt.target.getLatLng();
    addressInput.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
  });
};

const createAdMarkers = (data) => {
  data.forEach((element) => {
    const ad = element;
    const marker = L.marker({
      lat: ad.location.x,
      lng: ad.location.y,
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

export {loading, createAdMarkers};
