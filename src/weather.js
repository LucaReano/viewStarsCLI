"use strict";

const fetch = require ('node-fetch');
const Table = require('cli-table3');
const utils = require("../utils/utils");

const owm_key = process.env.OPEN_WEATHER_MAP_API_KEY;

const weatherNow = async (city) => {

    utils.checkCity();

    try {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${owm_key}`);
        const data = await res.json();

        const date = utils.getNow();
        const sunsetTime = new Date(data.sys.sunset*1000);

        const coordinates = data.coord;

        const table = new Table({
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗', 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝', 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼', 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
            head: ['location','dateTime','sunsetTime','weather','temperature','clouds'],
            style: {
                head: ['yellow']
            },
            colwidths: [20, 25, 20, 7, 5],
            wordWrap: true
        });

        table.push([
            data.name,
            date,
            sunsetTime.toLocaleDateString("en-GB") + " " + sunsetTime.toLocaleTimeString("en-GB"),
            data.weather[0].description,
            data.main.temp + "°C",
            data.clouds.all + "%"
        ]);
        
        console.log("check the weather in " + city);
        console.log(table.toString());

    } catch (error) {
        console.log(error);
    }
};

const weatherForecast = async (city, hours) => {

    utils.checkCity();
    utils.checkHours();

    try {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${owm_key}`);
        const data = await res.json();

        const tableForecast = new Table({
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗', 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝', 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼', 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
            head: ['location','dateTime','hoursFromNow','weather','temperature','clouds'],
            style: {
                head: ['yellow']
            },
            colwidths: [20, 25, 15, 20, 7, 5],
            wordWrap: true
        });

        tableForecast.push([
            data.city.name,
            data.list[hours].dt_txt,
            hours*3 + " hours",
            data.list[hours].weather[0].description,
            data.list[hours].main.temp + "°C",
            data.list[hours].clouds.all + "%"
        ]);

        console.log("check weather forecast in " + city + " beetween " + hours*3 + " hours from now");
        console.log(tableForecast.toString());

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    weatherNow,
    weatherForecast
};