import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  ButtonGroup,
  MenuItem,
  FormControl,
  Select,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/AuthProviders";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { TbFidgetSpinner } from "react-icons/tb";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { saveUser } from "../../hooks/useSaveUser";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");
  const [open, setOpen] = useState(false);
  const {
    googleLogIn,
    gitHubLogIn,
    signUp,
    updateUserProfile,
    loading,
    setLoading,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const image_url = `https://api.imgbb.com/1/upload?key=efcd76d4ea21a1ed1cbeb60b365d5289`;

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setError("");
    const formData = new FormData();
    formData.append("image", data.image[0]);
    if (data.password !== data.confirmPassword) {
      toast.error("Password Not Matched");
      return setError("Password Doesn't match");
    }

    localStorage.setItem("userRole", data.userRole);

    signUp(data.email, data.password)
      .then((result) => {
        const createdUser = result.user;
        toast.success("Successfully Registered");
        navigate("/");
        setLoading(false);
        fetch(image_url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imgResponse) => {
            if (imgResponse.success) {
              const img = imgResponse.data.display_url;
              updateUserProfile(data.name, img)
                .then(() => {
                  const userDetails = {
                    ...createdUser,
                    role: data?.userRole,
                    companyName: data?.companyName,
                    companyLocation: data?.companyAddress,
                    contactPersonName: data?.contactPersonName,
                    contactPersonEmail: data?.contactPersonEmail,
                  };
                  saveUser(userDetails);
                })
                .catch((error) => {
                  toast.error(error.message);
                  console.log(error.message);
                });
            }
          });
        console.log("from register", createdUser);
      })
      .catch((err) => {
        setError(err.message);
        toast.error(
          err.message === "Firebase: Error (auth/email-already-in-use)."
            ? "The Email Address already Used"
            : "Email is incorrect"
        );
        setLoading(false);
        console.log(err.message);
      });
  };

  const handleGoogle = () => {
    Swal.fire({
      title:
        "If you create an account with Google. Then you can only apply and view, ",
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
              title: "Created in successfully with Google",
              icon: "success",
            });
            navigate("/");
          })
          .catch((error) => {
            setError("Something went wrong with your Google account");
          });
      } else {
        // User cancelled the action
        Swal.fire({
          title: "Cancelled",
          text: "Created account with google has been cancelled.",
          icon: "info",
        });
      }
    });
  };

  const handleGitHub = () => {
    Swal.fire({
      title:
        "If you create an account with your github. Then you can only apply and view,",
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
              title: "Created in successfully with GitHub!",
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
          text: "Created account with github has been cancelled.",
          icon: "info",
        });
      }
    });
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleChange = (event) => {
    if (event.target.value === "seeker") {
      Swal.fire({
        title:
          "If you Create your account as a Seeker, you can only view, and apply for available postion, you can't post any job.",
        showDenyButton: true,
        showCancelButton: true,
        width: 600,
        padding: "3em",
        confirmButtonText: "Yes I am jon Seeker",
        denyButtonText: `I am not a Seeker`,
      }).then((result) => {
        if (result.isConfirmed) {
          setUserRole(event.target.value);
          Swal.fire("Role Saved as Seeker!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Your Role is Not Change", "", "info");
        }
      });
    } else if (event.target.value === "recruiter") {
      Swal.fire({
        title:
          "If you Create your account as a Recruiter, you can post, view, edit, delete for your added jobs position",
        showDenyButton: true,
        showCancelButton: true,
        width: 600,
        padding: "3em",
        confirmButtonText: "Yes I am Recruiter",
        denyButtonText: `I am not a Recruiter`,
      }).then((result) => {
        if (result.isConfirmed) {
          setUserRole(event.target.value);
          Swal.fire("Role Saved as Recruiter!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Your Role is Not Change", "", "info");
        }
      });
    }
    if (event.target.value === "") {
      setUserRole(null);
    }
    setUserRole(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ mt: 3 }} component="h1" variant="h3">
          Register to jobs Gonjo
        </Typography>
        <Typography sx={{ mt: 8 }} component="h1" variant="h5">
          Log in with Email
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Type Your Name"
                autoFocus
                {...register("name", { required: true })}
              />
              {errors.name && (
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  Name is required
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Type Your Email Address"
                name="email"
                autoComplete="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  Email is required
                </Typography>
              )}
              {error === "Firebase: Error (auth/invalid-email)." && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  Please provide a valid email
                </Typography>
              )}
              {error === "Firebase: Error (auth/email-already-in-use)." && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  The email is already in use
                </Typography>
              )}
            </Grid>
            <Grid sx={{ position: "relative" }} item xs={12}>
              <TextField
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                required
                fullWidth
                name="password"
                label="Password"
                type={type}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                autoComplete="new-password"
              />
              <Typography
                sx={{
                  position: "absolute",
                  right: "40px",
                  mt: "14px",
                  cursor: "pointer",
                }}
                onClick={handleToggle}
                variant="body1"
                component="span"
              >
                <Icon icon={icon} size={20} />
              </Typography>
              {errors.password?.type === "required" && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  Password is required
                </Typography>
              )}
              {errors.password?.type === "minLength" && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  Password must be 6 characters
                </Typography>
              )}
              {errors.password?.type === "maxLength" && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  Password must be less than 20 characters
                </Typography>
              )}
              {errors.password?.type === "pattern" && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmedpassword"
                autoComplete="confirmed-password"
                {...register("confirmPassword", { required: true })}
              />
              {errors.password?.type === "required" && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  Confirm Password is required
                </Typography>
              )}
              {error === "Password Doesn't match" && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  {error}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControl
                sx={{ minWidth: 120 }}
                fullWidth
              >
                <InputLabel id="demo-controlled-open-select-label">
                  User Role
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
                  label="User Role"
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem defaultValue={userRole} value="seeker">
                    Create Account as an Jobs Seeker
                  </MenuItem>
                  <MenuItem defaultValue={userRole} value="recruiter">
                    Create Account as an Recruiter
                  </MenuItem>
                </Select>
                {errors.userRole && (
                  <Typography sx={{ color: "red", fontSize: "13px" }}>
                    User Role is required
                  </Typography>
                )}
              </FormControl>
            </Grid>
            {userRole === "recruiter" && (
              <Grid
                item
                xs={12}
                sx={{
                  mx: "auto",
                }}
              >
                <Grid
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: 2,
                  }}
                >
                  <Box>
                    <TextField
                      autoComplete="company-name"
                      name="companyName"
                      required
                      fullWidth
                      id="companyName"
                      label="Type Your Company Name"
                      autoFocus
                      {...register("companyName", { required: true })}
                    />
                    {errors.companyName && (
                      <Typography sx={{ color: "red", fontSize: "12px" }}>
                        Company Name is required
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    {" "}
                    <TextField
                      xs={{ width: "100%" }}
                      autoComplete="compnay-address"
                      name="companyAddress"
                      required
                      fullWidth
                      id="companyAddress"
                      label="Type Your Company Address"
                      autoFocus
                      {...register("companyAddress", { required: true })}
                    />
                    {errors.companyAddress && (
                      <Typography sx={{ color: "red", fontSize: "12px" }}>
                        Company Address is required
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <TextField
                      autoComplete="contact-person-name"
                      name="contactPersonName"
                      required
                      fullWidth
                      id="contactPersonName"
                      label="Type Contact Person Name"
                      autoFocus
                      {...register("contactPersonName", { required: true })}
                    />
                    {errors.contactPersonName && (
                      <Typography sx={{ color: "red", fontSize: "12px" }}>
                        Contact Person Name is required
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <TextField
                      autoComplete="contact-person-email"
                      name="contactPersonEmail"
                      required
                      fullWidth
                      id="contactPersonEmail"
                      label="Type Contact Person Email"
                      autoFocus
                      {...register("contactPersonEmail", { required: true })}
                    />
                    {errors.contactPersonEmail && (
                      <Typography sx={{ color: "red", fontSize: "12px" }}>
                        Contact Person Email Is Required
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <InputLabel sx={{ my: 1 }} htmlFor="input-file">
                Upload Your Photo
              </InputLabel>
              <Input
                {...register("image", { required: true })}
                id="input-file"
                type="file"
                onChange={handleFileChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="upload file"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.image?.type === "required" && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  Photo is Required
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.7,
              bgcolor: "rgb(24, 47, 89)",
              borderRadius: 2,
              ":hover": {
                bgcolor: "rgb(24, 47, 89)",
              },
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {" "}
            Register
            {loading ? <TbFidgetSpinner className="spinIcon" size={24} /> : ""}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link sx={{ color: "#4026E8" }} to="/login" variant="body2">
                Already have an account? log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography
        sx={{ mt: 5, textAlign: "center" }}
        component="h1"
        variant="h5"
      >
        Log in with Social
      </Typography>
      <ButtonGroup
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        variant="outlined"
        aria-label="outlined button group"
      >
        <Button
          onClick={handleGoogle}
          type="submit"
          fullWidth
          variant="outlined"
          sx={{
            mt: 3,
            mb: 2,
            py: 1,
            width: 195,
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
            width: 195,
            display: "flex",
            gap: 1,
            borderColor: "rgb(24, 47, 89)",
            color: "rgb(24, 47, 89)",
          }}
        >
          <GitHubIcon /> Github
        </Button>
      </ButtonGroup>
    </Container>
  );
};
export default Register;
