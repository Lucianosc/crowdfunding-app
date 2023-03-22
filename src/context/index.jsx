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

  const address = useAddress() //  hook used to get the current user's Ethereum address.
  const connect = useMetamask() // hook used to connect the user's browser wallet (Metamask) to the dApp.

  const getCampaigns = async () => {
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
    return parsedCampaigns
  }

  const publishCampaign = async (form) => {
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

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        getCampaigns,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
