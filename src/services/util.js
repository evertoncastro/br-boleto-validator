
function removeMask(value){
    return value.replace(/( |\.|-)/g, '');
}

module.exports = {
    removeMask: removeMask
}