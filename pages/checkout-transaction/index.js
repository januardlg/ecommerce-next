import { useEffect, useContext, useState } from "react"

import { useRouter } from "next/router"

import moment from "moment"

import { ShoppingContext } from "@/store/shopping-context"

import CHECKOUT_STATUS from "@/data-connector/constants/checkout-constants"
import { ROUTER_CONST } from "@/Consants/RouterConst"
// import { CheckouPageRoute } from "@/Consants/RouterConst"

import PersonalInformation from "@/components/checkout-transactions/personal-information"
import PaymentMethod from "@/components/checkout-transactions/payment-method"
import SubtitleSeparator from "@/components/ui-guide-component/subtitle-separator"
import OrderSummary from "@/components/checkout-transactions/order-summary"
import ShippingAddress from "@/components/checkout-transactions/shipping-address"
import ShippingMethod from "@/components/checkout-transactions/shipping-method"
import ModalDialog from "@/components/ui-guide-component/modal-dialog"
import Button from "@/components/ui-guide-component/button"
// import BreadCrumb from "@/components/ui-guide-component/breadcrumb"
import WarningForm from "@/components/ui-guide-component/warning-form"

import addedToCartAnimation from "../../public/animations/checkout-success"

import { Player } from "@lottiefiles/react-lottie-player"


const CheckoutTransactions = (props) => {

    const router = useRouter()

    const { checkoutTransaction, setCheckoutTransaction, ordersHistory, setOrdersHistory, routerPath } = useContext(ShoppingContext)


    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

    // const initValue = {
    //     firstName: "",
    //     lastName: "",
    //     phone: "",
    //     addressLabel: "",
    //     city: "",
    //     postCode: "",
    //     address: ""
    // }

    const [shippingAdress, setShippingAddress] = useState({})

    const [paymentMethod, setPaymentMethod] = useState()

    const [isWarningPayment, setIsWarningPayment] = useState(false)

    const [totalBill, setTotalBill] = useState()

    const buyNow = () => {

        if (paymentMethod) {
            setIsWarningPayment(false)
            setCheckoutTransaction({
                ...checkoutTransaction,
                id: ordersHistory.length,
                checkoutTime: moment(),
                checkoutStatus: CHECKOUT_STATUS.NEW,
                paidTime: null,
                shippingStart: null,
                estimatedDeliveryDate: moment().add('days', 1),
                shippingEnd: null,
                paymentMethod: paymentMethod,
                address: shippingAdress,
                totalBill: totalBill
            })
        } else {
            setIsWarningPayment(true)
        }
    }

    const handleOpenOrderModal = () => {
        setIsOrderModalOpen(!isOrderModalOpen)
        goToOrdersPage()
    }

    useEffect(() => {
        if (Object.values(shippingAdress).every(value => value !== "") && paymentMethod) {
            setOrdersHistory((prevOrders) => [...prevOrders, checkoutTransaction])
            setIsOrderModalOpen(true)
        } else {
            console.log('data not complete')
        }
    }, [checkoutTransaction])

    const goToOrdersPage = () => {
        router.push(ROUTER_CONST.orders)
        // setCheckoutTransaction((prevTransaction) => [...prevTransaction, transaction])

    }

    // useEffect(() => {
    //     /**BreadCrumb Path */
    //     CheckouPageRoute.disable = true
    //     routerPath.push(CheckouPageRoute)
    // }, [])


    if (!checkoutTransaction) {
        return
    }

    return (
        <>
            {/* <BreadCrumb /> */}
            <div className={`relative`}>
                <div className={`grid grid-cols-12 gap-4 relative`}>
                    <div className={`col-span-7`}>
                        <div>
                            <SubtitleSeparator title={"Address"} />
                            <PersonalInformation shippingAdress={shippingAdress} setShippingAddress={setShippingAddress} />
                        </div>
                        <div id={"shipping-address"} className={`mt-10  scroll-mt-[110px]`}>
                            <SubtitleSeparator title={"Shipping Address"} />
                            <ShippingAddress shippingAdress={shippingAdress} />
                        </div>
                        <div id={"shipping-method"} className={`mt-10`}>
                            <SubtitleSeparator title={"Shipping Method"} />
                            <ShippingMethod checkoutedDatas={checkoutTransaction} />
                        </div>
                        <div id={"payment-method"} className={`mt-10 scroll-mt-[110px]`}>
                            <SubtitleSeparator title={"Payment Method"} />
                            {isWarningPayment && <WarningForm inputLabel={`Please choose payment method`} warningEmpty={isWarningPayment} />}
                            <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                        </div>
                        <div className={`flex justify-end mt-6`}>
                            <Button type={"primary"} text={"Buy Now"} onClick={buyNow} />
                        </div>
                    </div>
                    {checkoutTransaction && (<OrderSummary checkoutedDatas={checkoutTransaction} totalBill={totalBill} setTotalBill={setTotalBill} />)}
                    {/* <OrderSummary checkoutedDatas={checkoutedDatas} /> */}
                </div>

            </div>

            <ModalDialog
                isOpen={isOrderModalOpen} onClose={handleOpenOrderModal}
                title={""}
                // primaryActionText={`View Orders`}
                // handlePrimaryAction={goToOrdersPage}
                body={
                    <div>
                        <Player
                            autoplay
                            loop
                            src={addedToCartAnimation}
                            style={{ height: '300px', width: '100%' }}
                        />
                        <div className="flex justify-center ">
                            <p style={{ fontFamily: 'Poppins-Regular' }} className="text-black"> Please do payment before <br /> {moment(checkoutTransaction.checkoutTime).add(2, 'hours').format('DD MMMM YYYY, h:mm a')} </p>
                        </div>
                    </div>
                }

            />
        </>
    )
}

export default CheckoutTransactions