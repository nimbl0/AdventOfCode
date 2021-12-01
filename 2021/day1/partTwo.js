"use strict";

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

let contentArr = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL).map(Number);

const pStart = performance.now();

function solution(arr) {
    let lastSum = 0;
    let count = 0;
    
    for(let i = 0; i < arr.length; i++) {
        let threeSum = arr[i] + arr[i+1] + arr[i+2];

        if(lastSum <= 0) lastSum = threeSum;

        if(threeSum > lastSum) {
            count++;
        }
        
        lastSum = threeSum;
    }

    return count;
}

let res = solution(contentArr);

const pEnd = performance.now();

console.log(!res ? "No match" : "Result: " + res);
console.log(pEnd - pStart);