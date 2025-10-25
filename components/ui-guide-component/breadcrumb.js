import { useContext } from "react"

import { useRouter } from "next/router"

import { ShoppingContext } from "@/store/shopping-context"
import { FONT_FAMILY } from "@/Consants/FontFamily"

import ArrowRightCircle from "../icons/arrow-right-circle"
import ChevronRight from "../icons/chevron-right-icon"

const BreadCrumb = () => {

    const { routerPath } = useContext(ShoppingContext)

    const router = useRouter()

    const handleChangePage = (path) => {
        router.push(path)
    }

    return (
        <div className={`flex items-center mb-8`} role="link" aria-label="breadcrumbs">
            {routerPath.map((path, index) => (
                <div className={`flex text-[#807D7E] items-center`}
                    style={{ fontFamily: FONT_FAMILY.POPPINS_REGULAR }}
                    key={path.path}
                >
                    <div
                        onClick={path.disable ? undefined : () => handleChangePage(path.path)}
                        className={`${path.disable ? `cursor-default` : `cursor-pointer hover:text-[#3C4242]`}  `}>{path.text}
                    </div>
                    {index !== routerPath.length - 1 && (<div className="mx-3"><ChevronRight /></div>)}
                </div>
            ))}
        </div>
    )
}
export default BreadCrumb