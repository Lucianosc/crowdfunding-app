import React, { useEffect, useState, useCallback } from "react";
import { useStateContext } from "../context/StateContext";
import { useThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import { CampaignCard } from "../components";
import { useContractRead } from "wagmi";
import { ethers } from "ethers";

export default function DisplayCampaigns({
  title,
  isFilteredByOwner = false,
  campaignsFilter,
}) {
  const navigate = useNavigate();
  const { isDarkTheme } = useThemeContext();
  const [parsedCampaigns, setParsedCampaigns] = useState([]);
  const [shownCampaigns, setShownCampaigns] = useState([]);
  const { contractAddress, contractABI, isWalletConnected, walletAddress } =
    useStateContext();

  const {
    data: campaigns,
    isError,
    isLoading: isLoadingCampaigns,
  } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "getCampaigns",
  });

  const getCampaigns = (filtered = false) => {
    const parsedCampaigns = campaigns?.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      id: i,
    }));
    //filter by address
    if (filtered) {
      return parsedCampaigns.filter(
        (campaign) => campaign.owner === walletAddress
      );
    }
    return parsedCampaigns;
  };

  useEffect(() => {
    if (isLoadingCampaigns || isError) return;
    const campaigns = getCampaigns(isFilteredByOwner);
    setParsedCampaigns(campaigns);
  }, [isLoadingCampaigns]);

  useEffect(() => {
    setShownCampaigns(
      parsedCampaigns.filter((item) =>
        item.title.toLowerCase().includes(campaignsFilter.toLowerCase())
      )
    );
  }, [campaignsFilter, parsedCampaigns]);

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };
  return (
    <div>
      <h1
        className={`font-semibold text-left ${
          isDarkTheme ? "dark" : "light"
        } text-[var(--color-text)]`}
      >
        {title} ({shownCampaigns.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoadingCampaigns ? (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain mx-auto mt-[160px]"
          ></img>
        ) : shownCampaigns.length > 0 ? (
          shownCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))
        ) : (
          shownCampaigns.length === 0 && (
            <p className=" font-semibold text-[14px] leading-[30px] text-[#818183]">
              We could not find any campaigns
            </p>
          )
        )}
      </div>
    </div>
  );
}
