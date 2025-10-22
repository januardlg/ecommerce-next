import { convertToRupiah, discountDecimal, productTitle, readableCategory, rupiahCurrency } from "@/components/ui-utils"

// const { discountDecimal } = require('@/components/ui-utils');


describe("Test for UI Utils", () => {

    test('Should return a rounded number', () => {
        const rounded = discountDecimal(5.9)
        expect(rounded).toBe(6)
    })

    test('Should return number that convert to rupiah', () => {
        const converted = convertToRupiah(3)
        expect(converted).toBe(45000)
    })

    test('Should return readeble category title', () => {
        const converted = readableCategory('new-book')

        expect(converted).toBe('New Book')
    })


    test('Should return number with currency', () => {
        const converted = rupiahCurrency(3)

        expect(converted).toBe("Rp 45.000")
    })

    test('Should return string with elipsis', () => {
        const stringWithElipsis = productTitle('Futsal Shoe Nike Phantom Ronaldo Neymar Blue Red Green Color')

        expect(stringWithElipsis).toContain("...")
    })
})