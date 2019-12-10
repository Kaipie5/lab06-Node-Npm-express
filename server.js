'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

app.get('/', (request, response) => {
    console.log("HELLLOOOOOOOO")
    response.send("Hello from the back side");
    // let city = request.query.data;

    // console.log(city);
    // let locationObj = searchLatToLong(city);
    // responseObj = {
    //     "search_query": city,
    //     "formatted_query": city,
    //     "latitude": locationObj.latitude,
    //     "longitude": locationObj.longitude
    // }
    // console.log(responseObj);

    // response.send(responseObj);
})

app.get('/location', (request, response) => {
    console.log(" ALSO HELLOOOOOO")
    let city = request.query.data;

    console.log(city);
    let responseObject = createResponseObj(city);
    
    console.log(responseObject);

    response.send(responseObject);
})

function createResponseObj(searchQuery) {
    const geoData = require('./data/geo.json');
    for (let i = 0; i < geoData.results.length; i++) {
        if (geoData.results[i].address_components[0].long_name.toLowerCase() === searchQuery.toLowerCase()) {
            
            let locationObj = new Location(searchQuery, geoData.results[i]);

            return locationObj
        }
    }
    console.log("FAILED TO FIND CITY")
    return {
        "search_query": "AHHHH",
        "formatted_query": "EVERYTHING IS BROKEN",
        "latitude": "PLEASE SEND HELP",
        "longitude": "PLS"
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

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})

function Location(city, geoDataResults){
    this.search_query = city;
    this.formatted_query = geoDataResults.formatted_address;
    this.latitude = geoDataResults.geometry.location.lat;
    this.longitude = geoDataResults.geometry.location.lng;
  }