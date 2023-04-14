import React, { useEffect, useState, useCallback } from 'react'
import { useStateContext } from '../context/StateContext'
import { useThemeContext } from '../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { loader } from '../assets'
import { CampaignCard } from '../components'

export default function DisplayCampaigns({
  title,
  isFilteredByOwner = false,
  campaignsFilter,
}) {
  const navigate = useNavigate()
  const { isDarkTheme } = useThemeContext()
  const [isLoading, setIsLoading] = useState(true)
  const [campaigns, setCampaigns] = useState([])
  const [shownCampaigns, setShownCampaigns] = useState([])
  const { address, contract, getCampaigns } = useStateContext()

  useEffect(() => {
    const fetchCampaigns = async () => {
      const data = await getCampaigns(isFilteredByOwner)
      setCampaigns(data)
      setShownCampaigns(data)
      setIsLoading(false)
    }
    if (contract) {
      fetchCampaigns()
    }
  }, [address, contract])

  useEffect(() => {
    if (campaigns) {
      setShownCampaigns(
        campaigns.filter((item) =>
          item.title.toLowerCase().includes(campaignsFilter.toLowerCase()),
        ),
      )
    }
  }, [campaignsFilter])

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }

  return (
    <div>
      <h1
        className={`font-semibold text-left ${
          isDarkTheme ? 'dark' : 'light'
        } text-[var(--color-text)]`}
      >
        {title} ({campaigns.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading ? (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          ></img>
        ) : campaigns.length > 0 ? (
          shownCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))
        ) : (
          campaigns.length === 0 && (
            <p className=" font-semibold text-[14px] leading-[30px] text-[#818183]">
              We could not find any campaigns
            </p>
          )
        )}
      </div>
    </div>
  )
}
