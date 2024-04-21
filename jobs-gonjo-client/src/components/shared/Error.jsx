import { Link } from "react-router-dom";
import { Typography, Container, Button } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: `url('path-to-your-image.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        The page you are looking for might be under construction or does not
        exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ mt: 2 }}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
