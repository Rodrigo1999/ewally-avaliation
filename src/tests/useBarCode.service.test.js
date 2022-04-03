const services = require('../services')

describe('Test service result', () => {
    it('In success case with type check = title', () => {
        
        let digitableLine = '23793.38128 60080.409745 91000.063304 4 88970000051500';

        digitableLine = digitableLine.replace(/\D+/g, '')
        const data = services.useBarCode(digitableLine)

        expect(data).toStrictEqual({
            barCode: '23794889700000515003381260080409749100006330',
            amount: '515.00',
            getExpirationDate: '2022-02-15'
        })
    })
    
    it('In success case with type check = covenant', () => {
        
        let digitableLine = '836200000005 667800481000 180975657313 001589636081';

        digitableLine = digitableLine.replace(/\D+/g, '')
        const data = services.useBarCode(digitableLine)

        expect(data).toStrictEqual({
            barCode: '83620000000667800481001809756573100158963608',
            amount: '66.78',
            getExpirationDate: 'No Date'
        })
    })
})
// --------------------------------------------------------------error in digitable line---------------------------------------------------------------------------------
describe('Test service trhows generic error in digitable line', () => {
    it('Type check = title and size line < 47', () => {
        expect.assertions(1)
        let digitableLine = '23793.38128 60080.409745 91000.063304 4 889700000';

        digitableLine = digitableLine.replace(/\D+/g, '')

        try {
            services.useBarCode(digitableLine)
        } catch (error) {
            expect(error.name).toEqual('E001')
        }
    })
    
    it('Type check = covenant  and size line > 48', () => {
        expect.assertions(1)
        let digitableLine = '836200000005 667800481000 180975657313 001589636081893 397387863';

        digitableLine = digitableLine.replace(/\D+/g, '')

        try {
            services.useBarCode(digitableLine)
        } catch (error) {
            expect(error.name).toEqual('E001')
        }
    })
    
    it('Type check = title and letter in digitable line', () => {
        expect.assertions(1)
        let digitableLine = '23793.38128 60080.4hjkl5 91000.063304 4 88970000051500';

        digitableLine = digitableLine.replace(/\D+/g, '')

        try {
            services.useBarCode(digitableLine)
        } catch (error) {
            expect(error.name).toEqual('E001')
        }
    })
})
// --------------------------------------------------------------Others errors type = title---------------------------------------------------------------------------------
describe('Others errors throws to Type check = title', () => {
    it('error in field 1', () => {
        expect.assertions(1)
        let digitableLine = '23793.38127 60080.409745 91000.063304 4 88970000051500';

        digitableLine = digitableLine.replace(/\D+/g, '')

        try {
            services.useBarCode(digitableLine)
        } catch (error) {
            expect(error.name).toEqual('E002')
        }
    })
    it('error in field 2', () => {
        expect.assertions(1)
        let digitableLine = '23793.38128 60080.409746 91000.063304 4 88970000051500';

        digitableLine = digitableLine.replace(/\D+/g, '')

        try {
            services.useBarCode(digitableLine)
        } catch (error) {
            expect(error.name).toEqual('E003')
        }
    })
    it('error in field 3', () => {
        expect.assertions(1)
        let digitableLine = '23793.38128 60080.409745 91000.063309 4 88970000051500';

        digitableLine = digitableLine.replace(/\D+/g, '')

        try {
            services.useBarCode(digitableLine)
        } catch (error) {
            expect(error.name).toEqual('E004')
        }
    })

    it('error in generic field', () => {
        expect.assertions(1)
        let digitableLine = '23793.38128 60080.409745 91000.063304 7 88970000051500';

        digitableLine = digitableLine.replace(/\D+/g, '')

        try {
            services.useBarCode(digitableLine)
        } catch (error) {
            expect(error.name).toEqual('E006')
        }
    })
})
// --------------------------------------------------------------Others errors type = covenant---------------------------------------------------------------------------------
describe('Others errors throws to Type check = covenant', () => {
    it('error in field 1', () => {
        expect.assertions(1)
        let digitableLine = '836200000001 667800481000 180975657313 001589636081';

        digitableLine = digitableLine.replace(/\D+/g, '')

        try {
            services.useBarCode(digitableLine)
        } catch (error) {
            expect(error.name).toEqual('E002')
        }
    })
    it('error in field 2', () => {
        expect.assertions(1)
        let digitableLine = '836200000005 667800481001 180975657313 001589636081';

        digitableLine = digitableLine.replace(/\D+/g, '')

        try {
            services.useBarCode(digitableLine)
        } catch (error) {
            expect(error.name).toEqual('E003')
        }
    })
    it('error in field 3', () => {
        expect.assertions(1)
        let digitableLine = '836200000005 667800481000 180975657311 001589636081';

        digitableLine = digitableLine.replace(/\D+/g, '')

        try {
            services.useBarCode(digitableLine)
        } catch (error) {
            expect(error.name).toEqual('E004')
        }
    })

    it('error in field 4', () => {
        expect.assertions(1)
        let digitableLine = '836200000005 667800481000 180975657313 001589636082';

        digitableLine = digitableLine.replace(/\D+/g, '')

        try {
            services.useBarCode(digitableLine)
        } catch (error) {
            expect(error.name).toEqual('E005')
        }
    })
})