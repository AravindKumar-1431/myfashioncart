import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
const CartContext = createContext();
export const useCart = () => {
  return useContext(CartContext);
};
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [order, setorder] = useState([]);

  // const getcart = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/getcart", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "y-token": localStorage.getItem("token"),
  //       },
  //     });
  //     console.log(setCart(res.data));
  //     setCart(res.data);
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //   }
  // };
  useEffect(() => {
    const getcart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/getcart", {
          headers: {
            "Content-Type": "application/json",
            "y-token": localStorage.getItem("token"),
          },
        });
        console.log(setCart(res.data));
        setCart(res.data);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };
    getcart();
  }, []);
  const addToCart = async (name, price, image) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/addtocart",
        {
          name,
          price,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "y-token": localStorage.getItem("token"),
          },
        }
      );
      setCart((prevCart) => [...prevCart, response.data.data]);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
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
