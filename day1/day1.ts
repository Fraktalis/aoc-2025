

import fs from 'node:fs/promises';

const data = await fs.readFile('./input.txt', 'utf8');
const normalizedData = data.replace(/\r/g, '');

let totalZeroCount = 0;
const instructions = normalizedData.split("\n");
let dial = 50;
let debug = [];
console.log("The dial starts by pointing at 50.");
for (let instruction of instructions) {
    totalZeroCount += computeZerosOfDialRotationV2(instruction);
};

console.log(`Count of zeros: ${totalZeroCount}`);




function computeZerosOfDialRotationV2(instruction: string) {
    const multiplicity = instruction.at(0) === "L" ? -1 : 1;
    const clicksValue = instruction.substring(1);
    let zeroCount = 0;
    let clicks = parseInt(clicksValue);

    if (clicks > 100) {
        zeroCount += Math.floor((clicks) / 100);
        clicks %= 100;
    }
    let isZero = dial === 0;
    dial += multiplicity * clicks;

    if (dial > 99) {
        dial %= 100;
        zeroCount++;
    } else {

        if (!isZero && dial <= 0) {
            zeroCount++;
        }

        if (dial < 0) dial += 100;
    }

    return zeroCount;
}

