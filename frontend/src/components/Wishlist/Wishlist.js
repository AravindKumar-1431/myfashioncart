import Navbar from "../Navbar";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../Cart/CartContext";

const Wishlist = () => {
  const { addToCart } = useCart();

  const handleaddtocart = (product) => {
    addToCart(product);

    toast.success("Item added successfully to the cart!", {
      position: toast.POSITION.TOP_CENTER,
    });
    removefromWishlist(product);
  };
  const handleRemoveFromWishlist = (shirt) => {
    removefromWishlist(shirt);
    toast.success("Item removed successfully from the cart!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const { wishlist, removefromWishlist } = useCart();

  const Wishlistitems = wishlist || [];

  return (
    <Box>
      <Box margin={"5rem"}>
        <Navbar />
      </Box>
      <h2 style={{ marginLeft: "45rem", fontSize: "3rem" }}>Wishlist</h2>
      {Wishlistitems.length === 0 ? (
        <p style={{ marginLeft: "40rem", fontSize: "3rem" }}>
          Your wishlist is empty
        </p>
      ) : (
        <Box
          border={"2px solid black"}
          borderRadius={"10px"}
          margin={"1rem 1rem"}
        >
          <Box>
            <Navbar />
          </Box>
          <Box display={"grid"} gridTemplateColumns={"repeat(4, 1fr)"}>
            {Wishlistitems.map((shirt) => (
              <Card
                sx={{
                  width: "70%",
                  margin: "1rem 1rem",
                  padding: "1rem",
                  height: "58vh",
                }}
                key={shirt.id}
              >
                <Box width={"80%"} height={"40vh"}>
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
                  <Typography
                    sx={{ marginBottom: "1rem" }}
                  >{`${shirt.name}`}</Typography>
                  <Typography
                    sx={{
                      marginLeft: "5rem",
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
                    onClick={() => handleRemoveFromWishlist(shirt)}
                  >
                    remove
                  </button>
                  <button onClick={() => handleaddtocart(shirt)}>
                    Add to cart
                  </button>
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

export default Wishlist;
