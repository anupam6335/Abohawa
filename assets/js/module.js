"use strict";
export const weekDayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednessday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getDate = (dateUnix, timeZone) => {
  const date = new Date((dateUnix + timeZone) * 1000);
  const weekDayName = weekDayNames[date.getUTCDay()];
  const monthName = monthNames[date.getUTCMonth()];

  return `${weekDayName} ${date.getUTCDate()}, ${monthName}`;
};
// ⬆️⬆️⬆️⬆️⬆️⬆️⬆️
// dateUnix - dateUnix uinx date in seconds
// timezone - timezone shif from UTC in seconds
// return stirng formate like "Monday 12, Jun"

export const getTime = (timeUnix, timeZone) => {
  const date = new Date((timeUnix + timeZone) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  return `${hours % 12 || 12}:${minutes} ${period}`;
};

export const getHours = (timeUnix, timeZone) => {
  const date = new Date((timeUnix + timeZone) * 1000);
  const hours = date.getUTCHours();
  const period = hours >= 12 ? "PM" : "AM";

  return `${hours % 12 || 12} ${period}`;
};

// mps meter per second
//  kmh kilometer per hour
export const mps_to_kmh = mps => {
    const mph = mps * 3600;
    return mph / 1000;
}

// aqi air quality index
export const aqiText = {
    1: {
        level: "Good",
        message: 'Air quality is considered satisfactory, and air polution poses little or no risk',
    },
    2: {
        level: "Fair",
        message: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution',
    },
    3: {
        level: "Moderate",
        message: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.',
    },
    4: {
        level: "Poor",
        message: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects',
    },
    5: {
        level: "Good",
        message: 'Health warnings of emergency conditions. The entire population is more likely to be affected.',
    }
}

