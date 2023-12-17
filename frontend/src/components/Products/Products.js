import React, { useState } from "react";
import Navbar from "../Navbar";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useCart } from "../Cart/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Data from "./Items.json";

const Products = () => {
  const [search, setSearch] = useState("");
  const { addToCart, addtoWishlist } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);

    toast.success("Item added successfully to the cart!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleToWishlist = (product) => {
    addtoWishlist(product);

    toast.success("Item added successfully to the wishlist!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const filteredData = Data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box marginTop={"5rem"}>
      <Navbar onSearchChange={handleSearchChange} />
      <Box>
        <Box display={"grid"} gridTemplateColumns={"repeat(4, 1fr)"}>
          {filteredData.map((shirt) => (
            <div key={shirt.id}>
              <Card
                sx={{
                  width: "70%",
                  margin: "1rem 1rem",
                  padding: "1rem",
                  height: "55vh",
                }}
              >
                <Box width={"80%"} height={"40vh"}>
                  <Button onClick={() => handleToWishlist(shirt)}>
                    <FavoriteBorderIcon />
                  </Button>
                  <CardMedia
                    sx={{
                      margin: "1rem 1rem",
                      padding: "1rem",
                      width: "85%",
                      height: "31vh",
                    }}
                    image={shirt.Image}
                    alt={shirt.name}
                  />
                </Box>

                <CardContent>
                  <Typography sx={{ marginBottom: "1rem" }}>
                    {shirt.name}
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: "5rem",
                      fontWeight: "800",
                    }}
                  >
                    $ {shirt.price}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <button
                    border={"2px solid red"}
                    borderRadius={"20px"}
                    margin={"1rem 1rem"}
                    size="small"
                    onClick={() => handleAddToCart(shirt)}
                  >
                    {shirt.Button}
                  </button>
                </CardActions>
              </Card>
            </div>
          ))}
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Products;
