var chai  = require('chai');
var spies = require('chai-spies');
const billetLine = require('./../src/services/bankBilletLine');
const modules = require('./../src/services/modules');
const errors = require('./../src/errors');

chai.use(spies);
const expect = chai.expect;
const sandbox = chai.spy.sandbox();

describe('billetLine Services', () => {
    beforeEach(() => {
        sandbox.on(modules, ['calcModule10']);
    });

    afterEach(() => {
        sandbox.restore(); // restores original methods on `array`
    })

    it('SplitBilletLine should return an object', function(done){
        let line = '00190500954014481606906809350314337370000000100';
        expect(billetLine.splitBilletLine(line)).to.deep.equal({
            field1: '001905009',
            field1DV: '5',
            field2: '4014481606',
            field2DV: '9',
            field3: '0680935031',
            field3DV: '4',
            field4: '3',
            field5: '37370000000100'
        });
        done();
    });

    it('infoFromField1 should return a valid object', function(done){
        let info = billetLine.infoFromField1('001905009', '5');
        expect(info).to.deep.equal({
            fi: '001',
            curCode: '9',
            pos20to24: '05009',
            dv: '5' 
        });
        done();
    });

    it('infoFromField2 should return a valid object', function(done){
        let info = billetLine.infoFromField2('4014481606', '9');
        expect(info).to.deep.equal({
            pos25to34: '4014481606',
            dv: '9' 
        });
        done();
    });

    it('infoFromField3 should return a valid object', function(done){
        let info = billetLine.infoFromField3('0680935031', '4');
        expect(info).to.deep.equal({
            pos35to44: '0680935031',
            dv: '4' 
        });
        done();
    });

    it('infoFromField5 should return a valid object', function(done){
        let info = billetLine.infoFromField5('37370000000100');
        expect(info).to.deep.equal({
            dueDateFactor: '3737',
            value: '0000000100'
        });
        done();
    });

    it('check1dv should call calcModule10 with right params', function(done){
        billetLine.checkField1DV('001905009', '5')
        expect(modules.calcModule10).to.have.been.called.with.exactly('001905009');
        done();
    });

    it('check1dv should call return true for a valid dv', function(done){
        let valid = billetLine.checkField1DV('001905009', '5')
        expect(valid).to.be.true;
        done();
    });

    it('check1dv should throw business exception for invalid dv', function(done){
        expect(() => billetLine.checkField1DV('001905009', '6')).to.throw(errors.BusinessException(), 'INVALID DV FOR BLOCK 1');
        done();
    });

    it('check2dv should call calcModule10 with right params', function(done){
        billetLine.checkField2DV('4014481606', '9')
        expect(modules.calcModule10).to.have.been.called.with.exactly('4014481606');
        done();
    });

    it('check2dv should return true for valid dv', function(done){
        let valid = billetLine.checkField2DV('4014481606', '9')
        expect(valid).to.be.true;
        done();
    });

    it('check2dv should throw business exception for invalid dv', function(done){
        expect(() => billetLine.checkField2DV('4014481606', '8')).to.throw(errors.BusinessException(), 'INVALID DV FOR BLOCK 2');
        done();
    });

    it('check3dv should call calcModule10 with right params', function(done){
        billetLine.checkField3DV('0680935031', '4')
        expect(modules.calcModule10).to.have.been.called.with.exactly('0680935031');
        done();
    });

    it('check3dv should return true for valid dv', function(done){
        let valid = billetLine.checkField3DV('0680935031', '4')
        expect(valid).to.be.true;
        done();
    });

    it('check3dv should return false for valid dv', function(done){
        expect(() => billetLine.checkField3DV('0680935031', '5')).to.throw(errors.BusinessException(), 'INVALID DV FOR BLOCK 3');
        done();
    });
});

