import React from 'react'
import { loader } from '../assets'
import { useThemeContext } from '../context/ThemeContext'

export default function Loader() {
  const { isDarkTheme } = useThemeContext()
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img
        src={loader}
        alt="loader"
        className="w-[100px] h-[100px] object-contain"
      />
      <p
        className={`mt-[20px] font-bold text-[20px] text-center ${
          isDarkTheme ? 'dark' : 'light'
        } text-[var(--color-secondary)] leading-7`}
      >
        Transaction in progress
        <br />
        Please wait...
      </p>
    </div>
  )
}
