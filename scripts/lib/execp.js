'use strict';
const exec = require('child_process').exec;

module.exports = function execp(command) {
    return new Promise((resolve, reject) => {
        exec(command, function (err, stdout, stderr) {
            if (err) {
                console.log(stderr);
                reject(err);
            } else {
                resolve(stdout);
            }
        })
    })
}
