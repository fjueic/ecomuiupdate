import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        if (cart.find(item => item.id === product.id)) {
            return;
        }
        setCart([...cart, product])
    }

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id))
    }

    const clearCart = () => {
        setCart([])
    }

    useEffect(() => {
        if (cart.length === 0) {
            return;
        }
        if (user) {
            localStorage.setItem(user.token, JSON.stringify(cart))
        }
    }, [cart])


    useEffect(() => {
        if (!user) {
            setCart([]);
            return;
        }
        if (localStorage.getItem(user.token)) {
            setCart(JSON.parse(localStorage.getItem(user.token)))
        }
    }, [user])

    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);
