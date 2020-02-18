let chai  = require('chai');
let util = require('./../src/services/util');

const expect = chai.expect;

describe('util Services', () => {
    
    it('util removeMask should return a string with numeric characters only', (done) => {
        let clearLine = util.removeMask('23793.38128 60007.827136 95000.063305 9 75520000370000')
        expect(clearLine).to.be.equal('23793381286000782713695000063305975520000370000');
        clearLine = util.removeMask('85890000460-9 52460179160-5 60759305086-5 83148300001-0')
        expect(clearLine).to.be.equal('858900004609524601791605607593050865831483000010');
        done();
    });

});
