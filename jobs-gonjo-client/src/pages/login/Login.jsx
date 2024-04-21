import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  ButtonGroup,
  Paper,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/AuthProviders";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { saveUser } from "../../hooks/useSaveUser";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [error, setError] = useState("");
  const [roleError, setRoleError] = useState("");
  const { googleLogIn, gitHubLogIn, logIn, loading, setLoading } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGoogle = () => {
    Swal.fire({
      title: "If you login with Google. Then you can only apply and view, ",
      text: "You Can't Post jobs!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I am Job Seeker",
    }).then((result) => {
      if (result.isConfirmed) {
        googleLogIn()
          .then((result) => {
            const createdUser = result.user;
            const userDetails = { ...createdUser, role: "seeker" };
            saveUser(userDetails);
            Swal.fire({
              title: "Logged in successfully with Google",
              icon: "success",
            });
            navigate("/");
          })
          .catch((error) => {
            // setError("Something went wrong with your Google account");
            setError(error.message);
          });
      } else {
        // User cancelled the action
        Swal.fire({
          title: "Cancelled",
          text: "Login with google has been cancelled.",
          icon: "info",
        });
      }
    });
  };

  const handleGitHub = () => {
    Swal.fire({
      title: "If you login with your github. Then you can only apply and view,",
      text: "You Can't Post jobs!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I am a job seeker",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with GitHub login
        gitHubLogIn()
          .then((result) => {
            const createdUser = result.user;
            const userDetails = { ...createdUser, role: "seeker" };
            saveUser(userDetails);
            Swal.fire({
              title: "Logged in successfully with GitHub!",
              icon: "success",
            });
            // Redirect or perform any other actions after successful login
            navigate("/");
          })
          .catch((error) => {
            setError("Something went wrong with your GitHub account");
          });
      } else {
        // User cancelled the action
        Swal.fire({
          title: "Cancelled",
          text: "Login with github has been cancelled.",
          icon: "info",
        });
      }
    });
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const onSubmit = async (data) => {
    setError("");
    setRoleError("");

    // Fetch user data
    const userDataResponse = await fetch(
      `https://jobserver-xyvn.onrender.com/users/${data.email}`
    );
    const userData = await userDataResponse.json();

    if (!userData || userData.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      setError(
        "Account not found. please provide valid email address and password."
      );
      return;
    }

    // Check if the userRole matches the fetched role
    if (data.userRole !== userData.user.role) {
      setRoleError("Invalid Account Type. Please provide valid Type.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      return;
    }

    // Proceed with login
    logIn(data.email, data.password)
      .then((result) => {
        toast.success("Successfully logged in");
        const loggedUser = result.user;
        localStorage.setItem("userRole", data.userRole);
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.message === "Firebase: Error (auth/invalid-credential).") {
          setError(
            "Email or Password is Incorrect! Please Provide Valid Credential"
          );
        } else {
          setError(error.message);
          console.log(error.message);
        }
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const handleChange = (event) => {
    setUserRole(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Grid
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ mt: 3 }} component="h1" variant="h3">
            Login to jobs Gonjo
          </Typography>
          <Typography sx={{ mt: 8 }} component="h1" variant="h5">
            Log in with Email
          </Typography>
          <Grid
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1, width: "70%" }}
          >
            <TextField
              {...register("email", { required: true })}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
            />
            {errors.email && (
              <Typography sx={{ color: "red", fontSize: "13px" }}>
                Email is required
              </Typography>
            )}
            {error && (
              <Typography sx={{ color: "red", fontSize: "13px" }}>
                {error}
              </Typography>
            )}
            <Box sx={{ position: "relative" }}>
              <TextField
                {...register("password", { required: true })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={type}
                id="password"
                autoComplete="current-password"
              />
              <Typography
                sx={{
                  position: "absolute",
                  right: "60px",
                  mt: "5%",
                  cursor: "pointer",
                }}
                onClick={handleToggle}
                variant="body1"
                component="span"
              >
                <Icon icon={icon} size={20} />
              </Typography>
              {error && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  {error}
                </Typography>
              )}
              {errors.password && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  Password is Required
                </Typography>
              )}
            </Box>
            <Box sx={{ mt: 1, display: "flex", justifyContent: "end" }}>
              <FormControl
                sx={{ minWidth: 120, maxWidth: 320, border: "none" }}
                fullWidth
              >
                <InputLabel id="demo-controlled-open-select-label">
                  Select your registered account type
                </InputLabel>
                <Select
                  {...register("userRole", {
                    required: true,
                  })}
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={userRole}
                  label="Select your registered account type"
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem defaultValue={userRole} value="seeker">
                    I am candidate
                  </MenuItem>
                  <MenuItem defaultValue={userRole} value="recruiter">
                    I am a recruiter
                  </MenuItem>
                </Select>
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  {errors.userRole
                    ? "Please select your account type"
                    : roleError
                    ? roleError
                    : ""}
                </Typography>
              </FormControl>
            </Box>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.7,
                bgcolor: "rgb(24, 47, 89)",
                ":hover": {
                  bgcolor: "rgb(24, 47, 89)",
                },
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              Login
              {loading ? (
                <TbFidgetSpinner className="spinIcon" size={24} />
              ) : (
                ""
              )}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link sx={{ color: "#4026E8" }} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Typography sx={{ mt: 5 }} component="h1" variant="h5">
            Log in with Social
          </Typography>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button
              onClick={handleGoogle}
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                py: 1,
                width: 200,
                display: "flex",
                gap: 1,
                borderColor: "rgb(24, 47, 89)",
                color: "rgb(24, 47, 89)",
              }}
            >
              <FcGoogle style={{ fontSize: "24px" }} /> Google
            </Button>
            <Button
              onClick={handleGitHub}
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                py: 1,
                width: 200,
                display: "flex",
                gap: 1,
                borderColor: "rgb(24, 47, 89)",
                color: "rgb(24, 47, 89)",
              }}
            >
              <GitHubIcon /> Github
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Login;
