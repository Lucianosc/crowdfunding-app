import React, { useContext, createContext } from "react";
import { useAccount, useContract, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import contractABI from "../constants/contractABI.json";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  // hook used to get the contract instance at the specified address.
  const contract = useContract({
    address: contractAddress,
    abi: contractABI,
  });

  const connector = new InjectedConnector({});

  const { isConnected: isWalletConnected, address: walletAddress } =
    useAccount();
  const { connect } = useConnect();

  const connectWallet = () => connect({ connector });

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
