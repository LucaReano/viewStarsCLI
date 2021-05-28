# starViewCLI

## Description

*"When you see the stars you are looking into the past. Because light takes time to travel and stars are many light years away from us you could be seeing a star that doesn’t even exist anymore."* :star2:

starViewCLI is a simple line application that provide information about stars visibility in a moment that you decide. You can also create an astronomical diary (a blank file with a title and current datetime) where write all of your notes and read them.

It was created to determine the best stars observing time. In fact, stars are more visible if:
- is night (of course), 
- weather is clear and cloudiness is low, 
- Moon is not full or better is a new Moon :new_moon:
- there's no light pollution (or is little at least).

## Installation

`npm install --save starViewCLI`

## Usage

`npm start`
`viewStars`

to running the project and view all command options

## Commands

type the full name of command or the shorter one in the terminal

//to see current weather in a location specified by city name
`weatherNow | wn (cityName)`

//to see forecast weather every 3 hours in a location specified by city name
`weatherForecast | wf (cityName) (hours)`

//to see the moon phase and its `luminosity moonPhase | mp`

//to know how much is light pollution in a location specified by city name
`lightPollution | lp (cityName)`

//to create your astronomical diary
`createDiary | cd (diaryName)`

//to write your notes in a astronomical diary
`writeDiary | wd`

//to read your notes written in the astronomical diary
`readDiary | rd`

## Author

* Luca Reano - [@LucaReano](https://github.com/LucaReano)

### License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)

### Keywords

command line interface, CLI, console, commander, stars, weather, moon, light pollution, diary