"use strict";

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const data = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL);

const pStart = performance.now();

function getXCommonPerBitColumn(arr, column, most) {
    let zeros = 0;
    let ones = 0;
        
    for(let i = 0; i < arr.length; i++) {
        arr[i][column] === '0' ? zeros++ : ones++;
    }
    
    if(most) {
        return zeros > ones ? 1 : 0;
    } else {
        return zeros > ones ? 0 : 1;
    }
}

function calculate(arr, mostCommon) {
    let commonValuesPerBit = [];
    
    for(let i = 0; i < 12; i++) {
        let common = mostCommon ? getXCommonPerBitColumn(arr, i, true) : getXCommonPerBitColumn(arr, i, false);
        commonValuesPerBit.push({index: i, c: common});
    }

    let lcTmp = [];
    for(let i = 0; i < data.length; i++) {
        if(arr[i][0] == commonValuesPerBit[0].c) {
            lcTmp.push(arr[i]);
        }
    }

    let res = [];
    for(let j = 1; j < commonValuesPerBit.length; j++) {
        let cpyIn = [];
        for(let i = 0; i < lcTmp.length; i++) {
            if(mostCommon) {
                if(lcTmp[i][j] == getXCommonPerBitColumn(lcTmp, j, true)) {
                    cpyIn.push(lcTmp[i]);
                }
            } else {
                if(lcTmp[i][j] == getXCommonPerBitColumn(lcTmp, j, false)) {
                    cpyIn.push(lcTmp[i]);
                }
            }
        }

        if(cpyIn.length > 0) {
            lcTmp = cpyIn;
        } else {
            return res;
        }
        res = lcTmp[0];
    }

    return res;
}

function solution(arr) {
    return parseInt(calculate(arr, true), 2) *  parseInt(calculate(arr, false), 2);
}

let res = solution(data);

const pEnd = performance.now();

console.log(!res ? "No match" : "Result: " + res);
console.log(pEnd - pStart);