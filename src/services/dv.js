
function calcModule10(serial, factor) {
    let product = productCalcModule10(serial, factor);
    let fCalc = ((Math.ceil(product[0] / 10) * 10) - product[0]).toString();
    return fCalc;
}

function productCalcModule10(serial, factor) {
    let productSum = 0;
    serial.split('').map(v => {
        productSum += deepParser(Number(v)*factor);
        factor = factor == 2 ? 1 : 2;
    });
    return [productSum, factor];
}

function deepParser(value){
    let sum = 0;
    value.toString().split('').map(v => sum+=Number(v));
    if(sum<=9){
        return sum;
    }
    return deepParser(sum)
}

module.exports = {
    calcModule10: calcModule10,
    productCalcModule10: productCalcModule10,
    deepParser: deepParser
}