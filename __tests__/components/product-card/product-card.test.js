import ProductCard from "@/components/product-card/product-card"
import { useRouter } from "next/router"
const { render, screen } = require("@testing-library/react")
import userEvent from "@testing-library/user-event";

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Product Card', () => {
    test('should render product card with true attribute', async () => {

        const mockData = {
            id: 28,
            title: "Ice Cream",
            price: 5.49,
            discountPercentage: 8.69,
            rating: 4.19,
            thumbnail: "https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp"
        }

        render(<ProductCard product={mockData} />)

        expect(screen.getByLabelText('discount')).toHaveTextContent('9%')
        expect(screen.getByRole('img', { name: /Ice Cream/i })).toBeInTheDocument()
        expect(screen.getByText(/Ice Cream/i)).toBeInTheDocument()
        expect(screen.getByLabelText('old-price')).toHaveTextContent('Rp 82.350')
        expect(screen.getByLabelText('new-price')).toHaveTextContent('Rp 75.193')
        expect(screen.getByText(/4.2/i)).toBeInTheDocument()
        expect(screen.getByText(/Save/i)).toHaveTextContent('Rp 7.156')

    })

    test('should trigger router push', async () => {

        const push = jest.fn();
        (useRouter).mockReturnValue({ push });

        const mockData = {
            id: 28,
            title: "Ice Cream",
            price: 5.49,
            discountPercentage: 8.69,
            rating: 4.19,
            thumbnail: "https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp"
        }

        render(<ProductCard product={mockData} />)

        const productContainer = screen.getByRole('button', { name: /product container/i })
        await userEvent.click(productContainer)

        expect(push).toHaveBeenCalledWith('/products/28')

    })
})