const { render, screen } = require("@testing-library/react")
import ProductCardList from "@/components/product-card/product-card-list"
import { useRouter } from "next/router"

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Product Card List', () => {

    const mockListData = [
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

    test('Should render list of product card', async () => {
        render(<ProductCardList products={mockListData} />)


        expect(screen.getAllByRole('button', { name: /container/i })).toHaveLength(2)

        expect(screen.getByText(/Ice Cream/i)).toBeInTheDocument()
        expect(screen.getByText(/Adidas Samba/i)).toBeInTheDocument()

    })
})