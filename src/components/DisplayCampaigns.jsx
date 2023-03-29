import React, { useEffect, useState, useCallback } from 'react'
import { useStateContext } from '../context'
import { useNavigate } from 'react-router-dom'
import { loader } from '../assets'
import { CampaignCard } from '../components'

export default function DisplayCampaigns({ title, isFilteredByOwner = false }) {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [campaigns, setCampaigns] = useState([])

  const { address, contract, getCampaigns } = useStateContext()

  useEffect(() => {
    const fetchCampaigns = async () => {
      const data = await getCampaigns(isFilteredByOwner)
      setCampaigns(data)
      setIsLoading(false)
    }
    if (contract) {
      fetchCampaigns()
    }
  }, [address, contract])

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-left">
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
          campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))
        ) : (
          campaigns.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
              There are no campaigns yet
            </p>
          )
        )}
      </div>
    </div>
  )
}
