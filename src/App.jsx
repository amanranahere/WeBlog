import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthLayout, Header, Loader } from "./components/index.js";
import {
  AddPost,
  AllPosts,
  EditPost,
  Home,
  LoginPage,
  Post,
  SignupPage,
} from "./pages/index.js";
import { AnimatePresence } from "framer-motion";
import useScrollToTop from "./components/scrollToTop.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useScrollToTop();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <AuthLayout authentication={false}>
                    <LoginPage />
                  </AuthLayout>
                }
              />
              <Route
                path="/signup"
                element={
                  <AuthLayout authentication={false}>
                    <SignupPage />
                  </AuthLayout>
                }
              />
              <Route
                path="/all-posts"
                element={
                  <AuthLayout authentication>
                    <AllPosts />
                  </AuthLayout>
                }
              />
              <Route
                path="/add-post"
                element={
                  <AuthLayout authentication>
                    <AddPost />
                  </AuthLayout>
                }
              />
              <Route
                path="/edit-post/:slug"
                element={
                  <AuthLayout authentication>
                    <EditPost />
                  </AuthLayout>
                }
              />
              <Route path="/post/:slug" element={<Post />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
