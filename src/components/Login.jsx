import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Loader, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-4/5 max-w-4xl flex flex-col justify-center rounded-3xl px-4 lg:p-10 border border-black/20 shadow-xl">
        <div className="-mt-10 mb-10 flex justify-center items-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {loading ? (
          <div className="h-96 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <form onSubmit={handleSubmit(login)} className="mt-2">
            <div className="space-y-5">
              <Input
                label="Email: "
                placeholder="Enter your email"
                className="mb-2"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password: "
                type="password"
                className="mb-2"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button
                type="submit"
                className="py-4 relative w-full h-full border-0 bg-gray-500/20 rounded-xl shadow-[inset_0_0_0_0_#333] transition ease-out duration-300 text-xl outline-none hover:shadow-[inset_500px_0_0_0_#333] hover:text-white cursor-pointer active:scale-90"
              >
                Sign in
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
