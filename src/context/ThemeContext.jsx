import React, { useState, useContext, createContext } from 'react'

const ThemeContext = createContext()

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeContextProvider = ({ children }) => {
  const getInitialTheme = () => {
    if (localStorage.getItem('theme') === 'light') return false
    else return true
  }

  const [isDarkTheme, setIsDarkTheme] = useState(getInitialTheme)

  function toggleTheme() {
    if (localStorage.getItem('theme') !== 'light') {
      localStorage.setItem('theme', 'light')
      setIsDarkTheme(false)
    } else {
      setIsDarkTheme(true)
      localStorage.setItem('theme', 'dark')
    }
  }
  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
