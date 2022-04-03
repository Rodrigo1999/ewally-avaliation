const controllers = require('./controllers')
const utils = require('./utils')

module.exports = {
    useBarCode(digitableLine){
        let errors = {
            E001: () => 'Linha digitável inválida',
            E00F: (field) => `Dígito verificador do campo ${field} é inválido`,
            E006: (result, expected) => `Dígito verificador do código de barra está incorredo, retornou ${expected}, esperava ${result}`,
        }

        if(digitableLine.match(/\D+/g) || ![47, 48].includes(digitableLine.length)) utils.emitCustomError('E001', errors)

        const {
            size,
            validFieldOrBar,
            getAmount,
            getBarCode,
            getExpirationDate
        } = controllers.useBarCode(digitableLine)
        

        if(!validFieldOrBar(1).isValid) utils.emitCustomError('E002', errors['E00F'](1))
        if(!validFieldOrBar(2).isValid) utils.emitCustomError('E003', errors['E00F'](2))
        if(!validFieldOrBar(3).isValid) utils.emitCustomError('E004', errors['E00F'](3))
        if(size == 48 && !validFieldOrBar(4).isValid) utils.emitCustomError('E005', errors['E00F'](4))

        const validBarCode = validFieldOrBar()
        if(!validBarCode.isValid) utils.emitCustomError('E006', errors['E006'](validBarCode.result, validBarCode.checkDigitExpected))

        return {
            barCode: getBarCode(),
            amount: getAmount(),
            getExpirationDate: getExpirationDate(),
        }
    }
}