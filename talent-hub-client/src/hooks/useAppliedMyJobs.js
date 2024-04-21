import axios from "axios";

export const saveMyAppliedJobs = (position) => {
  const appliedPosition = {
    email: position?.email,
    name: position?.name,
    expectedSalary: position?.expectedSalary,
    categoryName: position?.categoryName,
    subCategoryName: position?.subCategoryName,
  };

  axios
    .put(
      `https://jobserver-xyvn.onrender.com/myApplication/${position?.subCategoryName}`,
      appliedPosition,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
