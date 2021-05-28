#!/usr/bin/env node

require('dotenv').config();

const figlet = require('figlet');
const colors = require('colors');
const program = require('commander');
const {default: fetch} = require('node-fetch');

const {weatherNow, weatherForecast} = require('../src/weather');
const {lightPollution} = require('../src/lightpollution');
const {moonPhase} = require('../src/moon-phase');
const {createDiary, writeDiary, readDiary, deleteDiary} = require('../src/astronomical-diary');
const utils = require("../utils/utils");

console.log('\n'.repeat(999));

console.log(
    colors.yellow(
        figlet.textSync('viewStarsCLI', {
        font: 'Doom',
        horizontalLayout: 'full'
       })
    )
);

program
.version('0.0.1')
.description('Command line application to know if stars are visible'.yellow.bold)

program
.command("weatherNow [cityName]") //<cityName>
.alias('wn')
.description('to see current weather in a location specified by city name')
.action(cityName => weatherNow(cityName))

program
.command("weatherForecast [cityName] [hours]") //<cityName> <hours>
.alias('wf')
.description('to see forecast weather every 3 hours in a location specified by city name')
.action((cityName, hours) => weatherForecast(cityName, hours))

program
.command("moonPhase")
.alias ('mp')
.description('to see the moon phase and its luminosity')
.action(moonPhase)

program
.command("lightPollution [cityName]") //<cityName>
.alias('lp')
.description('to know how much is light pollution in a location specified by city name')
.action(cityName => lightPollution(cityName))

program
.command("createDiary <diaryName>")
.alias('cd')
.description('to create your astronomical diary')
.action(diaryName => createDiary(diaryName))

program
.command("writeDiary")
.alias('wd')
.description('to write your notes in a astronomical diary')
.action(writeDiary)

program
.command("readDiary")
.alias('rd')
.description('to read your notes written in the astronomical diary')
.action(readDiary)

program
.command("deleteDiary")
.alias('dd')
.description('to delete your diary')
.action(deleteDiary)

program.on('command:*', function () {
    utils.criticalError("command not recognised\n".red, true);
});

program.parse(process.argv);