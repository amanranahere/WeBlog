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
      <div className="bg-transparent">
        <nav className="flex">
          {/* <div className="h-10 w-10 mx-4">
            <Link to="/">
              <Logo />
            </Link>
          </div> */}
          <ul className="flex ml-auto mt-2 gap-5 mr-8">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="btn relative font-medium text-sm bg-transparent border-none py-2 px-4 text-[#343434] uppercase transition duration-500 ease-in-out cursor-pointer overflow-hidden whitespace-nowrap"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
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
