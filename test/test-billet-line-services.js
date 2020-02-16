var expect  = require('chai').expect;
var billetLine = require('./../src/services/billetLine');


it('SplitBilletLine should return an object', function(){
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
});