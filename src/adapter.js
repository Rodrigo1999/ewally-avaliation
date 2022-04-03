
const services = require('./services');

module.exports = {
    getCodeBar(req, res, next){
        let operations = services.useBarCode(req.params.digitable_line)
        res.send(operations)
    }
}