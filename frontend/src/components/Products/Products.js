import React, { useEffect, useState } from "react";
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
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
const Products = () => {
  const mediaq = useMediaQuery("(max-width:600px)");
  const [token] = useState(localStorage.getItem("token"));
  const [search, setSearch] = useState("");
  const { addToCart, addtoWishlist } = useCart();

  const [data, setdata] = useState([]);
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getproducts");
      setdata(response.data);

      console.log(response.data);
    } catch (error) {
      console.error("Error during GET request:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [token, navigate]);

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

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box marginTop={"5rem"}>
      <Navbar onSearchChange={handleSearchChange} />
      <Box>
        <Box
          display={"grid"}
          gridTemplateColumns={mediaq ? "repeat(3, 1fr)" : "repeat(4, 1fr)"}
        >
          {filteredData.map((shirt) => (
            <div key={shirt.id}>
              <Card
                sx={{
                  width: mediaq ? "70%" : "70%",
                  margin: "1rem 1rem",
                  padding: "1rem",
                  height: mediaq ? "40vh" : "60vh",
                }}
              >
                <Box width={"80%"} height={mediaq ? "25vh" : "40vh"}>
                  <Button onClick={() => handleToWishlist(shirt)}>
                    <FavoriteBorderIcon />
                  </Button>
                  <CardMedia
                    sx={{
                      margin: "1rem 1rem",
                      padding: "1rem",
                      width: mediaq ? "55%" : "85%",
                      height: mediaq ? "14vh" : " 31vh",
                    }}
                    image={shirt.image}
                  />
                </Box>

                <CardContent
                  sx={{
                    width: mediaq ? "60%" : "null",
                    height: mediaq ? "12vh" : "null",
                  }}
                >
                  <Typography
                    sx={{
                      marginBottom: "1rem",
                      fontWeight: "bold",
                      fontSize: mediaq ? "10px" : " null",
                      marginLeft: "1rem",
                    }}
                  >
                    {shirt.name}
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: mediaq ? "2rem" : "5rem",
                      fontWeight: "800",
                      fontSize: mediaq ? "10px" : " null",
                    }}
                  >
                    $ {shirt.price}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "center",
                    marginTop: mediaq ? "-2rem" : "",
                  }}
                >
                  <button
                    border={"2px solid red"}
                    borderRadius={"20px"}
                    margin={"1rem 1rem"}
                    size="small"
                    onClick={() => handleAddToCart(shirt)}
                  >
                    Add to cart
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
