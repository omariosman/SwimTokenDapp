import React, { createContext, useState } from 'react'


//interface of the context object
interface IAuthContextValue {
  isLoggedIn: boolean
}


//inital values for the context object
const AuthContext = createContext<IAuthContextValue>({
  isLoggedIn: false,
})

const AuthProvider = (props: any) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const contextValue: IAuthContextValue = {
    isLoggedIn,
  }

  return <AuthContext.Provider value={contextValue} {...props} />
}

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
