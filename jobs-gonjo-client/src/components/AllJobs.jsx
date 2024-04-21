import React, { useEffect, useState } from "react";
import Hero from "./shared/Hero";
import SectionGap from "./gap's/SectionGap";
import { Box, Typography, ButtonGroup, Button, Container } from "@mui/material";
import { FilterBtn } from "../data/data";
import SingleJob from "./SingleJob";
import CreateIcon from "@mui/icons-material/Create";
import CategoryPostModal from "./modal/CategoryPostModal";
import { useCategoryName } from "../context/CategoryNameContext";

const AllJobs = () => {
  const [filterText, setFilterText] = useState("All Location");
  const [allJobs, setAllJobs] = useState([]);
  const [filterJobs, setFilterJobs] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);
  const { isRecruiter } = useCategoryName();

  useEffect(() => {
    fetch(`https://jobserver-xyvn.onrender.com/categories`)
      .then((res) => res.json())
      .then((data) => {
        setAllJobs(data);
      });
    setShouldReload(false);
  }, [shouldReload]);

  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setShouldReload(true);
  };

  const handleFilterText = (item) => {
    setFilterText(item);
    fetch(
      `https://jobserver-xyvn.onrender.com/categoriesFilter${
        item === "All Location" ? "" : `?location=${item.toLowerCase()}`
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setFilterJobs(data);
      });
  };

  return (
    <Box sx={{ width: "100vw", mb: 10 }}>
      <SectionGap />
      <Hero />
      <SectionGap />
      <Container sx={{ textAlign: "center" }}>
        <Box
          sx={{ width: "60px", height: "7px", bgcolor: "#5bbc2e", mx: "auto" }}
        />
        <Typography sx={{ mt: 2, fontWeight: "600" }} variant="h4">
          BROWSE OPEN POSITIONS BY CATEGORY
        </Typography>
        <Typography sx={{ fontSize: "18px", mt: "4px" }}>
          We are always on the lookout for talented people
        </Typography>
        <Box sx={{ mt: 3 }}>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            {FilterBtn.map((item, index) => (
              <Button
                onClick={() => handleFilterText(item)}
                sx={{
                  fontWeight: "600",
                  borderColor: "black",
                  backgroundColor: item === filterText ? "black" : "initial",
                  color: item === filterText ? "white" : "initial",
                  ":hover": {
                    backgroundColor: item === filterText && "black",
                  },
                }}
                key={index}
              >
                {item}{" "}
                {item === "Bangladesh" ? (
                  <img
                    style={{ width: "20px", marginLeft: "6px" }}
                    src="bd.svg"
                    alt=""
                  />
                ) : item === "India" ? (
                  <img
                    style={{ width: "20px", marginLeft: "6px" }}
                    src="in.svg"
                    alt=""
                  />
                ) : (
                  ""
                )}
              </Button>
            ))}
          </ButtonGroup>
          <Box sx={{ mt: "35px" }}>
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
                  onClick={handleOpenModal}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "rgb(24, 47, 89)",
                    ":hover": {
                      bgcolor: "rgb(24, 47, 92)",
                    },
                  }}
                  variant="contained"
                >
                  Create a New Category Job
                  <CreateIcon />
                </Button>
              )}
            </Box>
            {allJobs.length > 0 ? (
              filterText === "All Location" ? (
                allJobs?.length < 0 ? (
                  <Typography sx={{ textAlign: "center", fontSize: "40px" }}>
                    Loading...
                  </Typography>
                ) : (
                  allJobs?.map((job, index) => (
                    <SingleJob
                      job={job}
                      key={index}
                      shouldReload={shouldReload}
                      setShouldReload={setShouldReload}
                    />
                  ))
                )
              ) : filterJobs?.length < 0 ? (
                <Typography sx={{ textAlign: "center", fontSize: "40px" }}>
                  Loading...
                </Typography>
              ) : (
                filterJobs?.map((job, index) => (
                  <SingleJob
                    job={job}
                    key={index}
                    shouldReload={shouldReload}
                    setShouldReload={setShouldReload}
                  />
                ))
              )
            ) : (
              <Typography>
                Need to reload becouse jobs gonjo server deploy on vercel and
                vercel somtimes sending response to late or wait few seconds...
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
      <CategoryPostModal
        open={isModalOpen}
        onClose={handleCloseModal}
        handleCloseModal={handleCloseModal}
      />
    </Box>
  );
};

export default AllJobs;
