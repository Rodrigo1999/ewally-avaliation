module.exports = {
    baseDate: () => new Date('1997/10/07'),
    isValidDate(date){
        return date instanceof Date && !isNaN(date.valueOf())
    },
    emitCustomError(name, message){
        if(name && !message) {
            message = name
            name = undefined
        }
        if(typeof message == 'object') message = message[name]()
        let error = new Error(message)
        if(name) error.name = name
        throw error
    },
    generatersAndPositions(digitableLine){
        const size = digitableLine.length

        const generatersAndPositions = {
            47(){
                let barCode = digitableLine.slice(0, 4)
                .concat(digitableLine[32])
                .concat(digitableLine.slice(33, 47))
                .concat(digitableLine.slice(4, 9))
                .concat(digitableLine.slice(10, 20))
                .concat(digitableLine.slice(21, 31))

                return {
                    barCode,
                    checkDigitsPosition: [9, 20, 31, 32],
                    amount: digitableLine.slice(37, 47),
                    days: digitableLine.slice(33, 37),
                    generalCheckDigitPosition: 4,
                    size
                }
            },
            48(){
                let checkDigitsPosition = [11, 23, 35, 47]
                let barCode = digitableLine.filter((_, i) => !checkDigitsPosition.includes(i))

                return {
                    barCode,
                    checkDigitsPosition,
                    amount: barCode.slice(4, 15),
                    date: barCode.slice(24, 32),
                    generalCheckDigitPosition: 3,
                    size
                }
            }
        }

        const data = generatersAndPositions[size]()
        data.barCodeWithoutGeneralCheckDigit = data.barCode.filter((_, i) => i !== data.generalCheckDigitPosition)
        data.checkDigits = [
            digitableLine[data.checkDigitsPosition[0]], 
            digitableLine[data.checkDigitsPosition[1]], 
            digitableLine[data.checkDigitsPosition[2]], 
            digitableLine[data.checkDigitsPosition[3]]
        ]

        return data
    }
}