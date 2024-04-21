import React, { createContext, useContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import useGetUser from "../hooks/useGetUser";

const CategoryNameContext = createContext();

export const CategoryNameProvider = ({ children }) => {
  const [categoryNameContext, setCategoryNameContext] = useState("");
  const [subCategoryForEdit, setSubCategoryForEdit] = useState(null);
  const { user } = useAuth();
  const { userData, isLoading, isError } = useGetUser(user?.email);

  let isRecruiter;

  const storedUserRole = localStorage.getItem("userRole");

  if (storedUserRole) {
    const role = storedUserRole === "recruiter";
    isRecruiter = role;
  }
  if (!storedUserRole && userData) {
    const role = userData.role === "recruiter";
    isRecruiter = role;
  }

  const values = {
    categoryNameContext,
    setCategoryNameContext,
    subCategoryForEdit,
    setSubCategoryForEdit,
    userData,
    isRecruiter,
  };

  return (
    <CategoryNameContext.Provider value={values}>
      {children}
    </CategoryNameContext.Provider>
  );
};

export const useCategoryName = () => {
  return useContext(CategoryNameContext);
};
