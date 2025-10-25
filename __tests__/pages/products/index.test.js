import Products from "@/pages/products"
import { ShoppingContext } from "@/store/shopping-context";
import { render, screen, act, findAllByRole, findByText } from "@testing-library/react"
import { useRouter } from "next/router"
import { ROUTER_CONST } from "@/Consants/RouterConst";

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Page products', () => {


    beforeEach(() => {
        global.fetch = jest.fn()

    });

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should render the page products with correct element', async () => {

        const routerPath = [
            {
                text: 'Home',
                path: ROUTER_CONST.home
            }
        ]
        const mockContextValue = {
            routerPath
        }

        const mockDataResponse = {
            products: [
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
        }

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockDataResponse,
        });

        render(
            <ShoppingContext.Provider value={mockContextValue}>
                <Products />
            </ShoppingContext.Provider>
        )

        // test call api
        expect(global.fetch).toHaveBeenCalledWith(`https://dummyjson.com/products?limit=30&skip=0`)


        //test breadcrumbs
        const breadcrumbs = await screen.findByRole('link', { name: /breadcrumbs/i })
        expect(breadcrumbs).toBeInTheDocument()


        // test product lists
        const productContainer = await screen.findAllByRole('button', { name: /product container/i })
        expect(productContainer).toHaveLength(2)

    })
})