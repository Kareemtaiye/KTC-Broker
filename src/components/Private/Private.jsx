import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { useAuthStatus } from "../hooks/useAuthStatus";
import { usePrivateStatus } from "./usePrivate";

const Private = () => {
  // useAuthStatus();
  // usePrivateStatus();
  const { loggedIn, checkingStatus } = usePrivateStatus();
  console.log(loggedIn);

  // if (checkingStatus) {
  //   return <Spinner />;
  // }
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default Private;
