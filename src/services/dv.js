
class DV {

    static calcModule10(serial) {
        let pCalc = this.productCalc(serial);
        console.log(pCalc);
        let fCalc = ((Math.ceil(pCalc / 10) * 10) - pCalc % 10).toString();
        return fCalc;
    }

    static productCalcModule10(serial) {
        let productSum = 0;
        let factor = 2;
        serial.split('').map(v => {
            productSum += this.deepParser(Number(v)*factor);
            factor = factor == 2 ? 1 : 2;
        });
        return [productSum, factor];
    }
    
    static deepParser(value){
        let sum = 0;
        value.toString().split('').map(v => sum+=Number(v));
        if(sum<=9){
            return sum;
        }
        return this.deepParser(sum)
    }
}

module.exports = DV;