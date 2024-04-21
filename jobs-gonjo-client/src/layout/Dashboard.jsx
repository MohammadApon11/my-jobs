import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  AppBar,
  Typography,
  Toolbar,
  Grid,
  Button,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { Svgs } from "../data/data";
import "../App.css";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("userRole");
      })
      .catch(() => {});
  };
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <AppBar
        sx={{
          bgcolor: "rgb(24, 47, 89)",
          px: 0.7,
          py: 1.4,
          width: "100vw",
          position: "fixed",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Your Image Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
          >
            <IconButton edge="start" color="inherit" aria-label="menu">
              <img
                style={{ width: "40px", height: "40px" }}
                src="logo.png"
                alt="Icon"
              />
            </IconButton>
            <Box>
              <Typography sx={{ fontWeight: "800", fontSize: "20px" }}>
                Jobs Gonjo
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>
                Shaping Tomorrows Cybersecurity
              </Typography>
            </Box>
          </Box>
          {user && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Typography>{user?.displayName}</Typography>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <img
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  src={user?.photoURL}
                  alt="Icon"
                />
              </IconButton>
              <Button
                sx={{
                  bgcolor: "white",
                  color: "black",
                  ":hover": { bgcolor: "white" },
                }}
                variant="contained"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Grid
        container
        component="main"
        sx={{ width: "100vw", overflow: "hidden" }}
      >
        <Grid
          sx={{
            borderRight: 1,
            boxShadow: "rgb(24, 42, 89) 1px 1px 6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.2,
            px: 2,
            pt: 3,
            height: "100vh",
            position: "fixed",
            left: 0,
            top: "85px",
            bgcolor: "white",
          }}
          item
          xs={false}
          sm={4}
          md={0.5}
        >
          {Svgs.map((item, index) => (
            <Box
              className="navItem"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.7,
                position: "relative",
              }}
              edge="start"
              color="inherit"
              aria-label="menu"
              key={index}
            >
              {item.icon}
              {item.path === "/" ? (
                <Box
                  sx={{ height: "1px", width: "45px", bgcolor: "gray" }}
                ></Box>
              ) : item.path === "my-jobs" ? (
                <Box
                  sx={{ height: "1px", width: "45px", bgcolor: "gray" }}
                ></Box>
              ) : item.path === "view-cv" ? (
                <Box
                  sx={{ height: "1px", width: "45px", bgcolor: "gray" }}
                ></Box>
              ) : (
                <Box
                  sx={{ height: "1px", width: "45px", bgcolor: "gray" }}
                ></Box>
              )}
              <Box
                sx={{ position: "absolute", left: "68px" }}
                className="toolTip"
              >
                {item.subTitle}
              </Box>
            </Box>
          ))}
        </Grid>
        <Grid item xs={false} sm={4} md={11.5}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Dashboard;
