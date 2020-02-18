
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

function bankModule11(barCode){
    const value = barCode.split('').reverse();
    let factor = 2;
    const sum = value.reduce((n, current) => {
        const prod = Number(current) * factor;
        factor = factor === 9 ? 2 : factor + 1;
        return n + prod;
    }, 0);
    const mod = sum % 11;
    const DV = 11 - mod;
    if (DV === 0 || DV === 10 || DV === 11) return '1';
    return DV.toString();
}

module.exports = {
    calcModule10: calcModule10,
    productCalcModule10: productCalcModule10,
    deepParser: deepParser,
    bankModule11: bankModule11
}