import React, { useState } from "react";
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Toolbar,
  IconButton,
  Input,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const Navbar = ({ hideSearch, onSearchChange }) => {
  const showMenuIcon = useMediaQuery("(max-width:600px)");
  const [showTabs, setShowTabs] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  const handleMenuClick = () => {
    setShowTabs(!showTabs);
    setShowCloseIcon(!showCloseIcon);
  };

  return (
    <Box>
      <AppBar color={"inherit"}>
        <Toolbar>
          <h2>FashionCart</h2>
          {!hideSearch && (
            <Box
              sx={{
                width: "35%",
                marginLeft: "10rem",
                display: "flex",
                alignItems: "center",
                paddingLeft: "0.5rem",
              }}
            >
              <Link to={"/products"}>
                <Input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => onSearchChange(e.target.value)}
                />
                <SearchIcon />
              </Link>
            </Box>
          )}

          <Box width={"10%"} margin={"auto"}>
            {showMenuIcon && (
              <IconButton onClick={handleMenuClick}>
                {showCloseIcon ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
          </Box>
          <Box
            display={!showMenuIcon || showTabs ? "block" : "none"}
            alignItems="center"
            justifyContent="center"
            marginLeft="-20rem"
          >
            <Tabs orientation={showMenuIcon ? "vertical" : "horizontal"}>
              <Link to={"/"}>
                <Tab
                  sx={{
                    color: "black",
                  }}
                  label="Home"
                />
              </Link>
              <Link to={"/products"}>
                <Tab
                  sx={{
                    color: "black",
                  }}
                  label="Products"
                />
              </Link>
              <Link to={"/Cart"}>
                <IconButton>
                  <ShoppingCartIcon />
                </IconButton>
              </Link>
              <Link to={"/wishlist"}>
                <IconButton>
                  <FavoriteBorderIcon />
                </IconButton>
              </Link>
              <Link to={"/myorders"}>
                <Tab
                  sx={{
                    color: "black",
                  }}
                  label="My orders"
                />
              </Link>
              <Link to="/login">
                <Tab
                  sx={{
                    color: "black",
                  }}
                  label="Login"
                />
              </Link>
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
