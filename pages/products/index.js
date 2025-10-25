import { useState, useEffect, useContext } from 'react'

import { ShoppingContext } from '@/store/shopping-context'

import ProductCard from "@/components/product-card/product-card"
import ProductCardSkeleton from '@/components/skeleton/product-card-skeleton'

import BreadCrumb from '@/components/ui-guide-component/breadcrumb'

import { ProductsPageRoute } from '@/Consants/RouterConst'


const Products = (props) => {

    const { routerPath } = useContext(ShoppingContext)

    // all products state
    const [products, setProducts] = useState([])

    // load more functionality state for fetch data
    const [skip, setSkip] = useState(0)
    const [stillMore, setStillMore] = useState(true)

    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        loadMoreProducts()

        /**BreadCrumb Path */
        ProductsPageRoute.disable = true
        routerPath.push(ProductsPageRoute)

    }, [])

    // fetch data and load more functionality
    const loadMoreProducts = () => {
        setIsLoading(true)
        fetch(`https://dummyjson.com/products?limit=30&skip=${skip}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(prevProducts => ([...prevProducts, ...data.products]))
                setSkip((prevSkip) => prevSkip + 30)
                setStillMore(data.products.length == 30)
                setIsLoading(false)
            }
            )
    }

    return (
        <>
            <BreadCrumb />
            <div className="grid grid-cols-5 gap-4">
                {products.length > 0 && products.map((product, index) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
            {isLoading && (
                <>
                    <div className="grid grid-cols-5 gap-4">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <ProductCardSkeleton index={index} key={index} />
                        ))}
                    </div>
                </>
            )}

            {!isLoading && stillMore &&
                <div className='flex justify-center'>
                    <div className='text-[#666666] mt-6 rounded-md border-[1px] border-[#008ECC] hover:border-[#2F80ED] hover:border-[1.5px] hover:text-[#222222] w-[200px] h-[40px] cursor-pointer flex justify-center items-center ' onClick={loadMoreProducts} role='button' aria-label='more'>
                        <p style={{ fontFamily: 'Poppins-Regular' }} className="text-[14px]">Load More Products</p>
                    </div>
                </div>}
        </>
    )
}

export default Products
