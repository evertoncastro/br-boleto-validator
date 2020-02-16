
function splitBilletLine(line){
    return {
        field1: line.substr(0, 9),
        field1DV: line.substr(9, 1),
        field2: line.substr(10, 10),
        field2DV: line.substr(20, 1),
        field3: line.substr(21, 10),
        field3DV: line.substr(31, 1),
        field4: line.substr(32, 1),
        field5: line.substr(33)
    }
}

function checkField1DV(){

}

function checkField2DV(){

}

function checkField3DV(){

}


module.exports = {
    splitBilletLine: splitBilletLine
}