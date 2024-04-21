import React, { useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { SiPolkadot } from "react-icons/si";
import CloseIcon from "@mui/icons-material/Close";
import EditModal from "./EditModal";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useCategoryName } from "../../context/CategoryNameContext";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const ViewModal = ({
  open,
  onClose,
  singleSubCategory,
  shouldReload,
  setShouldReload,
}) => {
  const {
    subCategoryName,
    overview,
    responsibilities,
    requirements,
    qualifications,
    officeLocation,
    location,
    salary,
    type,
    level,
    shift,
    _id,
    companyName,
    userEmail,
  } = singleSubCategory || {};
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { isRecruiter } = useCategoryName();
  const { user } = useAuth();

  const handleOpenEditModal = () => {
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    onClose();
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
        }}
      >
        <Box
          sx={{
            overflowY: "auto",
            maxHeight: "80vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              alignContent: "center",
              mb: 10,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
              <Typography sx={{ fontWeight: "700", fontSize: "20px" }}>
                {subCategoryName}
              </Typography>
              <Box
                sx={{ height: "40px", bgcolor: "black", width: "1px" }}
              ></Box>
              <Typography>{companyName}</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: "700" }}>Overview:</Typography>
              <Typography sx={{ mt: 1 }}>{overview}</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: "700" }}>
                Responsibilities:
              </Typography>
              {responsibilities?.map((item, index) => (
                <Typography
                  sx={{
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                  }}
                  key={index}
                >
                  <SiPolkadot
                    sx={{ color: "rgb(24, 47, 89)", fontSize: "30px" }}
                  />
                  {item}
                </Typography>
              ))}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: "700" }}>Requirements:</Typography>
              {requirements?.map((item, index) => (
                <Typography
                  sx={{
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                  }}
                  key={index}
                >
                  <SiPolkadot
                    sx={{ color: "rgb(24, 47, 89)", fontSize: "30px" }}
                  />
                  {item}
                </Typography>
              ))}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: "700" }}>
                Qualifications:
              </Typography>
              {qualifications?.map((item, index) => (
                <Typography
                  sx={{
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                  }}
                  key={index}
                >
                  <SiPolkadot
                    sx={{ color: "rgb(24, 47, 89)", fontSize: "30px" }}
                  />
                  {item}
                </Typography>
              ))}
            </Box>
            <Typography>
              <Typography
                variant="body2"
                component="span"
                sx={{ fontWeight: "700", fontSize: "17px" }}
              >
                Loaction:
              </Typography>{" "}
              {officeLocation}
            </Typography>
            <Typography>
              <Typography
                variant="body2"
                component="span"
                sx={{ fontWeight: "700", fontSize: "17px" }}
              >
                Salary:
              </Typography>{" "}
              {salary}
            </Typography>
            <Box>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                Type:{" "}
                <Typography
                  component="span"
                  sx={{ fontWeight: "600", color: "rgba(0, 0, 0, 0.65)" }}
                >
                  {type}
                </Typography>
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                Location:{" "}
                {location?.map((item, index) => (
                  <Typography
                    component="span"
                    sx={{ fontWeight: "600", color: "rgba(0, 0, 0, 0.65)" }}
                    key={index}
                  >
                    {item}
                  </Typography>
                ))}
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                Level:{" "}
                <Typography
                  component="span"
                  sx={{ fontWeight: "600", color: "rgba(0, 0, 0, 0.65)" }}
                >
                  {level}
                </Typography>
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                Shift:{" "}
                <Typography
                  component="span"
                  sx={{ fontWeight: "600", color: "rgba(0, 0, 0, 0.65)" }}
                >
                  {shift}
                </Typography>
              </Typography>
            </Box>
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
        <Box
          sx={{
            position: "absolute",
            bottom: "1px",
            bgcolor: "white",
            width: "90%",
            height: "100px",
            borderLeft: "2px solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottomLeftRadius: "15px",
          }}
        >
          {userEmail === user?.email ? (
            <Button
              onClick={handleOpenEditModal}
              sx={{
                width: "30%",
                height: "60%",
                fontSize: "20px",
                bgcolor: "rgb(24, 47, 89)",
                ":hover": {
                  bgcolor: "rgb(24, 47, 89)",
                },
              }}
              variant="contained"
            >
              Edit This Position{" "}
              <EditNoteIcon sx={{ ml: 3, fontSize: "30px" }} />
            </Button>
          ) : isRecruiter ? (
            <Button
              sx={{
                width: "80%",
                height: "50%",
                fontSize: "20px",
                bgcolor: "rgb(24, 47, 89)",
                ":hover": {
                  bgcolor: "rgb(24, 47, 89)",
                },
              }}
              variant="contained"
              disabled
            >
              Yout can't Edit This Position Because this job not your's{" "}
              <EditNoteIcon sx={{ ml: 3, fontSize: "30px" }} />
            </Button>
          ) : (
            <Link className="applyBtn" to={`apply/${_id}`}>
              Apply This Position{" "}
              <EditNoteIcon sx={{ ml: 3, fontSize: "30px" }} />
            </Link>
          )}
        </Box>
        <EditModal
          shouldReload={shouldReload}
          setShouldReload={setShouldReload}
          singleSubCategory={singleSubCategory}
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
        />
      </Box>
    </Modal>
  );
};

export default ViewModal;
