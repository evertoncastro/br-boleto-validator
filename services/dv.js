
class DV {
    static calcModule10(serial) {
        productSum = 0;

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