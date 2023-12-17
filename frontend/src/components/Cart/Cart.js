import React from "react";
import Navbar from "../Navbar";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const handleRemoveFromCart = (shirt) => {
    removeFromCart(shirt);
    toast.success("Item removed successfully from the cart!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const cartItems = cart || [];
  return (
    <Box>
      <Box margin={"5rem"}>
        <Navbar />
      </Box>
      <h2 style={{ margin: "3rem", marginLeft: "45rem", fontSize: "3rem" }}>
        {" "}
        My Cart
      </h2>
      {cartItems.length === 0 ? (
        <p style={{ marginLeft: "40rem", fontSize: "3rem" }}>
          Your cart is empty
        </p>
      ) : (
        <Box border={"2px solid black"} borderRadius={"10px"}>
          <Box>
            <Navbar />
          </Box>
          <Box display={"grid"} gridTemplateColumns={"repeat(4, 1fr)"}>
            {cartItems.map((shirt) => (
              <Card
                sx={{
                  width: "70%",
                  margin: "1rem 1rem",
                  padding: "1rem",
                  height: "55vh",
                }}
                key={shirt.id}
              >
                <Box width={"80%"} height={"40vh"}>
                  <FavoriteBorderIcon />
                  <CardMedia
                    sx={{
                      margin: "1rem 1rem",
                      padding: "1rem",
                      width: "85%",
                      height: "32vh",
                    }}
                    image={`${shirt.Image}`}
                  />
                </Box>

                <CardContent>
                  <Typography sx={{ marginBottom: "1rem" }}>
                    {" "}
                    {`${shirt.name}`}
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: "5rem",

                      fontWeight: "800",
                    }}
                  >
                    $ {`${shirt.price}`}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "center",
                    gap: "2rem",
                  }}
                >
                  <button
                    style={{
                      width: "40%",
                      height: "3vh",
                    }}
                    onClick={() => handleRemoveFromCart(shirt)}
                  >
                    Remove
                  </button>
                  <Link to={"/Payment"}>
                    <button
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(129,127,168,1) 0%, rgba(46,46,98,1) 35%, rgba(2,175,230,1) 88%, rgba(26,105,123,1) 96%, rgba(1,203,249,1) 97%, rgba(0,212,255,1) 100%)",
                        color: "white",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Buy now
                    </button>
                  </Link>
                </CardActions>
              </Card>
            ))}
          </Box>
          <ToastContainer />
        </Box>
      )}
    </Box>
  );
};

export default Cart;
