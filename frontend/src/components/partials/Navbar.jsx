import { useState } from "react";
import { Link } from "react-router-dom";

import { navLinks } from "../../constants";
import { logo, close, menu } from "../../assets";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../features/userSlice";

const Navbar = ({ showlink, isLanding }) => {
  const dispatch = useDispatch();

  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  const user = useSelector((state) => state?.user?.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="px-6 sm:px-16 w-full flex items-center py-5 relative z-20 bg-black">
      <div className="w-full flex items-center max-w-7xl mx-auto justify-between">
        <Link
          to="/"
          className="flex items-center"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="w-[180px] h-auto object-contain"
          />
        </Link>

        {!showlink && (
          <ul className="list-none sm:flex hidden flex-row gap-10 ">
            {user ? (
              <>
                {isLanding ? (
                  <li className={`text-white text-[18px] font-medium`}>
                    {`Hi, ${user?.firstName}`}
                  </li>
                ) : (
                  <>
                    {user?.isAdmin ? null : (
                      <li
                        className={`text-white text-[18px] font-medium cursor-pointer`}
                      >
                        <Link to={"/dashboard"}>Dashboard</Link>
                      </li>
                    )}
                    <li
                      className={`text-red-500 text-[18px] font-medium cursor-pointer`}
                      onClick={handleLogout}
                    >
                      <Link to={"/"}>Logout</Link>
                    </li>
                  </>
                )}
              </>
            ) : (
              navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-gray-200"
                  } hover:text-white text-[18px] font-medium cursor-pointer`}
                  onClick={() => {
                    setActive(link.title);
                  }}
                >
                  <Link to={`/${link.id}`}>{link.title}</Link>
                </li>
              ))
            )}
          </ul>
        )}

        <div className="flex sm:hidden flex-1 justify-end items-center text-[18px] text-white cursor-pointer">
          <img
            src={toggle ? close : menu}
            alt="nav"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => {
              setToggle(!toggle);
            }}
          />

          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 bg-red-900 absolute z-[21] top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl`}
          >
            <ul className="list-none flex justify-end flex-col items-start gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-secondary"
                  } hover:text-white text-[16x] cursor-pointer font-medium`}
                  onClick={() => {
                    setActive(link.title);
                    setToggle(!toggle);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
