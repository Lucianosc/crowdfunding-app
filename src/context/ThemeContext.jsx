import React, { useState, useContext, createContext } from 'react'

const ThemeContext = createContext()

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeContextProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  function toggleTheme() {
    setIsDarkTheme(!isDarkTheme)
  }

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
