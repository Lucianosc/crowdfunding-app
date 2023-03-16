import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { navlinks } from '../constants'
import { logo, sun } from '../assets'

const Icon = ({ styles, name, imgUrl, isActive, disable, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && 'bg-[#2c2f32]'
    } flex justify-center items-center ${
      disable ? 'opacity-30' : 'cursor-pointer'
    } ${styles}`}
    onClick={handleClick}
  >
    <img
      src={imgUrl}
      alt="fund_logo"
      className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'} `}
    />
  </div>
)

export default function Sidebar() {
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState('dashboard')

  return (
    <div className="flex flex-col justify-between items-center sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>
      <div className="flex flex-col flex-1 justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              imgUrl={link.imgUrl}
              isActive={isActive}
              disable={link.disabled}
              name={link.name}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name)
                  navigate(link.link)
                }
              }}
            />
          ))}
        </div>
        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  )
}
