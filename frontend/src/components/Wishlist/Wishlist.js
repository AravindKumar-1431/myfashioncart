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
import { useMediaQuery } from "@mui/material";
import axios from "axios";
const Wishlist = () => {
  const { wishlist, setwishlist, addToCart } = useCart();
  const handleaddtocart = (product) => {
    addToCart(product);

    toast.success("Item added successfully to the cart!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const apiUrl = process.env.REACT_APP_API_URL;
  const removefromWishlist = async (shirt) => {
    try {
      const res = await axios.delete(
        `${apiUrl}/removefromwishlist/${shirt._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "y-token": localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        setwishlist((prevCart) =>
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
      console.error("Error removing item from wishlist:", error);
      toast.error(
        `Failed to remove item from the cart. Error: ${error.message}`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
  };
  const handleRemoveFromWishlist = (shirt) => {
    removefromWishlist(shirt);
  };

  // const handleRemoveFromWishlist = (shirt) => {
  //   removefromWishlist(shirt);
  //   toast.success("Item removed successfully from the cart!", {
  //     position: toast.POSITION.TOP_CENTER,
  //   });
  // };

  const Wishlistitems = wishlist || [];
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
        Wishlist
      </h2>
      {Wishlistitems.length === 0 ? (
        <p style={{ marginLeft: media ? "8rem" : "40rem", fontSize: "3rem" }}>
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
          <Box
            display={"grid"}
            gridTemplateColumns={media ? "repeat(3, 1fr)" : "repeat(4, 1fr)"}
          >
            {Wishlistitems.map((shirt) => (
              <Card
                sx={{
                  width: "70%",
                  margin: "1rem 1rem",
                  padding: "1rem",
                  height: media ? "43vh" : "55vh",
                }}
                key={shirt.id}
              >
                <Box width={"80%"} height={media ? "20vh" : "32vh"}>
                  <CardMedia
                    sx={{
                      margin: "1rem 1rem",
                      padding: "1rem",
                      width: media ? "60%" : "85%",
                      height: media ? "15vh" : "30vh",
                    }}
                    image={`${shirt.image}`}
                  />
                </Box>

                <CardContent
                  sx={{
                    width: media ? "70%" : "60%",
                    height: media ? "7vh" : "15vh",
                  }}
                >
                  <Typography
                    sx={{
                      marginBottom: "1rem",
                      fontSize: media ? "10px" : "null",
                    }}
                  >{`${shirt.name}`}</Typography>
                  <Typography
                    sx={{
                      marginLeft: media ? "2rem" : "5rem",
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
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Box
                      sx={{
                        display: media ? "flex" : "null",
                        flexDirection: media ? "column" : "",
                      }}
                    >
                      <button
                        style={{
                          width: media ? "100%" : "40%",
                          height: "3vh",
                          fontSize: media ? "10px" : "null",
                        }}
                        onClick={() => handleRemoveFromWishlist(shirt)}
                      >
                        remove
                      </button>
                      <button
                        style={{
                          width: media ? "100%" : "40%",
                          height: "4vh",
                          fontSize: media ? "10px" : "null",
                        }}
                        onClick={() => handleaddtocart(shirt)}
                      >
                        Add to cart
                      </button>
                    </Box>
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

export default Wishlist;
