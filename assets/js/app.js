"use strict";
import { fetchData, URL } from "./api.js";
import * as module from "./module.js";

// add event listener multiple elements like click mouse hover

const addEventOnElements = function (elements, eventType, callback) {
  for (const element of elements) element.addEventListener(eventType, callback);
};

const searchView = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const toggleSearch = () => searchView.classList.toggle("active");
addEventOnElements(searchTogglers, "click", toggleSearch);

// serach integration

const searchField = document.querySelector("[data-search-field]");
const searchResult = document.querySelector("[data-search-result]");

let searchTimeout = null;
const searchTimeoutDuration = 500;

// search in search bar

searchField.addEventListener("input", function () {
  searchTimeout ?? clearTimeout(searchTimeout);
  if (!searchField.value) {
    searchResult.classList.remove("active");
    searchResult.innerHTML = "";
    searchField.classList.remove("searching");
  } else {
    searchField.classList.add("searching");
  }
  if (searchField.value) {
    searchTimeout = setTimeout(() => {
        fetchData(URL.geo(searchField.value), function(locations) {
            searchField.classList.remove("searching");
            searchResult.classList.add('active');
            searchResult.innerHTML = `<ul class="view-list" data-search-list></ul>`;
          const items = [];

          for(const {name, lat, lon, country, state} of locations) {
            const searchItem = document.createElement('li');
            searchItem.classList.add('view-item');

            searchItem.innerHTML = `
            <span class="m-icon">location_on</span>
            <div>
                <p class="item-title">${name}</p>
                <p class="label-2 item-subtitle">${state || ""} ${country}</p>
            </div>

            <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state"  aria-label="${name} weather" data-search-toggler>
            </a>
            `;

            searchResult.querySelector("[data-search-list]").appendChild(searchItem);
            items.push(searchItem.querySelector("[data-search-toggler]"));
          }
        })
    },searchTimeoutDuration)
  }
});

const container = document.querySelector("[data-container]");
const loading = document.querySelector("[data-loading]");
const currentLocationBtn = document.querySelector("[data-current-location-btn]");
const errorContent = document.querySelector("[data-error-content]");

// render all weather data in html page
export const updateWeather = (lat, lon) => {

    loading.style.display = "grid";
    container.style.overflowY = "hidden";
    container.classList.contains("fade-in") ?? container.classList.remove("fade-in");
    errorContent.style.display = "none";

    const currentWeatherSection = document.querySelector("[data-current-weather]");
    const highlightSection = document.querySelector("[data-highlights]");
    const hourlySection = document.querySelector("[data-hourly-forecast]");
    const forecastSection = document.querySelector("[data-5-day-forecast]");

    currentWeatherSection.innerHTML = "";
    highlightSection.innerHTML = "";
    hourlySection.innerHTML = "";
    forecastSection.innerHTML = "";

    if(window.location.hash === "#/current-location") {
        currentLocationBtn.setAttribute("disabled", "");
    } else {
        currentLocationBtn.removeAttribute("disabled")
    }

    // current weather section
    fetchData(URL.currentWeather(lat, lon), function (currentWeather) {
        
    })

}

