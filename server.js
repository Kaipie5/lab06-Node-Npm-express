'use strict';

const express = require('express');

const app = express();

require('dotenv').config();

app.use(express.static('./public'));

const port = process.env.PORT;

//app.get('/', (request, response) => {
//    response.send("Hello from the back side");
//})

app.listen(port, () => {
    console.log(`listening on ${port}`);
})