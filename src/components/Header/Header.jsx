import React from "react";
import { LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Blogs",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },

    {
      name: "Add Blog",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="fixed top-0 right-0 flex justify-end w-full z-[100]">
      <div className="bg-transparent w-full">
        <nav className="flex">
          <ul className="flex ml-auto mt-2 gap-3 md:gap-4 lg:gap-6 xl:gap-8 mr-4 md:mr-6 lg:mr-8 flex-nowrap overflow-x-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="shrink-0">
                  <button
                    onClick={() => navigate(item.slug)}
                    className="btn relative font-medium bg-transparent border-none py-2 px-4 lg:px-6 xl:px-8 text-[#343434] uppercase transition duration-500 ease-in-out cursor-pointer overflow-hidden whitespace-nowrap text-sm lg:text-base xl:text-lg"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="shrink-0">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Header;
