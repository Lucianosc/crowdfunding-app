import React from 'react'

export default function CustomButton({
  btnType,
  title,
  styles,
  handleClick,
  disabled,
}) {
  return (
    <button
      type={btnType}
      className={` font-semibold text-[16px] leading-[26px] min-h-[52px] px-4 rounded-[10px] whitespace-nowrap  ${styles} ${
        disabled && 'grayscale'
      }`}
      onClick={handleClick}
      disabled={disabled}
    >
      {title}
    </button>
  )
}
