import React from "react";
import Navbar from "./components/Navbar";
import { useCart } from "./components/Cart/CartContext";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const Myorders = () => {
  const isLargeScreen = useMediaQuery("(min-width:600px)");
  const { order, Cancelorder } = useCart();
  const cartItems = order || [];
  const handelCancelorder = (shirt) => {
    Cancelorder(shirt);
    toast.success("Item removed successfully from the cart!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <Box>
      <Box margin={"5rem"}>
        <Navbar />
      </Box>
      <h2
        style={{
          margin: "3rem",
          marginLeft: isLargeScreen ? "45rem" : "25rem",
          fontSize: isLargeScreen ? "3rem" : "24px",
        }}
      >
        {" "}
        My Orders
      </h2>
      {cartItems.length === 0 ? (
        <p style={{ marginLeft: "40rem", fontSize: "3rem" }}>
          Your Orders are empty
        </p>
      ) : (
        <Box
          border={"2px solid black"}
          borderRadius={"10px"}
          width={isLargeScreen ? "100%" : "150%"}
        >
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
                  height: isLargeScreen ? "60vh" : "27vh",
                  justifyContent: "center",
                }}
                key={shirt.id}
              >
                <Box
                  width={isLargeScreen ? "80%" : "200%"}
                  height={isLargeScreen ? "40vh" : "12vh"}
                >
                  <CardMedia
                    sx={{
                      margin: "1rem 1rem",
                      padding: "1rem",
                      width: isLargeScreen ? "85%" : "7vh",
                      height: isLargeScreen ? "32vh" : "10vh",
                    }}
                    image={`${shirt.Image}`}
                  />
                </Box>

                <CardContent
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",

                    width: isLargeScreen ? "null" : "100%",
                    height: isLargeScreen ? "null" : "7vh",
                  }}
                >
                  <Typography
                    sx={{
                      //   marginTop: isLargeScreen ? "1rem" : "1rem",
                      width: isLargeScreen ? "100%" : "100%",
                      height: isLargeScreen ? "null" : "4vh",
                      fontSize: isLargeScreen ? "null" : "14px",
                      fontWeight: "550",
                    }}
                  >
                    {`${shirt.name}`}
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: isLargeScreen ? "5rem" : "1.6rem",

                      fontWeight: "800",
                    }}
                  >
                    $ {`${shirt.price}`}
                  </Typography>
                  <Box color={"green"}> Order Conformed</Box>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "center",
                    gap: "2rem",
                  }}
                >
                  <button
                    style={{
                      width: isLargeScreen ? "40%" : "11rem",
                      height: "3vh",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "1.5rem",
                      fontSize: isLargeScreen ? "null" : "11px",
                      fontWeight: isLargeScreen ? "null" : "bold",
                    }}
                    onClick={() => handelCancelorder(shirt)}
                  >
                    Cancel Order
                  </button>
                  <Link to={"/Payment"}></Link>
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

export default Myorders;
