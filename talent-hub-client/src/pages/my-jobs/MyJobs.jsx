import React, { useEffect, useState } from "react";
import SectionGap from "../../components/gap's/SectionGap";
import { Box, Button, Typography } from "@mui/material";
import Hero from "../../components/shared/Hero";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useCategoryName } from "../../context/CategoryNameContext";
import Swal from "sweetalert2";

const MyJobs = () => {
  const [myCategories, setMyCategories] = useState([]);
  const [mySubCategories, setSubMyCategories] = useState([]);
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { isRecruiter } = useCategoryName();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/mycategories/${user?.email}`)
        .then((response) => setMyCategories(response.data))
        .catch((error) => {
          // Handle error, if needed
          console.error("Error fetching data:", error);
        });
    }
  }, [user, setMyCategories, setShouldReload]);

  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/mysubcategories/${user?.email}`)
        .then((response) => setSubMyCategories(response.data))
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [user, setSubMyCategories, shouldReload]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axiosSecure.get(
          `/myApplication/${user?.email || user?.displayName}`
        );
        setApplications(response.data);
      } catch (error) {
        setError("Error fetching applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user?.email, user?.displayName, shouldReload]);

  const handleWithdraw = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Withrdaw My Applications",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/myApplication/${id}`)
          .then((response) => {
            setShouldReload(!shouldReload);
            const data = response.data;
            if (data.deletedCount > 0) {
              setShouldReload(!shouldReload);
              Swal.fire(
                "Deleted!",
                "Your application Withdraw successfully",
                "success"
              );
            }
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
            // Handle error if needed
          });
      }
    });
  };
  
  return (
    <Box >
      <SectionGap />
      <Hero />
      <Box>
        <Typography
          sx={{
            textAlign: "center",
            mt: 5,
            fontSize: "32px",
            fontWeight: "700",
          }}
          component="h3"
        >
          {isRecruiter ? "My All Jobs Here" : "My All Applications Here"}
        </Typography>
        <Box
          sx={{
            width: "70vw",
            mx: "auto",
            height: "1px",
            bgcolor: "black",
            mt: 2,
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            mx: isRecruiter && "auto",
            ml: isRecruiter ? "" : 15,
            gap: 5,
            mt: 5,
          }}
        >
          <Box
            sx={{
              display: isRecruiter && "flex",
              flexDirection: "column",
              gap: 3,
              ml: isRecruiter ? "25%" : "",
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: "20px" }}>
              {isRecruiter && "Created All Position"}
            </Typography>
            {isRecruiter ? (
              mySubCategories.length > 0 ? (
                mySubCategories.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 3,
                      width: "100%",
                      borderRadius: "6px",
                      border: "2px solid black",
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: "600", display: "flex", gap: "3px" }}
                    >
                      Position Category:{" "}
                      <Typography>{item?.categoryName}</Typography>
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        display: "flex",
                        gap: "3px",
                        mt: 1,
                      }}
                    >
                      Position Name:
                      <Typography>{item?.subCategoryName}</Typography>
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        display: "flex",
                        gap: "3px",
                        mt: 1,
                      }}
                    >
                      Applied Candidate:
                      <Typography sx={{ color: "green" }}>
                        {item?.applicantsList?.length
                          }{" "}
                        People Applied this position
                      </Typography>
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography
                  sx={{ color: "red", fontSize: "24px", fontWeight: "700" }}
                >
                  No Job Added...{" "}
                </Typography>
              )
            ) : (
              <>
                {applications.length > 0 ? (
                  applications.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 3,
                        borderRadius: "8px",
                        border: "2px solid gray",
                        width: "300px",
                        mt: 3,
                      }}
                    >
                      <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
                        {item?.subCategoryName}
                      </Typography>{" "}
                      <Button
                        onClick={() => handleWithdraw(item?._id)}
                        variant="contained"
                        sx={{
                          bgcolor: "red",
                          mt: 2,
                          ":hover": { bgcolor: "red" },
                        }}
                      >
                        Withdraw
                      </Button>
                    </Box>
                  ))
                ) : (
                  <Typography
                    sx={{
                      color: "red",
                      fontSize: "24px",
                      fontWeight: "700",
                      ml: 12,
                    }}
                  >
                    You do not applied any job yet...{" "}
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MyJobs;
