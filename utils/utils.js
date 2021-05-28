exports.getUnixTimeNow = () => Date.now();

exports.getNow = () => {
    let date = new Date(Date.now());
    let now = date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
    return now;
}

exports.checkCity = () => {
    if (process.argv[3]===undefined) {
        console.log("location not defined".red);
        process.exit(0);
    }
};

exports.checkHours = () => {
    if (process.argv[4]===undefined) {
        console.log("hours not defined".red);
        process.exit(0);
    }
};

exports.criticalError = (error, exit) => {
    console.error(error);
    exit && process.exit(1);
};