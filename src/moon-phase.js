"use strict";

const fetch = require ('node-fetch');
const Table = require('cli-table3');
const utils = require("../utils/utils");
const CLI = require ('clui'), Spinner = CLI.Spinner;

const url = `https://api.farmsense.net/v1/moonphases/?d=${utils.getUnixTimeNow()}`;
const date = utils.getNow();

const status = response => {
    if (response.status==200) {
        return Promise.resolve(response);
    }
    return Promise.reject(new Error(response.statusText));
}

const json = response => response.json();

async function moonPhase() {
    fetch(url)
    .then(status)
    .then(json)
    .then(data => {

        const table = new Table({
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗', 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝', 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼', 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
            head: ['dateTime','moon type','moon phase','moon age','illumination'],
            style: {
                head: ['yellow']
            },
            colwidths: [20, 30, 25, 20, 5],
            wordWrap: true
        });
    
        table.push([
            date,
            data[0].Moon[0],
            data[0].Phase,
            data[0].Age,
            data[0].Illumination
        ]);

        let countdown = new Spinner('observing the Moon\'s characteristics: phase, age, illumination', ['◜','◠','◝','◞','◡','◟']);
        countdown.start();

        var counter = 3;

        setInterval(function () {
            counter--;

            if (counter === 0) {
                console.log('\n' + table.toString() + '\n');
                console.log("N.B.: the Moon takes 29.53 days to orbit the Earth and go through the lunar cycle of all 8 Moon phases".bold);
                process.exit(0);
            }
        }, 1000);
        
    })

    .catch(error => {
        console.log('request failed'.red, error)
    })
} 

module.exports = {
    moonPhase
};