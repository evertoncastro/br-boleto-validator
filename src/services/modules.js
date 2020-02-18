
function calcModule10(serial) {
    serial = serial.split('').reverse();
    const sum = serial.reduce((total, value, index) => {
        let prod = Number(value) * (((index + 1) % 2) + 1);
        prod = (prod > 9 ? Math.trunc(prod / 10) + (prod % 10) : prod);
        return total + prod;
    }, 0);
    return ((Math.ceil(sum / 10) * 10) - sum).toString();
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
    bankModule11: bankModule11
}