const controllers = require('../controllers')

// --------------------------------------------------------useBarCode-----------------------------------------------------------------------
describe('Unit test by controller of useBarCode to "validFieldOrBar" function', () => {
    it('In success case with type check = title', () => {
        
        let digitableLine = '23793.38128 60080.409745 91000.063304 4 88970000051500';

        digitableLine = digitableLine.replace(/\D+/g, '')
        const {validFieldOrBar} = controllers.useBarCode(digitableLine)


        expect(validFieldOrBar(1)).toStrictEqual({ isValid: true, result: 8, checkDigitExpected: 8 })
        expect(validFieldOrBar(2)).toStrictEqual({ isValid: true, result: 5, checkDigitExpected: 5 })
        expect(validFieldOrBar(3)).toStrictEqual({ isValid: true, result: 4, checkDigitExpected: 4 })
        expect(validFieldOrBar()).toStrictEqual({ isValid: true, result: 4, checkDigitExpected: 4 })
         
    })

    it('In success case with type check = covenant', () => {

        let digitableLine = '836200000005 667800481000 180975657313 001589636081';

        digitableLine = digitableLine.replace(/\D+/g, '')
        const {validFieldOrBar} = controllers.useBarCode(digitableLine)


        expect(validFieldOrBar(1)).toStrictEqual({ isValid: true, result: 5, checkDigitExpected: 5 })
        expect(validFieldOrBar(2)).toStrictEqual({ isValid: true, result: 0, checkDigitExpected: 0 })
        expect(validFieldOrBar(3)).toStrictEqual({ isValid: true, result: 3, checkDigitExpected: 3 })
        expect(validFieldOrBar(4)).toStrictEqual({ isValid: true, result: 1, checkDigitExpected: 1 })
        expect(validFieldOrBar()).toStrictEqual({ isValid: true, result: 2, checkDigitExpected: 2 })
        
    })

    it('In fail case with type check = title', () => {
        
        let digitableLine = '13793.38129 60080.409747 91000.063300 4 88970000051500';
        digitableLine = digitableLine.replace(/\D+/g, '')

        const {validFieldOrBar} = controllers.useBarCode(digitableLine)

        expect(validFieldOrBar(1)).toStrictEqual({ isValid: false, result: 0, checkDigitExpected: 9 })
        expect(validFieldOrBar(2)).toStrictEqual({ isValid: false, result: 5, checkDigitExpected: 7 })
        expect(validFieldOrBar(3)).toStrictEqual({ isValid: false, result: 4, checkDigitExpected: 0 })
        expect(validFieldOrBar()).toStrictEqual({ isValid: false, result: 6, checkDigitExpected: 4 })
         
    })

    it('In fail case with type check = covenant', () => {

        let digitableLine = '136200000001 667802481000 180975657314 001589636082';

        digitableLine = digitableLine.replace(/\D+/g, '')
        const {validFieldOrBar} = controllers.useBarCode(digitableLine)


        expect(validFieldOrBar(1)).toStrictEqual({ isValid: false, result: 0, checkDigitExpected: 1 })
        expect(validFieldOrBar(2)).toStrictEqual({ isValid: false, result: 8, checkDigitExpected: 0 })
        expect(validFieldOrBar(3)).toStrictEqual({ isValid: false, result: 3, checkDigitExpected: 4 })
        expect(validFieldOrBar(4)).toStrictEqual({ isValid: false, result: 1, checkDigitExpected: 2 })
        expect(validFieldOrBar()).toStrictEqual({ isValid: false, result: 5, checkDigitExpected: 2 })
    })
})

// --------------------------------------------------------getExpirationDate-----------------------------------------------------------------------
describe('Unit test by controller of useBarCode to "getExpirationDate" function', () => {

    it('In success case with type check = title', () => {
        
        const days = 8897
        let digitableLine = `23793.38128 60080.409745 91000.063304 4 ${days}0000051500`;

        digitableLine = digitableLine.replace(/\D+/g, '')
        const {getExpirationDate} = controllers.useBarCode(digitableLine)

        expect(getExpirationDate()).toEqual('2022-02-15')
         
    })
    
    it('In fail case with type check = title', () => {
        
        const days = 8997
        let digitableLine = `23793.38128 60080.409745 91000.063304 4 ${days}0000051500`;

        digitableLine = digitableLine.replace(/\D+/g, '')
        const {getExpirationDate} = controllers.useBarCode(digitableLine)

        expect(getExpirationDate()).toEqual('2022-05-26')
         
    })
})

// --------------------------------------------------------getAmount-----------------------------------------------------------------------
describe('Unit test by controller of useBarCode to "getAmount" function', () => {

    it('In success case with type check = title', () => {
        
        let digitableLine = '23793.38128 60080.409745 91000.063304 4 88970000051500';

        digitableLine = digitableLine.replace(/\D+/g, '')
        const {getAmount} = controllers.useBarCode(digitableLine)

        expect(getAmount()).toEqual('515.00')
         
    })
    it('In success case with type check = covenant', () => {
        
        let digitableLine = '836200000005 667800481000 180975657313 001589636081';

        digitableLine = digitableLine.replace(/\D+/g, '')
        const {getAmount} = controllers.useBarCode(digitableLine)

        expect(getAmount()).toEqual('66.78')
         
    })

    it('In fail case with type check = title', () => {
        
        let digitableLine = '23793.38128 60080.409745 91000.063304 4 88970000032500';

        digitableLine = digitableLine.replace(/\D+/g, '')
        const {getAmount} = controllers.useBarCode(digitableLine)

        expect(getAmount()).not.toEqual('515.00')
         
    })
    it('In fail case with type check = covenant', () => {
        
        let digitableLine = '836200000005 597800481000 180975657313 001589636081';

        digitableLine = digitableLine.replace(/\D+/g, '')
        const {getAmount} = controllers.useBarCode(digitableLine)

        expect(getAmount()).not.toEqual('66.78')
         
    })
})

// --------------------------------------------------------getBarCode-----------------------------------------------------------------------
describe('Unit test by controller of useBarCode to "getBarCode" function', () => {

    it('In success case with type check = title', () => {
        
        let digitableLine = '23793.38128 60080.409745 91000.063304 4 88970000051500';

        digitableLine = digitableLine.replace(/\D+/g, '')
        const {getBarCode} = controllers.useBarCode(digitableLine)

        
        expect(getBarCode()).toEqual('23794889700000515003381260080409749100006330')
         
    })
    
    it('In success case with type check = title', () => {
        
        let digitableLine = '836200000005 667800481000 180975657313 001589636081';

        digitableLine = digitableLine.replace(/\D+/g, '')
        const {getBarCode} = controllers.useBarCode(digitableLine)

        expect(getBarCode()).toEqual('83620000000667800481001809756573100158963608')
    })

    it('In fail case with type check = title', () => {
        
        let digitableLine = '25793.38128 60080.409745 91000.063304 4 88970000051500';

        digitableLine = digitableLine.replace(/\D+/g, '')
        const {getBarCode} = controllers.useBarCode(digitableLine)

        
        expect(getBarCode()).not.toEqual('23794889700000515003381260080409749100006330')
         
    })
    
    it('In fail case with type check = title', () => {
        
        let digitableLine = '856200000005 667800481000 180975657313 001589636081';

        digitableLine = digitableLine.replace(/\D+/g, '')
        const {getBarCode} = controllers.useBarCode(digitableLine)

        expect(getBarCode()).not.toEqual('83620000000667800481001809756573100158963608')
    })
})