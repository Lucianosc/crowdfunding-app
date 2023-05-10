import React, { useContext, createContext } from "react";
import {
  useAccount,
  useContract,
  useConnect,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ethers } from "ethers";
import contractABI from "../constants/contractABI.json";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  // hook used to get the contract instance at the specified address.
  const contract = useContract({
    address: contractAddress,
    abi: contractABI,
  });

  //hook used to create a write method for the contract method createCampaign

  // const { config: createCampaignConfig } = usePrepareContractWrite({
  //   address: contractAddress,
  //   abi: contractABI,
  //   functionName: "createCampaign",
  // });

  // const {
  //   // data,
  //   // isLoading,
  //   // isSuccess,
  //   write: createCampaign,
  // } = useContractWrite(createCampaignConfig);

  const connector = new InjectedConnector({});

  const { isConnected: isWalletConnected, address: walletAddress } =
    useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const connectWallet = () => connect({ connector });

  // const publishCampaign = async (form) => {
  //   console.log(form);
  //   try {
  //     // to write a method for the contract we need to pass all the parameters of the method in order
  //     const data = await createCampaign([
  //       address, //owner's address
  //       form.title,
  //       form.description,
  //       ethers.utils.parseUnits(form.target, "ether"),
  //       new Date(form.deadline).getTime(),
  //       form.image,
  //     ]);
  //     console.log("contract call success", data);
  //   } catch (e) {
  //     console.log("contract call failure", e);
  //   }
  // };

  return (
    <StateContext.Provider
      value={{
        contractAddress,
        contract,
        contractABI,
        walletAddress,
        isWalletConnected,
        connectWallet,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
