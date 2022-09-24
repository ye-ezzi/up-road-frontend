import { createContext, useState } from "react";
import Web3Modal from 'web3modal'
import axios from "axios";
import { ethers } from 'ethers'
import { providerOptions } from '../context/walletConnect/providerOptions'

// initial state
const INITIAL_STATE = {
  address: "DEFAULT_ADDRESS",
  isConnected: false,
  walletConnect() {}
}

export const AuthProvider = ({ children }) => {

  const [address, setAddress] = useState(undefined)
  const [isConnected, setIsConnected] = useState(false)

  const walletConnect = async() => {
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions
      })
  
      const web3ModalInstance = await web3Modal.connect()
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance)
      const walletAddress = web3ModalProvider.provider.selectedAddress
  
      // console.log('web3ModalInstance', web3ModalInstance)
      // console.log('web3ModalProvider', web3ModalProvider)
      console.log('address', walletAddress)
      setAddress(walletAddress)
      setIsConnected(true)

    } catch(error) {
      console.log(error)
    }
  }
 
  const signInWithAddress = async (walletAddress) => {
    const apiUrl = `https://4b880c9d-fec7-4b7a-824d-32c94510899f.mock.pstmn.io/auth`
    if(walletAddress !== "undefined") {
      const response = await axios.post(apiUrl, {
        account_address: walletAddress
      })
      console.log(response)
    }
  }

  return (
    <AuthContext.Provider value={{ address, isConnected, walletConnect}}>
      { children }
    </AuthContext.Provider>
  )
}

export const AuthContext = createContext(INITIAL_STATE)
