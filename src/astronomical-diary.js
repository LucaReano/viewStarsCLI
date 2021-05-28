"use strict";

const fs = require('fs');
const rl = require('readline');
const utils = require("../utils/utils");

const now = utils.getNow();
let fileName = "./file/" + process.argv[3] + ".txt";
    
function createDiary(file) {
    if (file!=undefined)
    fileName = "./file/" + file;

    fs.open(fileName, "r", function(error) {
    //if diary not found create new diary
        if(error) {
            fs.writeFile(fileName, '', function(error) {
            if(error) {
                console.log(error);
            }

            //write title in the new diary
            fs.appendFileSync(fileName, "Astronomical diary: " + process.argv[3] + '\n', function(error) {
                if (error) throw error;
            });

            console.log("diary created successfully".green);
            process.exit(0);
            });
        } else {
            console.log("diary already exists!".red);
            process.exit(0);
        }
    });
}

function getDiaryName(){
    let diaryName = fs.readdirSync('./file').toString();
    return diaryName;
}

//call the function to get file name
let dn = getDiaryName();
let path = "";

//if file name is not empty it create the path
if (dn!="")
    path = './file/' + dn;

const exist = fs.existsSync(path);

function writeDiary() {
    try {
        if (exist) {
            fs.appendFile(path, '\n' + now + '\n', function(error) {
                if (error) throw error;
            });
        
            console.log("waiting to write in your diary (type ctrl+c or ctrl+d to stop)".yellow);
        
            let input = [];
            let i = rl.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            
            i.prompt();
            i.on('line', function(text) {
                input.push(text);
        
                let content = input.toString() + '\n';
        
                fs.appendFile(path, content, function(error) {
                    if (error) throw error;
                    console.log('written in your diary'.green);
                    //clear what is inside input
                    input = [];
                    });
            });
        
            i.on('close', function() {
                console.log("closing your diary".yellow)
                process.exit(0);
            });

        } else 
        console.log("error, you need to make a new diary first!".red);
    } catch(error) {
        throw error;
    }
}

function readDiary() {
    try {
        if (exist) {
            let fr = fs.readFileSync(path, 'utf8', function(error) {
                if(error) throw error;
             });

            let txt = fr.split(/\r?\n/);
            txt.forEach((line) => {console.log(line)})
        } else 
            console.log("error, you need to make a new diary first!".red);
    } catch(error) {
        throw error;
    }
}

function deleteDiary() {

    try {
        if (path) {

            let q = rl.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            q.question("Are you sure you want to delete " + dn + "?", function (answer) {
                if(answer=="yes"||answer=="y"||answer=="s"||answer=="si") {
                    fs.unlinkSync(path);
                    console.log("diary removed successfully".green);
                } else {
                    console.log("delete process interrupted".yellow);
                }
            q.close();
            });
        } else 
            console.log("diary not exists".red);
    } catch(error) {
        console.error(error)
    }
}
 
module.exports = {
    createDiary,
    getDiaryName,
    writeDiary,
    readDiary,
    deleteDiary
};