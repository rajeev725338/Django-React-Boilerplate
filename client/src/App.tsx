import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchUser } from "./features/auth/authAPI";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PageNotFound404 from "./components/PageNotFound404";
import Navbar from "./components/Navbar/Navbar";
import { AppDispatch } from "./app/store";
import Logout from "./components/Auth/Logout";
import ResetPasswordConfirm from "./components/Auth/ResetPasswordConfirm";
import ResetPassword from "./components/Auth/ResetPassword";
import ActivateUser from "./components/Auth/ActivateUser";
import RequireAuth from "./customRoutes/RequiredAuth";
import ResendActivationLink from "./components/Auth/ResendActivationLink";
import Loading from "./components/Core/Loading";
function App() {
  const { axios } = useAxiosPrivate();
  const dispatch: AppDispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.core);
  useEffect(() => {
    dispatch(fetchUser(axios)).unwrap();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route
          path="/reset_password/:uid/:token"
          element={<ResetPasswordConfirm />}
        />
        <Route path="/verify_email/:uid/:token" element={<ActivateUser />} />
        <Route
          path="/resend_verify_mail_link"
          element={<ResendActivationLink />}
        />
        {/* <Route path="unauthorized" element={<Unauthorized />} /> */}
        {/* we want to protect these routes */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* </Route> */}
        {/* catch all */}
        <Route path="*" element={<PageNotFound404 />} />
      </Routes>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Loading />
      </Backdrop>
    </>
  );
}

export default App;
