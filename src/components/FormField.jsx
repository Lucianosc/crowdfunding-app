import React from 'react'
import { useThemeContext } from '../context/ThemeContext'

export default function FormField({
  labelName,
  placeholder,
  inputType,
  value,
  handleChange,
  isTextArea,
}) {
  const { isDarkTheme } = useThemeContext()

  return (
    <label className="flex flex-col flex-1 w-full ">
      {labelName && (
        <span
          className={`font-medium text-[16px] leading-[22px] ${
            isDarkTheme ? 'dark' : 'light'
          } text-[var(--color-text)] mb-[10px]`}
        >
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          rows="10"
          className={`py-[15px] sm:px-[25px] sm:min-w-[300px] px-[15px] outline-none border-[1px]
          ${
            isDarkTheme ? 'dark' : 'light'
          } border-[var(--color-text)] text-[var(--color-text)] placeholder:text-[var(--color-text2)] bg-transparent  text-[14px]  
         rounded-[10px]`}
        ></textarea>
      ) : (
        <input
          required
          value={value}
          placeholder={placeholder}
          type={inputType}
          onChange={handleChange}
          step="0.1"
          className={`py-[15px] sm:px-[25px] sm:min-w-[300px] px-[15px] outline-none border-[1px]
          ${
            isDarkTheme ? 'dark' : 'light'
          } border-[var(--color-text)] text-[var(--color-text)] placeholder:text-[var(--color-text2)] bg-transparent  text-[14px] 
           rounded-[10px]`}
        ></input>
      )}
    </label>
  )
}
