import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { CustomButton } from "./";
import { logo, menu, search, profile, sun } from "../assets";
import { navlinks } from "../constants";
import { useStateContext } from "../context/StateContext";
import { useThemeContext } from "../context/ThemeContext";
import { NavItem } from "../components";

export default function Navbar({ handleCallback }) {
  const navigate = useNavigate();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const drawerRef = useRef(null);
  const { isDarkTheme, toggleTheme } = useThemeContext();
  const location = useLocation();

  const { isWalletConnected, connectWallet } = useStateContext();
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideDrawer, true);

    return () => {
      document.removeEventListener("click", handleClickOutsideDrawer, true);
    };
  }, [toggleDrawer]);

  const handleClickOutsideDrawer = (e) => {
    if (toggleDrawer && !drawerRef.current.contains(e.target)) {
      setToggleDrawer(false);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = (e) => {
    const processChange = debounce(() => handleCallback(e.target.value), 600);
    processChange();
  };

  return (
    <div className="flex sm:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div
        className={`lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] ${
          location.pathname === "/" || location.pathname === "/profile"
            ? ""
            : " sm:invisible hidden sm:block"
        } ${
          isDarkTheme ? "dark" : "light"
        } bg-[var(--color-background2)] rounded-[100px]`}
      >
        <input
          type="text"
          placeholder="Search for campaigns"
          className={`flex w-full foont-roboto text-[14px] ${
            isDarkTheme ? "dark" : "light"
          } placeholder:text-[var(--color-text2)] text-[var(--color-text)] bg-transparent outline-none pr-2`}
          onChange={handleSearch}
        />
        <div
          className={`flex justify-center items-center cursor-pointer w-[72px] h-full rounded-[20px] ${
            isDarkTheme ? "dark" : "light"
          } bg-[var(--color-primary)]`}
        >
          <img
            src={search}
            alt="search"
            className={`w-[15px] h-[15px] object-contain bg-[var(--color-primary)]`}
          />
        </div>
      </div>
      {/* desktop nav */}
      <nav className="sm:flex flex-row hidden justify-end gap-4 ">
        <CustomButton
          btnType="button"
          title={isWalletConnected ? "Create campaign" : "Connect wallet"}
          styles="bg-[var(--color-primary)] text-[var(--color-secondary)]"
          handleClick={() => {
            if (isWalletConnected) navigate("create-campaign");
            else connectWallet();
          }}
        />
        <NavLink to="/profile">
          <div
            className={`flex justify-center items-center w-[52px] h-[52px] rounded-[100px] ${
              isDarkTheme ? "dark" : "light"
            } bg-[var(--color-background2)] cursor-pointer`}
          >
            <img
              src={profile}
              alt="user"
              className="w-[60%] h-[60%] object-contain grayscale-[30%]"
            />
          </div>
        </NavLink>
      </nav>
      {/* mobile nav */}
      <nav className="flex justify-between items-center relative sm:hidden">
        <div
          className={`flex justify-center items-center w-[40px] h-[40px] rounded-[10px] ${
            isDarkTheme ? "dark" : "light"
          } bg-[var(--color-background2)] cursor-pointer`}
        >
          <img
            src={logo}
            alt="logo"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />
        <div
          className={`fixed top-[0px] right-0 left-0 z-10 shadow-secondary  ${
            toggleDrawer ? "translate-y-0" : "-translate-y-[100vh] "
          } transition-all duration-700`}
          ref={drawerRef}
        >
          <div className="bg-[var(--color-background2)] pb-8 pt-4">
            <ul className="mb-4">
              {navlinks.map((link) => (
                <li
                  key={link.name}
                  className={`flex p-4 ${
                    location.pathname === link.link &&
                    "bg-[var(--color-background)] "
                  } 
                 ${link.disabled && "opacity-30"}`}
                  onClick={() => {
                    if (!link.disabled) {
                      setToggleDrawer(false);
                      navigate(link.link);
                    }
                  }}
                >
                  <img
                    src={link.imgUrl}
                    alt={link.name}
                    className={` w-[24px] h-[24px] object-contain ${
                      location.pathname === link.link
                        ? "grayscale-0"
                        : "grayscale"
                    }`}
                  />
                  <p
                    className={`ml-[20px]  font-semibold text-[14px] ${
                      location.pathname === link.link
                        ? "text-[var(--color-text)]"
                        : "text-[#808191]"
                    }`}
                  >
                    {link.name}
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex mx-4 justify-between">
              <CustomButton
                btnType="button"
                title={isWalletConnected ? "Create campaign" : "Connect wallet"}
                styles="bg-[var(--color-primary)] text-[var(--color-secondary)]"
                handleClick={() => {
                  setToggleDrawer(false);
                  if (isWalletConnected) navigate("create-campaign");
                  else connectWallet();
                }}
              />
              <NavItem
                styles={` ${
                  isDarkTheme ? "dark" : "light"
                } bg-[var(--color-background)] shadow-secondary`}
                imgUrl={sun}
                handleClick={() => toggleTheme()}
              />
            </div>
          </div>
        </div>
        <div
          className={`fixed top-0 left-0 bg-[var(--color-text)] opacity-40 h-[1000px] w-full ${
            toggleDrawer ? "z-5" : "z-[-1]"
          } transition-all duration-200`}
        ></div>
      </nav>
    </div>
  );
}
