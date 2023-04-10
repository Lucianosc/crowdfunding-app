import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CustomButton } from './'
import { logo, menu, search, thirdweb, sun } from '../assets'
import { navlinks } from '../constants'
import { useStateContext } from '../context/StateContext'
import { useThemeContext } from '../context/ThemeContext'
import { Icon } from '../components'

export default function Navbar() {
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState('dashboard')
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const drawerRef = useRef(null)
  const { isDarkTheme, toggleTheme } = useThemeContext()

  const { address, connect } = useStateContext()

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideDrawer, true)

    return () => {
      document.removeEventListener('click', handleClickOutsideDrawer, true)
    }
  }, [toggleDrawer])

  const handleClickOutsideDrawer = (e) => {
    if (toggleDrawer && !drawerRef.current.contains(e.target)) {
      setToggleDrawer(false)
    }
  }
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div
        className={`lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] ${
          isDarkTheme ? 'dark' : 'light'
        } bg-[var(--color-background2)] rounded-[100px]`}
      >
        <input
          type="text"
          placeholder="Search for campaigns"
          className={`flex w-full foont-roboto text-[14px] ${
            isDarkTheme ? 'dark' : 'light'
          } placeholder:text-[var(--color-text2)] text-[var(--color-text)] bg-transparent outline-none pr-2`}
        />
        <div
          className={`flex justify-center items-center cursor-pointer w-[72px] h-full rounded-[20px] ${
            isDarkTheme ? 'dark' : 'light'
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
      <div className="sm:flex flex-row hidden justify-end gap-4 ">
        <CustomButton
          btnType="button"
          title={address ? 'Create campaign' : 'Connect'}
          styles="bg-[var(--color-primary)] text-[var(--color-secondary)]"
          handleClick={() => {
            if (address) navigate('create-campaign')
            else connect()
          }}
        />
        <Link to="/profile">
          <div
            className={`flex justify-center items-center w-[52px] h-[52px] rounded-[100px] ${
              isDarkTheme ? 'dark' : 'light'
            } bg-[var(--color-background2)] cursor-pointer`}
          >
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>
      {/* mobile nav */}
      <div className="flex justify-between items-center relative sm:hidden ">
        <div
          className={`flex justify-center items-center w-[40px] h-[40px] rounded-[10px] ${
            isDarkTheme ? 'dark' : 'light'
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
          className={`absolute top-[60px] right-0 left-0 ${
            isDarkTheme ? 'dark' : 'light'
          } bg-[var(--color-background2)] z-10 shadow-secondary py-4 ${
            toggleDrawer ? 'translate-y-0' : '-translate-y-[100vh] '
          } transition-all duration-700`}
          ref={drawerRef}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && 'bg-[var(--color-background)] '
                } 
                 ${link.disabled && 'opacity-30'}`}
                onClick={() => {
                  if (!link.disabled) {
                    setIsActive(link.name)
                    setToggleDrawer(false)
                    navigate(link.link)
                  }
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={` w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? 'grayscale-0' : 'grayscale'
                  }`}
                />
                <p
                  className={`ml-[20px]  font-semibold text-[14px] ${
                    isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'
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
              title={address ? 'Create campaign' : 'Connect'}
              styles="bg-[var(--color-primary)] text-[var(--color-secondary)]"
              handleClick={() => {
                setToggleDrawer(false)
                if (address) navigate('create-campaign')
                else connect()
              }}
            />
            <Icon
              styles={` ${
                isDarkTheme ? 'dark' : 'light'
              } bg-[var(--color-background)] shadow-secondary`}
              imgUrl={sun}
              handleClick={() => toggleTheme()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
