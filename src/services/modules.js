
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
    const dv = 11 - mod;
    if (dv === 0 || dv === 10 || dv === 11) return '1';
    return dv.toString();
}

function taxModule10(barCode){
    const value = barCode.split('').reverse();
    const sum = value.reduce((n, current, index) => {
        const prod = Number(current) * (((index + 1) % 2) + 1);
        return n + prod;
    }, 0);
    let mod = 10 - (sum % 10);
    return mod.toString();
}

function taxModule11(barCode){
    const value = barCode.split('').reverse();
    let factor = 2;
    const sum = value.reduce((n, current) => {
        const prod = Number(current) * factor;
        factor = factor === 9 ? 2 : factor + 1;
        return n + prod;
    }, 0);
    let mod = sum % 11;
    if(mod === 1){
        mod = 0;
    }
    return mod.toString();
}

module.exports = {
    calcModule10: calcModule10,
    bankModule11: bankModule11,
    taxModule11: taxModule11,
    taxModule10: taxModule10
}