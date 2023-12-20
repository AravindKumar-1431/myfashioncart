import { Box } from "@mui/system";
import React from "react";
import Navbar from "./Navbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useCart } from "./Cart/CartContext";
import { Divider } from "@mui/material";

const ProductSummary = () => {
  const mediaq = useMediaQuery("(max-width:700px)");
  const { cart, removeFromCart, addtoMyorders } = useCart();
  const handleRemoveFromCart = (shirt) => {
    removeFromCart(shirt);
    toast.success("Item removed successfully from the cart!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const handelconformorder = (shirt) => {
    addtoMyorders(shirt);
    toast.success("Order Conformed successfully ", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      onClose: () => {
        setTimeout(() => {
          window.location.href = "/myorders";
        }, 100);
      },
    });
  };
  const cartItems = cart || [];
  return (
    <Box>
      <Box>
        <Box margin={"5rem"}>
          <Navbar />
        </Box>
        <h2 style={{ margin: "3rem", marginLeft: "45rem", fontSize: "3rem" }}>
          {" "}
          Order Summary
        </h2>
        {cartItems.length === 0 ? (
          <p style={{ marginLeft: "40rem", fontSize: "3rem" }}>
            Your cart is empty
          </p>
        ) : (
          <Box
            display={"flex"}
            border={"2px solid black"}
            borderRadius={"10px"}
          >
            <Box>
              <Navbar />
            </Box>
            <Box
              display={"grid"}
              gridTemplateColumns={"repeat(2, 2fr)"}
              gap={"3rem"}
            >
              <Box>
                {cartItems.map((shirt) => (
                  <Card
                    sx={{
                      width: "90%",
                      margin: "1rem 1rem",
                      padding: "1rem",
                      height: "65vh",
                    }}
                    key={shirt.id}
                  >
                    <Box width={"80%"} height={"40vh"}>
                      <CardMedia
                        sx={{
                          margin: "1rem 1rem",
                          padding: "1rem",
                          width: "75%",
                          height: "30vh",
                        }}
                        image={`${shirt.image}`}
                      />
                    </Box>

                    <CardContent>
                      <Typography sx={{ marginBottom: "1rem" }}>
                        {" "}
                        {`${shirt.name}`}
                      </Typography>
                      <Typography
                        sx={{
                          marginLeft: "3rem",

                          fontWeight: "800",
                        }}
                      >
                        $ {`${shirt.price}`}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                      <button
                        style={{
                          width: "40%",
                          height: "3vh",
                        }}
                        onClick={() => handleRemoveFromCart(shirt)}
                      >
                        Remove
                      </button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
              {cartItems.map((shirt) => (
                <Card
                  style={{
                    width: "120%",
                    height: "50vh",
                    padding: "1rem",
                    margin: "2rem",
                  }}
                >
                  <h1>Price Details</h1>
                  <Divider />

                  <Box>
                    {" "}
                    <h4>
                      Price &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp; &nbsp; &nbsp;$
                      {`${shirt.price}`}{" "}
                    </h4>
                    <Divider />
                    <h4>
                      {" "}
                      Discount &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 20%{" "}
                    </h4>
                    <Divider />
                    <h4>
                      Delivery Charges &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp; Free
                    </h4>
                    <Divider />
                    <h4>
                      Total &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp; &nbsp; $ 80
                    </h4>
                    <Divider />
                    <Box padding={"1rem"}>
                      {" "}
                      <Link to={"/myorders"}>
                        <button
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(129,127,168,1) 0%, rgba(46,46,98,1) 35%, rgba(2,175,230,1) 88%, rgba(26,105,123,1) 96%, rgba(1,203,249,1) 97%, rgba(0,212,255,1) 100%)",
                            color: "white",
                            fontWeight: "600",
                            cursor: "pointer",
                            marginLeft: "4.5rem",
                          }}
                          onClick={() => handelconformorder(shirt)}
                        >
                          {" "}
                          Conform Order
                        </button>
                      </Link>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>
            <ToastContainer />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductSummary;
