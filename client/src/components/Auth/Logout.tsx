import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";

type Props = {};

const Logout = (props: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logout());
  }, []);

  return <div>Logged Out Successfully</div>;
};

export default Logout;
