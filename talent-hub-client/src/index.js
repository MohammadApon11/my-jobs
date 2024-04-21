import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/routes";
import AuthProviders from "./context/AuthProviders";
import { Toaster } from "react-hot-toast";
import { CategoryNameProvider } from "./context/CategoryNameContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProviders>
      <CategoryNameProvider>
        <RouterProvider router={Router}></RouterProvider>
        <Toaster />
      </CategoryNameProvider>
    </AuthProviders>
  </React.StrictMode>
);

reportWebVitals();
