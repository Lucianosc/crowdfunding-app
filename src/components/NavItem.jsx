import React from 'react'
import { useLocation } from 'react-router-dom'

export default function NavItem({
  styles,
  imgUrl,
  disable,
  handleClick,
  isDarkTheme,
  link = false,
}) {
  const location = useLocation()
  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px]   ${
        isDarkTheme ? 'dark' : 'light'
      } ${
        location.pathname === link && !disable && 'bg-[var(--color-background)]'
      } flex justify-center items-center ${
        disable ? 'opacity-30' : 'cursor-pointer'
      } ${styles}`}
      onClick={handleClick}
    >
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${
          link && (location.pathname !== link || disable) && 'grayscale'
        } `}
      />
    </div>
  )
}
