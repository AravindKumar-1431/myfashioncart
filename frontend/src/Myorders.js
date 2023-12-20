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
  const media = useMediaQuery("(max-width:600px)");
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
          marginLeft: media ? "10rem" : "45rem",
          fontSize: "3rem",
        }}
      >
        {" "}
        my orders
      </h2>
      {cartItems.length === 0 ? (
        <p style={{ marginLeft: media ? "8rem" : "40rem", fontSize: "3rem" }}>
          Your Orders are empty
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
                  width: media ? "75%" : "70%",
                  margin: "1rem 1rem",
                  padding: "1rem",
                  height: media ? "38vh" : "53vh",
                }}
                key={shirt.id}
              >
                <Box
                  width={media ? "90%" : "80%"}
                  height={media ? "20vh" : "33vh"}
                >
                  <CardMedia
                    sx={{
                      margin: "1rem 1rem",
                      padding: "1rem",
                      width: media ? "60%" : "80%",
                      height: media ? "15vh" : "30vh",
                    }}
                    image={`${shirt.image}`}
                  />
                </Box>

                <CardContent
                  sx={{
                    width: media ? "90%" : "80%",
                    height: media ? "7vh" : "10vh",
                  }}
                >
                  <Typography
                    sx={{
                      marginLeft: media ? "2rem" : "2rem",
                      marginBottom: "1rem",
                      fontSize: media ? "10px" : "null",
                    }}
                  >{`${shirt.name}`}</Typography>
                  <Typography
                    sx={{
                      marginLeft: media ? "2rem" : "4rem",
                      fontWeight: "800",
                      fontSize: media ? "10px" : " null",
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
                        width: media ? "85%" : "11rem",
                        height: media ? "5vh" : "3vh",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "1.5rem",
                        fontSize: media ? "null" : "11px",
                        fontWeight: media ? "null" : "bold",
                      }}
                      onClick={() => handelCancelorder(shirt)}
                    >
                      Cancel Order
                    </button>
                    <Link to={"/Payment"}></Link>
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

export default Myorders;
