import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export const Svgs = [
  {
    icon: (
      <Link to="/" key="svg1">
        <svg
          className="svgs"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          version="1.1"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            color: "rgb(24, 47, 89)",
          }}
        >
          <path d="M16 9.226l-8-6.21-8 6.21v-2.532l8-6.21 8 6.21zM14 9v6h-4v-4h-4v4h-4v-6l6-4.5z"></path>
        </svg>
      </Link>
    ),
    path: "/",
    subTitle: "Home",
  },

  {
    icon: (
      <Link to="my-jobs" key="svg2">
        <svg
          className="svgs"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            color: "rgb(24, 47, 89)",
          }}
        >
          <path d="M352 144v-39.6C352 82 334 64 311.6 64H200.4C178 64 160 82 160 104.4V144H48v263.6C48 430 66 448 88.4 448h335.2c22.4 0 40.4-18 40.4-40.4V144H352zm-40 0H200v-40h112v40z"></path>
        </svg>
      </Link>
    ),
    path: "my-jobs",
    subTitle: "My Jobs",
  },

  {
    icon: (
      <Link to="/view-cv" key="svg3">
        <svg
          className="svgs"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            color: "rgb(24, 47, 89)",
          }}
        >
          <path
            fill="none"
            stroke="#000"
            strokeWidth="2"
            d="M3,1 L3,23 L16,23 L21,18 L21,1 L3,1 Z M6,17 L11,17 M6,13 L18,13 M6,9 L16,9 M3,5 L21,5 M21,17 L15,17 L15,23"
          ></path>
        </svg>
      </Link>
    ),
    path: "view-cv",
    subTitle: "View CV",
  },

  {
    icon: (
      <Link to="/support" key="svg4">
        <svg
          className="svgs"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 20 20"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            color: "rgb(24, 47, 89)",
          }}
        >
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
        </svg>
      </Link>
    ),
    path: "support",
    subTitle: "Support",
  },
];

export const FilterBtn = ["All Location", "Bangladesh", "India"];

