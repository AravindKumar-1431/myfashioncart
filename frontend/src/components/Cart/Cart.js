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
import { useMediaQuery } from "@mui/material";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import axios from "axios";
const Cart = () => {
  const { cart, setCart } = useCart();

  const removeFromCart = async (shirt) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/removefromcart/${shirt._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "y-token": localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        // Update the cart in your context
        setCart((prevCart) =>
          prevCart.filter((item) => item._id !== shirt._id)
        );
        toast.success("Item removed successfully from the cart!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(
          `Failed to remove item from the cart. Status: ${res.status}`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error(
        `Failed to remove item from the cart. Error: ${error.message}`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
  };
  const handleRemoveFromCart = (shirt) => {
    removeFromCart(shirt);
  };
  const cartItems = cart || [];
  const media = useMediaQuery("(max-width:600px)");
  return (
    <Box>
      <Box margin={"5rem"}>
        <Navbar />
      </Box>
      <h2
        style={{
          margin: "3rem",
          marginLeft: media ? "10rem" : "45rem",
          fontSize: "3rem",
        }}
      >
        {" "}
        My Cart
      </h2>
      {cartItems.length === 0 ? (
        <p style={{ marginLeft: media ? "8rem" : "40rem", fontSize: "3rem" }}>
          Your cart is empty
        </p>
      ) : (
        <Box border={"2px solid black"} borderRadius={"10px"}>
          <Box>
            <Navbar />
          </Box>
          <Box
            display={"grid"}
            gridTemplateColumns={media ? "repeat(3, 1fr)" : "repeat(4, 1fr)"}
          >
            {cartItems.map((shirt) => (
              <Card
                sx={{
                  width: "70%",
                  margin: "1rem 1rem",
                  padding: "1rem",
                  height: media ? "45vh" : "55vh",
                }}
                key={shirt.id}
              >
                <Box width={"70%"} height={media ? "25vh" : "40vh"}>
                  <FavoriteBorderIcon />
                  <CardMedia
                    sx={{
                      margin: "1rem 1rem",
                      padding: "1rem",
                      width: media ? "60%" : "85%",
                      height: media ? "15vh" : "32vh",
                    }}
                    image={`${shirt.image}`}
                  />
                </Box>

                <CardContent
                  sx={{
                    width: media ? "70%" : "null",
                    height: media ? "10vh" : "null",
                  }}
                >
                  <Typography
                    sx={{
                      marginBottom: "1rem",
                      fontSize: media ? "10px" : "null",
                      //   height: media ? "3vh" : "null",
                    }}
                  >
                    {" "}
                    {`${shirt.name}`}
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: media ? "2rem" : "5rem",

                      fontWeight: "800",
                    }}
                  >
                    $ {`${shirt.price}`}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: media ? "flex" : "null",
                    flexDirection: media ? "column" : "",
                  }}
                >
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
                        fontSize: media ? "10px" : "null",
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
                          fontWeight: media ? "300" : "600",
                          cursor: "pointer",
                          fontSize: media ? "13px" : "null",
                        }}
                      >
                        Buy
                      </button>
                    </Link>
                  </CardActions>
                </Box>
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
