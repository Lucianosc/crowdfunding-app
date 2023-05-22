import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { navlinks } from '../constants'
import { logo, sun } from '../assets'
import { useThemeContext } from '../context/ThemeContext'
import { NavItem } from '../components'

export default function Sidebar() {
  const navigate = useNavigate()
  const { isDarkTheme, toggleTheme } = useThemeContext()

  return (
    <nav className="flex flex-col justify-between items-center sticky top-5 h-[93vh]">
      <NavItem
        styles={`w-[52px] h-[52px] ${
          isDarkTheme ? 'dark' : 'light'
        } bg-[var(--color-background2)] transition-all duration-200`}
        imgUrl={logo}
        handleClick={() => navigate('/')}
      />

      <div
        className={`flex flex-col flex-1 justify-between items-center ${
          isDarkTheme ? 'dark' : 'light'
        } bg-[var(--color-background2)] rounded-[20px] w-[76px] py-4 mt-12 transition-all duration-200`}
      >
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <NavItem
              isDarkTheme={isDarkTheme}
              key={link.name}
              imgUrl={link.imgUrl}
              disable={link.disabled}
              name={link.name}
              link={link.link}
              handleClick={() => {
                if (!link.disabled) {
                  navigate(link.link)
                }
              }}
              styles={`transition-all duration-200`}
            />
          ))}
        </div>
        <NavItem
          styles={` ${
            isDarkTheme ? 'dark' : 'light'
          } bg-[var(--color-background)] shadow-secondary transition-all duration-200`}
          imgUrl={sun}
          handleClick={() => toggleTheme()}
        />
      </div>
    </nav>
  )
}
