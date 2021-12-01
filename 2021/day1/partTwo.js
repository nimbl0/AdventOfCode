"use strict";

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

let contentArr = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL).map(Number);

const pStart = performance.now();

function solution(arr) {
    let largerMeasurements = 0;
    let threeMeasurementSums = [];

    for(let i = 0; i < arr.length; i++) {
        let nums = [arr[i], arr[i+1], arr[i+2]];
        let threeSum = nums[0] + nums[1] + nums[2];
        threeMeasurementSums.push(threeSum);
    }

    for(let i = 0; i < threeMeasurementSums.length; i++) {
        if(i == 0) continue;
        if(threeMeasurementSums[i] > threeMeasurementSums[i-1]) {
            largerMeasurements++;
        }
    }

    return largerMeasurements;
}

let res = solution(contentArr);

const pEnd = performance.now();

console.log(!res ? "No match" : "Result: " + res);
console.log(pEnd - pStart);