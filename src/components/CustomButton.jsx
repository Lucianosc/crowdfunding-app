import React from 'react'

export default function CustomButton({ btnType, title, styles, handleClick }) {
  return (
    <button
      type={btnType}
      className={` font-semibold text-[16px] leading-[26px] min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}
