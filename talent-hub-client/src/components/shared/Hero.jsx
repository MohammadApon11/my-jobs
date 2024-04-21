import React from "react";
import { Box, Typography,} from "@mui/material";

const Hero = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url("hero.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "200px", // Adjust the height as needed
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        color: "white", // Text color
        textAlign: "center",
        width: "100vw",
        zIndex: "100",
      }}
    >
      <Typography sx={{ fontWeight: "700" }} variant="h4" component="div">
        WORK WORLD WIDE 100+ TOP COMPANIES
      </Typography>
      <Typography variant="subtitle1" component="div">
        Turn your passion into a career
      </Typography>
    </Box>
  );
};

export default Hero;
