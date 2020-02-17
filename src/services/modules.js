
function calcModule10(serial, factor) {
    let product = productCalcModule10(serial, factor);
    return ((Math.ceil(product[0] / 10) * 10) - product[0]).toString();
}

function productCalcModule10(serial, factor) {
    // TODO: refactor
    let productSum = 0;
    serial.split('').map(v => {
        productSum += deepParser(Number(v)*factor);
        factor = factor == 2 ? 1 : 2;
    });
    return [productSum, factor];
}

function deepParser(value){
    // Even that the value will never be higher than 18 
    // this function will convert every number > 18 to a singe character
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