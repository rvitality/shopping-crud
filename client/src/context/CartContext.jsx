import { createContext, useContext, useState } from "react";

const initialState = {
    cart: [],
    setCart: () => {},
};

const CartContext = createContext(initialState);

export const CartContextProvider = props => {
    const [cart, setCart] = useState([]);

    const cartTotal = cart.length > 0 ? cart.reduce((sum, order) => sum + order.total, 0) : 0;

    const cartChangeHandler = order => {
        const existingOrderIndex = cart.findIndex(item => item.productId === order.productId);

        // add new order
        if (existingOrderIndex < 0) {
            setCart(prevState => [order, ...prevState]);
        } else {
            // update order
            setCart(prevState => {
                return prevState.map(cartItem => {
                    if (cartItem.productId === order.productId) {
                        return order;
                    }

                    return cartItem;
                });
            });
        }
    };

    const contextValue = {
        cart,
        onCartUpdate: cartChangeHandler,
        cartTotal,
    };

    return <CartContext.Provider value={contextValue}>{props.children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
