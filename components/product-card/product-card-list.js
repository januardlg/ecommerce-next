import ProductCard from "./product-card"

const ProductCardList = (props) => {

    const { products } = props

    if (!products) {
        return
    }
    return (
        <>
            <div className="flex gap-4">
                {products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </>
    )
}

export default ProductCardList