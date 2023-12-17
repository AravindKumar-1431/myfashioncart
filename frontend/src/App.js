import Login from "./components/Login/Login";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Home from "./components/Homepage/Homepage";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Login/Signup";
import ProductSummary from "./components/ProductSummary";
import { CartProvider } from "./components/Cart/CartContext";
import Myorders from "./Myorders";
function App() {
  return (
    <div>
      <CartProvider>
        <Routes>
          {" "}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<Login name="don't have account? " />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Cartprovider" element={<CartProvider />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/Payment" element={<ProductSummary />} />
          <Route path="/myorders" element={<Myorders />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
