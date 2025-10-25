import { getProducts } from "@/api-helpers/api-utils"

describe('Get products', () => {

    beforeEach(() => {
        global.fetch = jest.fn()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('getProducts using fetch and return success and data', async () => {

        const mockDataResponse = [
            {
                id: 28,
                title: "Ice Cream",
                price: 5.49,
                discountPercentage: 8.69,
                rating: 4.19,
                thumbnail: "https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp"
            },
            {
                id: 29,
                title: "Adidas Samba",
                price: 10,
                discountPercentage: 1.4,
                rating: 4.40,
                thumbnail: "https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp"
            }
        ]

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockDataResponse,
        });

        const response = await getProducts()


        expect(global.fetch).toHaveBeenCalledWith('https://dummyjson.com/products')

        expect(response).toEqual(mockDataResponse)
    })
})