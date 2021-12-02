"use strict";

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const data = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL).map(e => e.split(" "));

const pStart = performance.now();

function solution(arr) {
    let depth = 0;
    let forward = 0;

    arr.forEach(element => {
            if(element[0] === "forward") forward += Number(element[1]);
            else if(element[0] === "up") depth -= Number(element[1]);
            else if(element[0] === "down") depth += Number(element[1]);
    });

    return depth * forward;
}

let res = solution(data);

const pEnd = performance.now();

console.log(!res ? "No match" : "Result: " + res);
console.log(pEnd - pStart);