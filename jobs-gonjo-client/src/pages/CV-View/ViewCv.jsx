import React from "react";
import SectionGap from "../../components/gap's/SectionGap";
import { Box, Typography } from "@mui/material";

const ViewCv = () => {
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
        View CV page is a work in progress...
      </Typography>
    </Box>
  );
};

export default ViewCv;
