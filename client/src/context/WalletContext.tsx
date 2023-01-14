import { useContext, createContext, ReactNode, useState } from 'react'

type WalletContextProviderProps = {
    children: ReactNode
}

type WalletContext = {
    isConnected: boolean
    setIsConnected: (isConnected: boolean) => void
}

const WalletContext = createContext({} as WalletContext)

export const useWalletContext = () => {
    return useContext(WalletContext)
}

export const WalletContextProvider = ({ children }: WalletContextProviderProps) => {
    const [isConnected, setIsConnected] = useState(false)

    return (
        <WalletContext.Provider value={{ isConnected, setIsConnected }}>
            {children}
        </WalletContext.Provider>
    )
}