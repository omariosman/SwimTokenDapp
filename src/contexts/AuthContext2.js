import React, { createContext, useState } from 'react'



//inital values for the context object
const AuthContext = createContext({
  isLoggedIn: false,
  metamaskAccount: null,
  web3Auth: null,
  setIsLoggedIn: () => {},
  setMetamaskAccount: () => {},
  setWeb3Auth: () => {}
})

const AuthProvider = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [metamaskAccount, setMetamaskAccount] = useState('');
  const [web3Auth, setWeb3Auth] = useState('');

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    metamaskAccount,
    setMetamaskAccount: setMetamaskAccount,
    web3Auth,
    setWeb3Auth: setWeb3Auth

  }

  return <AuthContext.Provider value={contextValue} {...props} />
}

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
