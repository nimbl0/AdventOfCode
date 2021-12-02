"use strict";

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const data = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split('\n');

const pStart = performance.now();

function solution(arr) {
    let depth = 0;
    let forward = 0;
    let aim = 0;

    arr.forEach(element => {
        let splitted = element.split(" ");
        if(splitted[0] == "forward") {
            forward += Number(splitted[1]);
            if(aim > 0) {
                depth += Number(splitted[1]) * aim;
            }
        } else if(splitted[0] == "up") {
            aim -= Number(splitted[1]);
        } else if(splitted[0] == "down") {
            aim += Number(splitted[1]);
        }
    });

    return depth * forward;
}

let res = solution(data);

const pEnd = performance.now();

console.log(!res ? "No match" : "Result: " + res);
console.log(pEnd - pStart);