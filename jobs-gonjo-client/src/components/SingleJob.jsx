import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button, ButtonGroup } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useCategoryName } from "../context/CategoryNameContext";
import ViewModal from "./modal/ViewJobs";
import SubCategoryPost from "./modal/SubCategoryPost";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Swal from "sweetalert2";
import RemoveIcon from "@mui/icons-material/Remove";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const SingleJob = ({ job, shouldReload, setShouldReload }) => {
  const { categoryName, _id, userEmail } = job;
  const {
    categoryNameContext,
    setCategoryNameContext,
    setSubCategoryForEdit,
    isRecruiter,
  } = useCategoryName();
  const [singleSubCategory, setSingleSubCategory] = useState(null);
  const ref = useRef();
  const [subCategories, setSubCategories] = useState([]);
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const handleThreeDots = () => {
    setShow(!show);
  };

  useEffect(() => {
    fetch(`https://jobserver-xyvn.onrender.com/subcategories`)
      .then((res) => res.json())
      .then((data) => {
        const filteredSubCategories = data.filter(
          (subCategory) => subCategory.categoryName === categoryName
        );
        setSubCategories(filteredSubCategories);
      });
  }, [shouldReload]);

  const handleOpenCat = (cat) => {
    setShow(false);
    if (categoryNameContext === cat) {
      return setCategoryNameContext("");
    } else {
      setCategoryNameContext(cat);
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setShouldReload(true);
  };

  const [isSubPostModalOpen, setSubPostModalOpen] = useState(false);
  const handleSubPostOpenModal = () => {
    setSubPostModalOpen(true);
  };
  const handleSubPostCloseModal = () => {
    setSubPostModalOpen(false);
    setShouldReload(true);
  };
  const handleView = (subCategory) => {
    handleOpenModal();
    setSingleSubCategory(subCategory);
    setSubCategoryForEdit(subCategory);
  };

  const handleCategoryDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/categories/${id}`)
          .then((response) => {
            const data = response.data;
            if (data.deletedCount > 0) {
              try {
                const response = axiosSecure.delete("/deleteMany", {
                  data: { categoryName: categoryName },
                });
              } catch (error) {
                console.error("Error during deleteMany operation:", error);
              }
              setShouldReload(true);
              Swal.fire(
                "Deleted!",
                "The Category has been permanently deleted.",
                "success"
              );
            }
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
          });
      }
    });
  };

  const handleSubCategoryDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/subcategories/${id}`)
          .then((response) => {
            const data = response.data;
            if (data.deletedCount > 0) {
              setShouldReload(true);
              Swal.fire(
                "Deleted!",
                "This Position has been permanently deleted.",
                "success"
              );
            }
          })
          .catch((error) => {
            console.error("Error deleting subcategory:", error);
            // Handle error if needed
          });
      }
    });
  };
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        border:
          categoryNameContext === categoryName
            ? "2px solid rgb(24, 47, 92)"
            : "2px solid rgba(0,0,0,.2)",
        mt: "10px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            p: 2,
          }}
          onClick={() => handleOpenCat(categoryName)}
        >
          <Typography
            sx={{
              textAlign: "start",
              color: "rgba(0, 0, 0, 0.60)",
              fontSize: "19px",
              fontWeight: "600",
            }}
          >
            {categoryName}
          </Typography>
          {categoryNameContext === categoryName ? (
            <RemoveIcon sx={{ color: "rgba(0, 0, 0, 0.60)," }} />
          ) : (
            <AddIcon sx={{ color: "rgba(0, 0, 0, 0.60)" }} />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            position: "relative",
          }}
        >
          <Box
            ref={ref}
            sx={{
              cursor: "default",
              border: "1px solid black",
              width: "300px",
              height: "100px",
              py: 2,
              px: 3,
              position: "absolute",
              right: "80%",
              top: -10,
              bgcolor: "white",
              borderRadius: "5px",
              gap: 3,
              zIndex: 100,
              display: show ? "block" : "none",
            }}
          >
            <HighlightOffIcon
              onClick={() => setShow(false)}
              sx={{
                position: "absolute",
                right: -5,
                top: -5,
                color: "black",
                cursor: "pointer",
              }}
            />
            {userEmail === user?.email ? (
              <Button
                onClick={() => handleCategoryDelete(_id)}
                disabled={user?.email !== userEmail}
                sx={{
                  border: "1px solid red",
                  borderRadius: "2px",
                  color: "red",
                  py: 1,
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Delete
              </Button>
            ) : (
              ""
            )}
            <Typography
              onClick={() => handleOpenCat(categoryName)}
              disabled={user?.email !== userEmail}
              sx={{
                mt: 2,
                border: "1px solid black",
                borderRadius: "2px",
                color: "black",
                py: 1,
                cursor: "pointer",
              }}
            >
              View All Positions
            </Typography>
          </Box>
          <MoreVertIcon onClick={handleThreeDots} sx={{ p: 1 }} />
        </Box>
      </Box>
      <Box
        sx={{
          width: "97%",
          mx: "auto",
          mt: "2px",
          mb: 2,
          color: "black",
          display: categoryNameContext === categoryName ? "block" : "none",
        }}
      >
        {subCategories?.map((item, index) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: "10px",
              bgcolor: "white",
              pl: "10px",
              fontWeight: "600",
              borderRadius: "4px",
            }}
            key={index}
          >
            <Typography
              sx={{ fontWeight: "600", color: "rgba(0, 0, 0, 0.60)" }}
            >
              {item?.subCategoryName}
            </Typography>
            <ButtonGroup
              sx={{ borderColor: "rgb(24, 47, 92)" }}
              variant="outlined"
              aria-label="outlined button group"
            >
              {isRecruiter ? (
                <Button
                  onClick={() => handleView(item)}
                  sx={{
                    borderColor: "rgb(24, 47, 92)",
                    color: "rgb(24, 47, 92)",
                    ":hover": {
                      borderColor: "rgb(24, 47, 92)",
                    },
                  }}
                >
                  View details
                </Button>
              ) : (
                <Button
                  onClick={() => handleView(item)}
                  sx={{
                    borderColor: "rgb(24, 47, 92)",
                    color: "rgb(24, 47, 92)",
                    ":hover": {
                      borderColor: "rgb(24, 47, 92)",
                    },
                  }}
                >
                  Apply Now
                </Button>
              )}
              {item?.userEmail === user?.email ? (
                <Button
                  onClick={() => handleSubCategoryDelete(item._id)}
                  sx={{
                    color: "red",
                    borderColor: "red",
                    ":hover": {
                      borderColor: "red",
                    },
                  }}
                  // disabled={user?.email !== item?.userEmail}
                >
                  Remove
                </Button>
              ) : (
                ""
              )}
            </ButtonGroup>
          </Box>
        ))}
        <ViewModal
          singleSubCategory={singleSubCategory}
          open={isModalOpen}
          onClose={handleCloseModal}
          shouldReload={shouldReload}
          setShouldReload={setShouldReload}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          {" "}
          {isRecruiter && (
            <Button
              onClick={handleSubPostOpenModal}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderColor: "rgb(24, 47, 92)",
                color: "rgb(24, 47, 92)",
                ":hover": {
                  borderColor: "rgb(24, 47, 92)",
                },
              }}
              variant="outlined"
            >
              Create new position
              <CreateIcon />
            </Button>
          )}
        </Box>
        <SubCategoryPost
          open={isSubPostModalOpen}
          onClose={handleSubPostCloseModal}
        />
      </Box>
    </Box>
  );
};

export default SingleJob;
