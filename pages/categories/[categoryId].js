import { useRouter } from "next/router"
import { useEffect, useState, useContext } from "react"
import useSWR from 'swr'

import { readableCategory } from "@/components/ui-utils"
import { ROUTER_CONST } from "@/Consants/RouterConst"
import { CategoriesPageRoute } from "@/Consants/RouterConst"

import { ShoppingContext } from "@/store/shopping-context"

import ProductCardList from "@/components/product-card/product-card-list"
import TitleSeparator from "@/components/title-separator/title-separator"
import LoadingSpin from "@/components/ui-guide-component/loading-spin"
import BreadCrumb from "@/components/ui-guide-component/breadcrumb"


const ProductOfCategory = (props) => {

    const { routerPath } = useContext(ShoppingContext)

    const router = useRouter()
    const params = router.query



    const [productOfCategories, setProductOfCategories] = useState([])

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, isLoading, error } = useSWR(`https://dummyjson.com/products/category/${params.categoryId}`, fetcher)

    useEffect(() => {
        if (data) {
            setProductOfCategories(data.products)

            /**BreadCrumb Path */
            const categoryDetail = {
                text: readableCategory(params.categoryId),
                path: `/${ROUTER_CONST.categories}/${params.categoryId}`,
                disable: true
            }
            CategoriesPageRoute.disable = false
            routerPath.push(CategoriesPageRoute)
            routerPath.push(categoryDetail)
        }
    }, [data])

    /**==================== */

    if (isLoading) {
        return <div className="w-[100%] h-[100%] flex justify-center items-center mt-10"><LoadingSpin /></div>

    }

    return (
        <div>
            <BreadCrumb />
            <TitleSeparator firstTitle={'Get'} secondTitle={`Our ${readableCategory(params.categoryId)}`} />
            <ProductCardList products={productOfCategories} />
        </div>
    )
}

export default ProductOfCategory
