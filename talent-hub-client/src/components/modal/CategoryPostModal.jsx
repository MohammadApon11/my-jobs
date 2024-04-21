import React from "react";
import { Button, TextField, Typography, Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const CategoryPostModal = ({ open, onClose, handleCloseModal }) => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const categoryData = {
      userEmail: data?.userEmail,
      categoryName: data.categoryName,
      availableLocations: [
        data.country1.toLowerCase(),
        data.country2.toLowerCase(),
      ],
    };
    console.log(categoryData);
    axiosSecure.post("/categories", categoryData).then((res) => {
      if (res.data.insertedId) {
        reset();
        handleCloseModal();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New Category Succefully Added",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <Modal
      sx={{ msOverflowY: "auto" }}
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          zIndex: -1,
        }}
      >
        <Box
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            overflowY: "auto",
            maxHeight: "80vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "15px",
          }}
          component="form"
        >
          <TextField
            {...register("userEmail", { required: true })}
            label="Can't Change Read Only!"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user?.email}
          />
          <TextField
            {...register("categoryName", { required: true })}
            label="Type Job Category Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          {errors.categoryName && (
            <Typography sx={{ color: "red", fontSize: "13px" }}>
              This field is required
            </Typography>
          )}
          <TextField
            {...register("country1", { required: true })}
            label="Available Country 1"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          {errors.country1 && (
            <Typography sx={{ color: "red", fontSize: "13px" }}>
              This field is required
            </Typography>
          )}
          <TextField
            {...register("country2")}
            label="Available Country 2"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "end", mt: 3 }}>
            <Button
              sx={{
                bgcolor: "rgb(24, 47, 89)",
                ":hover": {
                  bgcolor: "rgb(24, 47, 89)",
                },
              }}
              type="submit"
              variant="contained"
            >
              Post
            </Button>
          </Box>
        </Box>
        <Box
          onClick={onClose}
          sx={{
            position: "absolute",
            top: -20,
            right: -18,
            bgcolor: "#5bbc2e",
            borderRadius: "50%",
            width: "60px",
            height: "57px",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <CloseIcon
            sx={{ border: "1px solid white", borderRadius: "50%", p: "2px" }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default CategoryPostModal;
