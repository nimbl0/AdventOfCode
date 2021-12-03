"use strict";

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const data = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL);

const pStart = performance.now();

function solution(arr) {
    let gammaRate = "";
    let epsilonRate = "";

    for(let j = 0; j < 12; j++) {
        let zeros = 0;
        let ones = 0;
        
        for(let i = 0; i < 1000; i++) {
            arr[i][j] === '0' ? zeros++ : ones++;
        }

        gammaRate += zeros > ones ? "0" : "1";
        epsilonRate += zeros > ones ? "1" : "0";
    }

    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

let res = solution(data);

const pEnd = performance.now();

console.log(!res ? "No match" : "Result: " + res);
console.log(pEnd - pStart);