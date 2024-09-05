import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const logoutHandler = () => {
    setIsLoading(true);
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate("/");
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <button
      className={`btnRed relative font-medium text-sm bg-transparent border-none py-2 px-4 text-[#343434] uppercase transition duration-500 ease-in-out cursor-pointer overflow-hidden ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={logoutHandler}
      disabled={isLoading}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}

export default LogoutBtn;
