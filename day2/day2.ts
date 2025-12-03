import fs from 'node:fs/promises';

const data = await fs.readFile('./input.txt', 'utf8');
const normalizedData = data.replace(/\r/g, '');
const ranges = normalizedData.split(",");
console.log(ranges);

function numberOfDigits(x: number) {
    return Math.floor(1+Math.log10(x));
}

function computeInvalidIDV1(value: number) {
            
    const digitCount = numberOfDigits(value);
    if ((digitCount % 2) === 1) return 0; // nombre avec nombre de digits impairs, ne peut pas être constitué de 2 répétitions d'un pattern

        const sizeMaxOfPattern = digitCount / 2;

        const [left, right] = [`${value}`.substring(0, sizeMaxOfPattern), `${value}`.substring(sizeMaxOfPattern)];
        if (left === right) {
            console.log("Invalid ID:", value);
            return value;
        }

        return 0;
}

function computeInvalidIDV2(value: number) {
            
    const digitCount = numberOfDigits(value);
        const sizeMaxOfPattern = Math.floor(digitCount / 2);

        for (let size = 1; size <= sizeMaxOfPattern; size++) {
            const splittingRegExp = new RegExp(`.{1,${size}}`, "g");
            const valueFragments = `${value}`.match(splittingRegExp);

            const setOfFragments = new Set(valueFragments);

            if (setOfFragments.size === 1) {
                console.log("Invalid ID:", value);
                return value;
            } 
        }
        

        return 0;
}

let totalSum = 0;

for (let range of ranges) {
    const [rangeStart, rangeEnd] = range.split("-", 2).map((elem: string) => {
        return parseInt(elem);
    });

    for (let value = rangeStart; value <= rangeEnd; value++) {

        totalSum += computeInvalidIDV2(value);


    }
    
    
    console.log("totalsum", totalSum);

}