import React from 'react'
import { tagType, thirdweb } from '../assets'
import { daysLeft } from '../utils'

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

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[var(--color-black2)] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />
      <div className="flex flex-col p-4 ">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-medium text-[var(--color-grey)]">
            Category
          </p>
        </div>
        <div className="block">
          <h3 className="text-left truncate">{title}</h3>
          <p className="mt-[5px] font-normal text-[var(--color-grey)] text-left truncate">
            {description}
          </p>
        </div>
        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-semibold text-[var(--color-grey5)]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] text-[var(--color-grey5)] sm:max-w-[120px] truncate">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-[var(--color-grey5)]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] text-[var(--color-grey5)] sm:max-w-[120px] truncate">
              Days left
            </p>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="flex justify-center items-center bg-[var(--color-black)] w-[30px] h-[30px] rounded-full ">
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 text-[var(--color-grey)] truncate">
            by{' '}
            <span className="ml-[2px] text-[var(--color-grey5)]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
