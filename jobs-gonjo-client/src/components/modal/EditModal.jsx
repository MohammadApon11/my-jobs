import React from "react";
import { Button, TextField, Typography, Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useCategoryName } from "../../context/CategoryNameContext";
import useAuth from "../../hooks/useAuth";

const EditModal = ({ open, onClose, shouldReload, setShouldReload }) => {
  const { categoryNameContext, subCategoryForEdit } = useCategoryName();
  const {
    subCategoryName,
    overview,
    responsibilities,
    requirements,
    qualifications,
    companyName,
    officeLocation,
    location,
    salary,
    type,
    level,
    shift,
    _id,
  } = subCategoryForEdit || {};
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const subCategory = {
      categoryName: data.categoryName,
      userEmail: data.userEmail,
      officeLocation: data.officeLocation,
      salary: data.salary,
      type: data.type,
      location: [data.location1, data.location2],
      level: data.level,
      shift: data.shift,
      subCategoryName: data.subCategoryName,
      companyName: data.companyName,
      overview: data.overview,
      responsibilities: [
        data.Responsibilities1,
        data.Responsibilities2,
        data.Responsibilities3,
        data.Responsibilities4,
        data.Responsibilities5,
        data.Responsibilities6,
      ],
      requirements: [
        data.Requirements1,
        data.Requirements2,
        data.Requirements3,
        data.Requirements4,
        data.Requirements5,
        data.Requirements6,
      ],
      qualifications: [
        data.Qualifications1,
        data.Qualifications2,
        data.Qualifications3,
        data.Qualifications4,
        data.Qualifications5,
        data.Qualifications6,
      ],
    };
    try {
      const response = await axiosSecure.put(
        `/subcategories/${_id}`,
        subCategory
      );

      if (response.data.modifiedCount > 0) {
        onClose();
        setShouldReload(true);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Succefully New Sub Category Job Added",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
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
          width: "85%",
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              {...register("categoryName", { required: true })}
              label="Cat't change Category Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={categoryNameContext}
            />
            <TextField
              {...register("userEmail", { required: true })}
              id="outlined-multiline-flexible"
              label="Cat't change User Email"
              value={user?.email}
              multiline
              maxRows={4}
              fullWidth
              variant="outlined"
              placeholder="Enter your text here"
            />
            <TextField
              {...register("subCategoryName", { required: true })}
              id="outlined-multiline-flexible"
              label="Position Name"
              multiline
              maxRows={4}
              fullWidth
              variant="outlined"
              placeholder="Enter your text here"
              defaultValue={subCategoryName}
            />
            {errors.subCategoryName && (
              <Typography sx={{ color: "red", fontSize: "13px" }}>
                This field is required
              </Typography>
            )}
            <Box>
              <TextField
                id="outlined-multiline-flexible"
                label="Company Name"
                multiline
                maxRows={4}
                fullWidth
                variant="outlined"
                placeholder="Enter your Company Name"
                {...register("companyName", { required: true })}
                defaultValue={companyName}
              />
              {errors.companyName && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  This field is required
                </Typography>
              )}
            </Box>
            <Box>
              <TextField
                {...register("overview", { required: true })}
                id="outlined-multiline-flexible"
                label="Job Overview"
                multiline
                maxRows={4}
                fullWidth
                variant="outlined"
                placeholder="Enter your overview"
                defaultValue={overview}
              />
              {errors.overview && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  This field is required
                </Typography>
              )}
            </Box>
            <Box>
              <TextField
                {...register("officeLocation", { required: true })}
                id="outlined-multiline-flexible"
                label="Company Location"
                multiline
                maxRows={4}
                fullWidth
                variant="outlined"
                placeholder="Enter your company Loacation"
                defaultValue={officeLocation}
              />
              {errors.officeLocation && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  This field is required
                </Typography>
              )}
            </Box>
            <Box>
              <TextField
                {...register("salary", { required: true })}
                id="outlined-multiline-flexible"
                label="Salary"
                multiline
                maxRows={4}
                fullWidth
                variant="outlined"
                placeholder="Enter your the position salary"
                defaultValue={salary}
              />
              {errors.salary && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  This field is required
                </Typography>
              )}
            </Box>
            <Box>
              <TextField
                {...register("type", { required: true })}
                id="outlined-multiline-flexible"
                label="Job Type"
                multiline
                maxRows={4}
                fullWidth
                variant="outlined"
                placeholder="Enter The Job Type"
                defaultValue={type}
              />
              {errors.type && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  This field is required
                </Typography>
              )}
            </Box>
            <Box>
              <TextField
                {...register("level", { required: true })}
                id="outlined-multiline-flexible"
                label="Job Level"
                multiline
                maxRows={4}
                fullWidth
                variant="outlined"
                placeholder="Enter The Job Level"
                defaultValue={level}
              />
              {errors.level && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  This field is required
                </Typography>
              )}
            </Box>
            <Box>
              <TextField
                {...register("shift", { required: true })}
                id="outlined-multiline-flexible"
                label="Shift"
                multiline
                maxRows={4}
                fullWidth
                variant="outlined"
                placeholder="Enter job shift"
                defaultValue={shift}
              />
              {errors.shift && (
                <Typography sx={{ color: "red", fontSize: "13px" }}>
                  This field is required
                </Typography>
              )}
            </Box>
          </Box>
          <Typography sx={{ mt: 2, fontSize: "18px", fontWeight: "600" }}>
            Available Location:
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              mt: 1,
            }}
          >
            <TextField
              {...register("location1", { required: true })}
              id="outlined-multiline-flexible"
              label="The Job Available Location1?"
              multiline
              maxRows={4}
              fullWidth
              variant="outlined"
              placeholder="Enter Available Location"
              defaultValue={location?.[0]}
            />
            {errors.location1 && (
              <Typography sx={{ color: "red", fontSize: "13px" }}>
                This field is required
              </Typography>
            )}
            <TextField
              {...register("location2")}
              id="outlined-multiline-flexible"
              label="The Job Available Location2?"
              multiline
              maxRows={4}
              fullWidth
              variant="outlined"
              placeholder="Enter Available Location"
              defaultValue={location?.[1]}
            />
          </Box>
          <Typography sx={{ mt: 2, fontSize: "18px", fontWeight: "600" }}>
            Responsibilities:
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              mt: 1,
            }}
          >
            {responsibilities?.map((item, index) => (
              <TextField
                {...register(`Responsibilities${index + 1}`)}
                key={index}
                id="outlined-multiline-flexible"
                label={`Responsibilities${index + 1}`}
                multiline
                maxRows={4}
                fullWidth
                variant="outlined"
                placeholder="Enter your text here"
                defaultValue={item}
              />
            ))}
          </Box>
          <Typography sx={{ mt: 2, fontSize: "18px", fontWeight: "600" }}>
            Requirements:
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              mt: 1,
            }}
          >
            {requirements?.map((item, index) => (
              <TextField
                {...register(`Requirements${index + 1}`)}
                key={index}
                id="outlined-multiline-flexible"
                label={`Requirements${index + 1}`}
                multiline
                maxRows={4}
                fullWidth
                variant="outlined"
                placeholder="Enter your text here"
                defaultValue={item}
              />
            ))}
          </Box>
          <Typography sx={{ mt: 2, fontSize: "18px", fontWeight: "600" }}>
            Qualifications:
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              mt: 1,
            }}
          >
            {qualifications?.map((item, index) => (
              <TextField
                {...register(`Qualifications${index + 1}`)}
                key={index}
                id="outlined-multiline-flexible"
                label={`Qualifications${index + 1}`}
                multiline
                maxRows={4}
                fullWidth
                variant="outlined"
                placeholder="Enter your text here"
                defaultValue={item}
              />
            ))}
          </Box>
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
              Update
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

export default EditModal;
