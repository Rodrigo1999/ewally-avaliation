const utils = require('./utils');

module.exports = {
    useBarCode(digitableLine){
        digitableLine = Array.from(digitableLine).map(Number)
        const data = utils.generatersAndPositions(digitableLine)
        
        const result = {
            size: data.size,
            getDigitsByFieldOrBar(field){
                if(field === undefined) return data.barCodeWithoutGeneralCheckDigit
                field = field - 1
                const barCodeSnippet = digitableLine.slice(field == 0 ? 0 : (data.checkDigitsPosition[field-1] + 1), data.checkDigitsPosition[field])
                return barCodeSnippet
            },
            getSolution(field, checkDigit){
                const checkDigitExpected = (field ? data.checkDigits[field-1] : data.barCode[data.generalCheckDigitPosition])
                const solution = {isValid: true, result: checkDigit, checkDigitExpected}
                if(checkDigit !== checkDigitExpected) solution.isValid = false
                
                return solution
            },
            validFieldOrBar(field){
                const IDValueOrReference = data.barCode[2]
                const isIDValueOrReference = [6,7].includes(IDValueOrReference)

                if(data.size == 47 || isIDValueOrReference){
                    if(!isIDValueOrReference) return result.validCheckDigitModuleEleven(field)
                    return result.validCheckDigitModuleTen(field)
                }

                return result.validCheckDigitModuleEleven(field)
            },
            validCheckDigitModuleTen(field){
                const arrayReverse = result.getDigitsByFieldOrBar(field).reverse()

                let sumDigits = arrayReverse.reduce((amount, digit, i) => {

                    let multiplication = (digit * (i % 2 ? 1 : 2))
                    if (multiplication > 9) {
                        multiplication = String(multiplication)
                        multiplication = Number(multiplication[0]) + Number(multiplication[1])
                    }

                    return amount + multiplication

                }, 0)

                const nextTen = Math.ceil(sumDigits / 10) * 10;
                let checkDigit = nextTen - sumDigits

                return result.getSolution(field, checkDigit)
            },
            validCheckDigitModuleEleven(field){
                const arrayReverse = result.getDigitsByFieldOrBar(field).reverse()

                const divider = 11
                let count = 2;
                
                let sumDigits = arrayReverse.reduce((sum, digit) => {
                    if(count > 9) count = 2
                    return sum + (digit * count++)
                }, 0)
            
                
                let checkDigit = divider - (sumDigits % divider)
                if([0,10,11].includes(checkDigit)) checkDigit = 1
                if(data.size == 48 && field && [0,1].includes(checkDigit)) checkDigit = 0

                return result.getSolution(field, checkDigit)
            },

            // ---------------------------------------RESULT TO API----------------------------------------------------------------------
            getBarCode: () => data.barCode.join(''),
            getExpirationDate(){
                let date;
                if(data.size == 48){
                    date = data.date
                    date = [date.slice(0, 4), date.slice(4, 6), date.slice(6, 8)] //YYYYMMDD
                    date = new Date(date.join('/').replaceAll(',', ''))
                    if(!utils.isValidDate(date)) return 'No Date'
                    
                }else{
                    date = utils.baseDate()
                    date.setDate(date.getDate() + parseInt(data.days.join('')));
                }

                date = date.toISOString()
                date = date.substring(0, date.indexOf('T'))
                
                return date

            },
            getAmount(){
                const amount = parseInt(data.amount.join('')) / 100
                return amount.toLocaleString('en-US', {minimumFractionDigits: 2})
            }
        }
        return result
    }
}