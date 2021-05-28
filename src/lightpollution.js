"use strict";

const fetch = require ('node-fetch');
const openURL = require('open');
const utils = require("../utils/utils");
const CLI = require ('clui'), Spinner = CLI.Spinner;

const owm_key = process.env.OPEN_WEATHER_MAP_API_KEY;

const lightPollution = async (city) => {

    utils.checkCity();
    
    try {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${owm_key}`);
        const data = await res.json();

        const coordinates = data.coord;
        const lat = coordinates.lat;
        const lon = coordinates.lon;

        console.log("you will be redirected at lat",lat,"and lon",lon,"on the light pollution map \n");

        let countdown = new Spinner('Redirected in 5 seconds...', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
        countdown.start();

        var counter = 5;

        await new Promise(resolve => setInterval(function () {
            counter--;
            countdown.message('Redirected in ' + counter + ' seconds...');

            if (counter === 0)
                redirecting();
            
            if (counter === -2) {
                console.log('Redirected successfully!'.green);
                process.exit(0);
            }
        }, 1000));
        
        async function redirecting () {
            openURL(`https://www.lightpollutionmap.info/#zoom=12.50&lat=${lat}&lon=${lon}&layers=B0FFFFFFTFFFFFFFFFF`);
            countdown.stop();
        };
        
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    lightPollution
};