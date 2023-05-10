import React, { useState } from 'react'
import { tagType, profile } from '../assets'
import { daysLeft } from '../utils'
import { useThemeContext } from '../context/ThemeContext'

export default function CampaignCard({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) {
  const remainingDays = daysLeft(deadline)
  const { isDarkTheme } = useThemeContext()
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div
      className="sm:w-[288px] w-full rounded-2xl bg-[var(--color-background2)] 
      cursor-pointer hover:scale-[102%] transition duration-200 ease-in-out"
      onClick={handleClick}
    >
      {imageError ? (
        <div className="w-full h-[158px] rounded-2xl flex justify-center items-center">
          <p className={` text-[var(--color-text)]`}>Image failed to load</p>
        </div>
      ) : (
        <img
          src={image}
          alt="fund"
          className="w-full h-[158px] object-cover rounded-t-[15px]"
          onError={handleImageError}
        />
      )}
      <div className="flex flex-col p-4 ">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p
            className={`ml-[12px] mt-[2px] font-medium ${
              isDarkTheme ? 'dark' : 'light'
            } text-[var(--color-text2)]`}
          >
            Category
          </p>
        </div>
        <div className="block">
          <h3
            className={`text-left ${
              isDarkTheme ? 'dark' : 'light'
            } text-[var(--color-text)] truncate`}
          >
            {title}
          </h3>
          <p
            className={`mt-[5px] font-normal ${
              isDarkTheme ? 'dark' : 'light'
            } text-[var(--color-text2)] text-left truncate`}
          >
            {description}
          </p>
        </div>
        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4
              className={`font-semibold ${
                isDarkTheme ? 'dark' : 'light'
              } text-[var(--color-text)]`}
            >
              {amountCollected}
            </h4>
            <p
              className={`mt-[3px] ${
                isDarkTheme ? 'dark' : 'light'
              } text-[var(--color-text2)] sm:max-w-[120px] truncate`}
            >
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4
              className={`font-semibold ${
                isDarkTheme ? 'dark' : 'light'
              } text-[var(--color-text)]`}
            >
              {remainingDays}
            </h4>
            <p
              className={`mt-[3px] ${
                isDarkTheme ? 'dark' : 'light'
              } text-[var(--color-text2)] sm:max-w-[120px] truncate`}
            >
              Days left
            </p>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="flex justify-center items-center bg-[var(--color-background)] w-[30px] h-[30px] rounded-full ">
            <img
              src={profile}
              alt="user"
              className="w-1/2 h-1/2 object-contain grayscale-[30%]"
            />
          </div>
          <p
            className={`flex-1 ${
              isDarkTheme ? 'dark' : 'light'
            } text-[var(--color-text2)] truncate`}
          >
            by{' '}
            <span
              className={`ml-[2px] ${
                isDarkTheme ? 'dark' : 'light'
              } text-[var(--color-text)]`}
            >
              {owner}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
