"use client"
import { useState } from "react"
import Link from "next/link"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import BalanceIcon from "@mui/icons-material/Balance"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const pathname = usePathname()

  // Mock authentication state - in a real app, this would come from your auth context
  const isAuthenticated = false

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }
    setDrawerOpen(open)
  }

  const navItems = [
    { title: "Home", path: "/" },
    { title: "How It Works", path: "/how-it-works" },
    { title: "Services", path: "/services" },
    { title: "About Us", path: "/about" },
    { title: "Contact", path: "/contact" },
  ]

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.title}
            component={Link}
            href={item.path}
            className={pathname === item.path ? "bg-indigo-50" : ""}
          >
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
        {!isAuthenticated ? (
          <>
            <ListItem button component={Link} href="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} href="/register">
              <ListItemText primary="Register" />
            </ListItem>
          </>
        ) : (
          <ListItem button component={Link} href="/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
        )}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1} className="bg-white">
        <Toolbar className="container mx-auto">
          <Link href="/" className="flex items-center mr-4">
            <BalanceIcon className="mr-2 text-indigo-600" />
            <Typography variant="h6" component="div" className="font-bold text-indigo-600">
              DisputeResolve
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" } }} className="space-x-4">
            {navItems.map((item) => (
              <Button
                key={item.title}
                component={Link}
                href={item.path}
                color="inherit"
                className={pathname === item.path ? "text-indigo-600" : ""}
              >
                {item.title}
              </Button>
            ))}
          </Box>

          {/* Authentication Buttons - Desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" } }} className="ml-4">
            {!isAuthenticated ? (
              <>
                <Button color="inherit" component={Link} href="/login" className="mr-2">
                  Login
                </Button>
                <Button variant="contained" color="primary" component={Link} href="/register">
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} href="/dashboard" className="mr-2">
                  Dashboard
                </Button>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem component={Link} href="/profile" onClick={handleMenuClose}>
                    Profile
                  </MenuItem>
                  <MenuItem component={Link} href="/settings" onClick={handleMenuClose}>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </>
  )
}
