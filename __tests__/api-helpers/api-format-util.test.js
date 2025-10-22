import { convertCategories } from "@/api-helpers/api-format-utils"

describe('Tes formatter api', () => {
    test('should return', () => {
        const mockDataCategory = [
            {
                slug: 'Books'
            }
        ]

        const convertedCategories = convertCategories(mockDataCategory)

        expect(convertedCategories).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    imagePath: expect.any(String),
                    title: expect.any(String)
                })
            ])
        )
    })
})