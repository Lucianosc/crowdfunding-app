import React from 'react'
import { useThemeContext } from '../context/ThemeContext'

export default function CountBox({ title, value }) {
  const { isDarkTheme } = useThemeContext()
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4
        className={`text-[30px] p-3 ${
          isDarkTheme ? 'dark' : 'light'
        } text-[var(--color-text)] bg-[var(--color-background2)] font-semibold rounded-t-[10px] w-full text-center`}
      >
        {value}
      </h4>
      <p
        className={`text-[16px] ${
          isDarkTheme ? 'dark' : 'light'
        } text-[var(--color-text2)] bg-[var(--color-background3)] px-3 py-2 w-full rounded-b-[10px] text-center`}
      >
        {title}
      </p>
    </div>
  )
}
