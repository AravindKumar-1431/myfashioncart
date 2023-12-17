import React, { useContext, createContext, useState } from "react";
const CartContext = createContext();
export const useCart = () => {
  return useContext(CartContext);
};
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [order, setorder] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };
  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };
  const addtoWishlist = (product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  const removefromWishlist = (product) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== product.id)
    );
  };
  const addtoMyorders = (product) => {
    setorder((prevWishlist) => [...prevWishlist, product]);
  };
  const Cancelorder = (product) => {
    setorder((prevorder) => prevorder.filter((item) => item.id !== product.id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addtoMyorders,
        order,
        Cancelorder,
        removeFromCart,
        wishlist,
        addtoWishlist,
        removefromWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
