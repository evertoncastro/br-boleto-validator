
function BusinessException(message) {
    this.message = message;
    this.name = "BusinessException";
}


module.exports = {
    BusinessException: BusinessException
}