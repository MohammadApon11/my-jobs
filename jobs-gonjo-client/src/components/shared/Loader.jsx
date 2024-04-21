import { ScaleLoader } from "react-spinners";
import { Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScaleLoader size={80} color="blue" />
    </Box>
  );
};

export default Loader;
