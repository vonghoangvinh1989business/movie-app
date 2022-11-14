import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../components/Logo";
import Search from "../components/Search";
import LoginIcon from "@mui/icons-material/Login";

const pages = [
  {
    name: "Discovery",
    link: "/discovery/1",
  },
  {
    name: "Favorite",
    link: "/favorite",
  },
];

function MainHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  // get auth context to use sign out function from auth provider
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    auth.logout(() => {
      navigate("/", { replace: true });
    });
  };

  const handleLogin = () => {
    navigate("/login", { replace: true });
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                textDecoration: "none",
                fontWeight: 600,
                color: "inherit",
              }}
            >
              Home
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((item) => (
                  <MenuItem key={item.name} onClick={handleCloseNavMenu}>
                    <Typography
                      component="a"
                      variant="h6"
                      href={item.link}
                      textAlign="center"
                      sx={{
                        mr: 2,
                        fontWeight: 600,
                        flexGrow: 1,
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Logo sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                fontWeight: 600,
                flexGrow: 1,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Home
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((item) => (
                <Button
                  component="a"
                  href={item.link}
                  key={item.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {auth.user ? (
                <>
                  <Button onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                    <Box mr="5px">
                      <Avatar
                        alt="Remy Sharp"
                        src="../../profile.png"
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "0px",
                        }}
                      ></Avatar>
                    </Box>
                    <Typography variant="body1">
                      {auth?.user.username}
                    </Typography>
                  </Button>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem key="logout" onClick={handleLogout}>
                      <Typography textAlign="center">Log Out</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <MenuItem>
                  <Button
                    onClick={handleLogin}
                    size="medium"
                    color="inherit"
                    startIcon={<LoginIcon />}
                  >
                    <Typography sx={{ textTransform: "capitalize" }}>
                      Sign in
                    </Typography>
                  </Button>
                </MenuItem>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Search placeholder={"Search Movies..."} />
    </>
  );
}
export default MainHeader;
