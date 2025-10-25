import { createContext, useState, useEffect } from "react";

import moment from "moment";

import CHECKOUT_STATUS from "@/data-connector/constants/checkout-constants";
import { ROUTER_CONST } from "@/Consants/RouterConst";

export const ShoppingContext = createContext({})

export function ShoppingContextProvider(props) {

    const [shoppingCart, setShoppingCart] = useState([
        // {
        //     id: 1,
        //     productId: 1,
        //     totalShop: 2
        // },
        // {
        //     id: 2,
        //     productId: 2,
        //     totalShop: 1
        // }
    ])

    const [checkOutProduct, setCheckOutProduct] = useState([
        // {
        //     id: 0,
        //     shoppingCartId: 1,
        //     productId: 1,
        //     totalShop: 2,
        //     price: 100,
        //     discount: 10,
        // },
        // {
        //     id: 2,
        //     shoppingCartId: 2,
        //     productId: 3,
        //     totalShop: 2,
        //     price: 100,
        //     discount: 10,
        // }
    ])

    // const [checkoutTransaction, setCheckoutTransaction] = useState([
    //     {
    //         id: '0',
    //         checkoutTime: moment('2023-09-23T08:00:00+07:00'),
    //         checkoutStatus: CHECKOUT_STATUS.NEW,
    //         paymentMethod: '2',
    //         paidTime: '',
    //         address: '',
    //         deliveryCharges: 3,
    //         estimatedDeliveryDate: moment('2023-09-24T08:00:00+07:00'),
    //         items: [
    //             {
    //                 shoppingCartId: 1,
    //                 productId: 1,
    //                 totalShop: 2,
    //                 price: 100,
    //                 discount: 10,
    //             }
    //         ],
    //     }
    // ])

    const [checkoutTransaction, setCheckoutTransaction] = useState(
        {
            id: '0',
            checkoutTime: moment('2023-09-23T08:00:00+07:00'),
            checkoutStatus: CHECKOUT_STATUS.NEW,
            paymentMethod: '2',
            paidTime: '',
            address: '',
            deliveryCharges: 3,
            estimatedDeliveryDate: moment('2023-09-24T08:00:00+07:00'),
            totalBill: 90,
            items: [
                {
                    shoppingCartId: 1,
                    productId: 1,
                    totalShop: 2,
                    totalPrice: 100,
                    totalDiscount: 10,
                }
            ],
        }
    )

    const [ordersHistory, setOrdersHistory] = useState([
        {
            id: '0',
            checkoutTime: moment('2023-09-23T08:00:00+07:00'),
            checkoutStatus: CHECKOUT_STATUS.NEW,
            paymentMethod: '2',
            paidTime: '',
            address: '',
            deliveryCharges: 3,
            estimatedDeliveryDate: moment('2023-09-24T08:00:00+07:00'),
            totalBill: 93,
            items: [
                {
                    shoppingCartId: 1,
                    productId: 1,
                    totalShop: 2,
                    totalPrice: 100,
                    totalDiscount: 10,
                }
            ],
        }
    ])


    const routerPath = [
        {
            text: 'Home',
            path: ROUTER_CONST.home
        }
    ]

    const shoppingContextValue = {
        shoppingCart,
        setShoppingCart,
        checkOutProduct,
        setCheckOutProduct,
        checkoutTransaction,
        setCheckoutTransaction,
        ordersHistory,
        setOrdersHistory,
        routerPath

    }


    // useEffect(() => {

    //     console.log('shopping-cart', shoppingCart)
    // }, [shoppingCart])

    useEffect(() => {

        console.log('checkoutTransaction', checkoutTransaction)
    }, [checkoutTransaction])


    useEffect(() => {

        console.log('ordersHistory', ordersHistory)
    }, [ordersHistory])

    return (
        <ShoppingContext.Provider value={shoppingContextValue}>
            {props.children}
        </ShoppingContext.Provider>
    )
}