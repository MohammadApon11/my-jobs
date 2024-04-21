import { Box, TextField, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SectionGap from "../../components/gap's/SectionGap";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Hero from "../../components/shared/Hero";
import Swal from "sweetalert2";
import { saveMyAppliedJobs } from "../../hooks/useAppliedMyJobs";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Apply = () => {
  const { _id } = useParams();
  const [positionData, setPositionData] = useState(null);
  const [axiosSecure] = useAxiosSecure();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get(`/subcategories/${_id}`);
        setPositionData(response.data);
      } catch (error) {
        console.error("Error fetching position data:", error);
      }
    };

    fetchData();
  }, [_id]);

  const onSubmit = async (formData) => {
    const applicntDetails = {
      ...formData,
      categoryName: positionData?.categoryName,
      subCategoryName: positionData?.subCategoryName,
    };

    try {
      const response = await axiosSecure.put(
        `/applySubcategories/${positionData._id}`,
        applicntDetails
      );

      if (response.data.success) {
        reset();
        saveMyAppliedJobs(applicntDetails);
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.log("Position not found");
      }
    } catch (error) {
      console.log("Error updating subcategory data:", error.message);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Access the error message returned by the server
        const errorMessage = error.response.data.message;

        // Check if the error message indicates that the email already exists
        if (errorMessage.includes("already applied")) {
          // Handle the case where the email has already been added
          Swal.fire({
            position: "center",
            icon: "error",
            title: errorMessage,
            showConfirmButton: true,
          });
        } else {
          // Handle other error cases
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error submitting application",
            showConfirmButton: true,
          });
        }
      }
    }
  };

  return (
    <Box
      sx={{
        ml: "2%",
      }}
    >
      <SectionGap />
      <Hero />
      {positionData && (
        <Box
          sx={{
            width: "50%",
            mx: "auto",
            mt: 10,
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "32px",
                fontWeight: "700",
                mb: 4,
              }}
            >
              {positionData.subCategoryName}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              <Typography
                component="span"
                sx={{
                  fontWeight: "600",
                  fontSize: "22px",
                  textAlign: "center",
                }}
              >
                Poisition Overview:
              </Typography>{" "}
              {positionData?.overview}
            </Typography>
            <Box>
              <TextField
                {...register("name", { required: true })}
                id="outlined-multiline-flexible"
                label="User Name"
                multiline
                maxRows={4}
                fullWidth
                variant="outlined"
                placeholder="Enter Your Name"
                value={user?.displayName}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errors.name && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  This field is required
                </Typography>
              )}
            </Box>
            <Box>
              <TextField
                {...register("email", { required: true })}
                id="outlined-multiline-flexible"
                label={user?.email ? "Cant't Change your Email" : "User Email"}
                multiline
                maxRows={4}
                fullWidth
                variant="outlined"
                placeholder="Enter Your Email "
                value={user?.email}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errors.email && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  This field is required
                </Typography>
              )}
            </Box>
            <Box>
              <TextField
                {...register("expectedSalary", {
                  required: "This field is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please enter a valid number",
                  },
                })}
                id="outlined-multiline-flexible"
                label="Your Expected salary"
                maxRows={4}
                fullWidth
                variant="outlined"
                placeholder="Please provide number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errors.expectedSalary && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  {errors.expectedSalary.message}
                </Typography>
              )}
              {errors.expectedSalary && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  This field is required
                </Typography>
              )}
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                mb:10,
                bgcolor: "rgb(24, 47, 89)",
                ":hover": {
                  bgcolor: "rgb(24, 47, 89)",

                },
              }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Apply;
