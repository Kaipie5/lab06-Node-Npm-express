'use strict';

const express = require('express');

const app = express();

require('dotenv').config();

app.use(express.static('./public'));

const port = process.env.PORT;

app.get('/location', (request, response) => {
    let city = request.query.data;

    console.log(city);
    let locationObj = searchLatToLong(city);
    responseObj = {
        "search_query": city,
        "formatted_query": city,
        "latitude": locationObj.latitude,
        "longitude": locationObj.longitude
    }
    console.log(responseObj);

    response.send(responseObj);
})

searchLatToLong = function(searchQuery) {
    const geoData = require('./data/geo.json');

    for (let i = 0; i < geoData.results; i++) {
        if (geoData.results[i] === searchQuery) {
            return geoData.results[i].geometry.location
        }
    }
    // const geoDataResults = geoData.results[0];

    // const locationObj = new Location(city, geoDataResults);
    // const locationObj = {
    //   "search_query": city,
    //   "formatted_query": geoDataResults.formatted_address,
    //   "latitude": geoDataResults.geometry.location.lat,
    //   "longitude": geoDataResults.geometry.location.lng
    // }
}

app.listen(port, () => {
    console.log(`listening on ${port}`);
})