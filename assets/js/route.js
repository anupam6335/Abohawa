"use strict";

import { updateWeather, error404 } from "./app.js";
const defaultLocation = "#/weather?lat=22.572645&lon=88.363892"; // Kolkata, West Bengal
const currentLocation = function () {
    window.navigator.geolocation.getCurrentPosition (res => {
        const { latitude, longitude} = res.coords;

        updateWeather(`lat=${latitude}`, `lon=${longitude}`);
    }, err => {
        window.location.hash = defaultLocation;
    })
};
const searchedLocation = (query) => updateWeather(...query.split("&"));

const routes = new Map([
  ["/current-location", currentLocation],
  ["/weather", searchedLocation],
]);

const checkHash = function () {
    const requestURL = window.location.hash.slice(1);
    const [route, qurey] = requestURL.includes ? requestURL.split("?") : [requestURL];

    routes.get(route) ? routes.get(route)(qurey) : error404();
}

window.addEventListener('hashchange', checkHash);
window.addEventListener('load', function() {
    if(!window.location.hash) {
        window.location.hash = "#/current-location";
    } else {
        checkHash();
    }
})
