import React, { useContext, createContext } from 'react'
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from '@thirdweb-dev/react'
import { ethers } from 'ethers'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
  // hook used to get the contract instance at the specified address.
  const { contract } = useContract(import.meta.env.VITE_CONTRACT_ADDRESS)

  //hook used to create a write method for the contract method createCampaign
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    'createCampaign',
  )

  //hook used to create a write method for the contract method donateToCampaign
  const { mutateAsync: donateToCampaign } = useContractWrite(
    contract,
    'donateToCampaign',
  )

  const address = useAddress() //  hook used to get the current user's Ethereum address.
  const connect = useMetamask() // hook used to connect the user's browser wallet (Metamask) to the dApp.

  const publishCampaign = async (form) => {
    console.log(form)
    try {
      // to write a method for the contract we need to pass all the parameters of the method in order
      const data = await createCampaign([
        address, //owner's address
        form.title,
        form.description,
        ethers.utils.parseUnits(form.target, 'ether'),
        new Date(form.deadline).getTime(),
        form.image,
      ])
      console.log('contract call success', data)
    } catch (e) {
      console.log('contract call failure', e)
    }
  }

  const fundCampaign = async (id, amount) => {
    try {
      // to write a method for the contract we need to pass all the parameters of the method in order
      const data = await donateToCampaign([
        id,
        // override ETH value
        { value: ethers.utils.parseUnits(amount, 'ether') },
      ])
      console.log('contract call success', data)
    } catch (e) {
      console.log('contract call failure', e)
    }
  }

  const getCampaigns = async (filtered = false) => {
    const campaigns = await contract.call('getCampaigns')
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString(),
      ),
      image: campaign.image,
      id: i,
    }))
    //filter by address
    if (filtered) {
      return parsedCampaigns.filter((campaign) => campaign.owner === address)
    }
    return parsedCampaigns
  }

  const getDonations = async (id) => {
    const donations = await contract.call('getDonators', id)
    //returns an array of donators on [0] and another of the donations [1]
    const numberOfDonations = donations[0].length

    const parsedDonations = []

    for (let i = 0; numberOfDonations > i; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i]),
      })
    }

    return parsedDonations
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        getCampaigns,
        createCampaign: publishCampaign,
        fundCampaign,
        getDonationsByCampaignId: getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
