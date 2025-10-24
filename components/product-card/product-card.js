import { useRouter } from "next/router"

import StarIcon from "../icons/star-icon"
import Image from "next/image"

// import ui-utils
import { productTitle, discountDecimal, convertToRupiah, rupiahCurrency, discountTotal } from "../ui-utils"

const ProductCard = (props) => {

    const { product } = props

    const router = useRouter()

    const saveAfterDiscount = discountTotal(product.discountPercentage, product.price)
    const priceAfterDiscount = parseFloat(product.price) - parseFloat(saveAfterDiscount)


    const handleOpenProductDetail = (productId) => {
        const routerPath = `/products/${productId}`

        router.push(routerPath)
    }

    return (
        <div
            role="button"
            aria-label={`product container ${product.title}`}
            key={`product-${product.id}-${product.title}`}
            onClick={() => handleOpenProductDetail(product.id)}
            className="relative h-[315px] w-[227px] rounded-[16px] border border-[#EDEDED] text-black hover:border-[#008ECC] cursor-pointer hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
        >

            {product.discountPercentage > 0 && (
                <div className="absolute top-[-1px] right-[-1px] h-[53px] w-[51px] bg-[#008ECC] rounded-tr-2xl rounded-bl-2xl flex items-center flex-wrap justify-center text-white text-sm">
                    <div className="h-[30px] text-xs" >
                        <p aria-label="discount">{`${discountDecimal(product.discountPercentage)}%`}</p>
                        <p>OFF</p>
                    </div>
                </div>
            )}
            <div className="h-48 flex justify-center items-center ">
                <Image src={`${product.thumbnail}`} alt={product.title} className="rounded-t-2xl" style={{
                    width: '99%',
                    height: '99%',
                }} width={220} height={160} />
            </div>
            <div className="mt-[0.5px] pt-2 p-3 text-sm border-t border-[#EDEDED]">
                <div style={{ fontFamily: 'Poppins-Light' }} className="h-10">
                    {productTitle(product.title)}
                </div>
                {product.discountPercentage > 0 ?
                    (
                        <div className="flex mt-1">
                            <p style={{ fontFamily: 'Poppins-Regular' }} aria-label="new-price">
                                {rupiahCurrency(priceAfterDiscount)}
                            </p>
                            <p style={{ fontFamily: 'Poppins-Regular' }} className="line-through ml-2 text-xs" aria-label="old-price">
                                {rupiahCurrency(product.price)}
                            </p>
                        </div>
                    ) : (
                        <p style={{ fontFamily: 'Poppins-Regular' }} className="mt-1">
                            {rupiahCurrency(product.price)}
                        </p>
                    )}
                <>
                    <hr className="bg-[#EDEDED] my-2" />
                    <div className="flex justify-between" style={{ fontFamily: 'Poppins-Light' }}>
                        <div className="flex justify-start items-center">
                            <p className="mr-1">{(product.rating).toFixed(1)}</p>
                            <StarIcon color={'#EDD146'} />
                        </div>
                        {product.discountPercentage > 0 && (
                            <p className="text-[#249B3E] text-xs">Save - {rupiahCurrency(saveAfterDiscount)}</p>
                        )}
                    </div>
                </>
            </div>
        </div>
    )
}

export default ProductCard