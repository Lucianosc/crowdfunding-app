import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import { useStateContext } from '../context/StateContext'
import { useThemeContext } from '../context/ThemeContext'
import { CustomButton, CountBox, Loader } from '../components'
import { calculateBarPercentage, daysLeft } from '../utils'
import { thirdweb } from '../assets'

export default function CampaignDetails() {
  const {
    state: { id, target, amountCollected, image, title , owner, description, deadline},
  } = useLocation()
  const navigate = useNavigate()
  const { isDarkTheme } = useThemeContext()

  const {
    getDonationsByCampaignId,
    contract,
    address,
    fundCampaign,
  } = useStateContext()
  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState(0)
  const [donators, setDonators] = useState([])
  const remainingDays = daysLeft(deadline)
  const [imageError, setImageError] = useState(false)
  const barPercentage = calculateBarPercentage(
    target,
    amountCollected,
  )

  const handleImageError = () => {
    setImageError(true)
  }

  const fetchDonators = async () => {
    const donators = await getDonationsByCampaignId(id)
    setDonators(donators)
  }

  const handleDonate = async () => {
    setIsLoading(true)
    if (amount > 0) await fundCampaign(id, amount)
    else console.log('type any amount')
    navigate('/')
    setIsLoading(false)
  }

  useEffect(() => {
    if (contract) fetchDonators()
  }, [contract])

  return (
    <div>
      {isLoading && <Loader />}
      <div className="w-full flex md:flex-row flex-col mt-4 gap-[30px]">
        <div className="flex-1 flex-col">
          {imageError ? (
            <div className="w-full h-[410px] rounded-[15px] flex justify-center items-center">
              <p
                className={`${
                  isDarkTheme ? 'dark' : 'light'
                } text-[var(--color-text)]`}
              >
                Image failed to load
              </p>
            </div>
          ) : (
            <img
              src={image}
              alt="campaign"
              className="w-full h-[410px] object-cover rounded-xl"
              onError={handleImageError}
            />
          )}
          <div className="relative w-full h-[8px] bg-[var(--color-background2)] mt-2 rounded-full">
            <div
              className="w-[30px] bg-[var(--color-primary)] h-full rounded-full"
              style={{
                width: `${barPercentage}%`,
                maxWidth: '100%',
              }}
            ></div>
          </div>
          <div className="mt-2">
            <p
              className={`font-normal text-[16px] leading-[18px] text-justify ${
                isDarkTheme ? 'dark' : 'light'
              } text-[var(--color-text)]`}
            >
              {barPercentage}% backed
            </p>
          </div>
        </div>
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days left" value={remainingDays} />
          <CountBox
            title={`Raised of ${target}`}
            value={amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>
      <div className="mt-12 flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4
              className={`text-[32px] ${
                isDarkTheme ? 'dark' : 'light'
              } text-[var(--color-text)] font-semibold `}
            >
              {title}
            </h4>
          </div>
          <div>
            <h4
              className={`text-[20px] ${
                isDarkTheme ? 'dark' : 'light'
              } text-[var(--color-text)] font-semibold `}
            >
              Creator
            </h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div
                className={`w-[52px] h-[52px] flex items-center justify-center rounded-full ${
                  isDarkTheme ? 'dark' : 'light'
                }} bg-[var(--color-background2)] cursor-pointer`}
              >
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4
                  className={`font-semibold text-[14px] ${
                    isDarkTheme ? 'dark' : 'light'
                  } text-[var(--color-text2)] break-all`}
                >
                  {owner}
                </h4>
                {/* <p
                  className={`mt-[4px] font-normal ${
                    isDarkTheme ? 'dark' : 'light'
                  } text-[var(--color-text2)]`}
                >
                  10 campaigns
                </p> */}
              </div>
            </div>
          </div>

          <div>
            <h4
              className={`text-[20px] ${
                isDarkTheme ? 'dark' : 'light'
              } text-[var(--color-text)] font-semibold `}
            >
              Story
            </h4>
            <div className="mt-[20px]">
              <p className=" font-normal text-[16px] leading-[26px] text-justify text-[var(--color-text2)]">
                {description}
              </p>
            </div>
          </div>

          <div>
            <h4
              className={`text-[20px] ${
                isDarkTheme ? 'dark' : 'light'
              } text-[var(--color-text)] font-semibold `}
            >
              Donators
            </h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p
                      className={`text-[16px] ${
                        isDarkTheme ? 'dark' : 'light'
                      } text-[var(--color-text2)] leading-[26px] break-all`}
                    >
                      {index + 1}. {item.donator}
                    </p>
                    <p
                      className={`text-[16px] min-w-[68px] ${
                        isDarkTheme ? 'dark' : 'light'
                      } text-[var(--color-text2)] leading-[26px] break-all`}
                    >
                      {item.donation} ETH
                    </p>
                  </div>
                ))
              ) : (
                <p
                  className={` font-normal text-[16px] leading-[26px] text-justify ${
                    isDarkTheme ? 'dark' : 'light'
                  } text-[var(--color-text2)]`}
                >
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>

          <div className="flex-1 justify-center">
            <div className="mt-[20px] flex flex-col p-4 bg-[var(--color-background2)] rounded-[10px] max-w-[720px] mx-auto">
              <p
                className={`font-medium text-[20px] leading-[30px] text-center ${
                  isDarkTheme ? 'dark' : 'light'
                } text-[var(--color-text)]`}
              >
                Fund the campaign
              </p>
              <div className="mt-[30px] flex flex-col gap-[20px]">
                <div className=" p-4 bg-[var(--color-background)] rounded-[10px]">
                  <h4
                    className={`font-semibold ${
                      isDarkTheme ? 'dark' : 'light'
                    } text-[var(--color-text)] text-[14px] leading-[22px]`}
                  >
                    Back it because you belive in it.
                  </h4>
                  <p
                    className={`mt-[20px] leading-[22px] ${
                      isDarkTheme ? 'dark' : 'light'
                    } text-[var(--color-text2)]`}
                  >
                    Support the proyect for no reward, just because it speaks to
                    you.
                  </p>
                </div>
                <input
                  type="number"
                  placeholder="ETH 0.1"
                  step="0.01"
                  className={`w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] 
                  border-[var(--color-text2)] bg-transparent text-[20px] leading-[30px] placeholder:text-[var(--color-text2)] text-[var(--color-text)]
                  rounded-[10px]`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <div className="flex justify-center">
                  <CustomButton
                    btnType="button"
                    title={
                      address ? 'Fund Campaign' : 'Please connect your wallet'
                    }
                    styles="w-full bg-[var(--color-primary)] text-[var(--color-secondary)] max-w-[240px] "
                    handleClick={() => handleDonate()}
                    disabled={address ? false : true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
