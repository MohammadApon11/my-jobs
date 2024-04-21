import { Box, Typography } from "@mui/material";
import React from "react";
import SectionGap from "../../components/gap's/SectionGap";

const Support = () => {
  return (
    <Box>
      <SectionGap />
      <Typography
        sx={{
          color: "green",
          fontWeight: "700",
          fontSize: "30px",
          ml: "7%",
          mt: 4,
        }}
        component="h1"
      >
        Support page is a work in progress...
      </Typography>
    </Box>
  );
};

export default Support;
