import React, { useContext, createContext, ReactNode } from "react"
import { useAddress, useContract, useContractWrite, useMetamask } from "@thirdweb-dev/react"
import { ethers } from "ethers"

const ContractContext = createContext()

export const ContractContextProvider = ({ children }: any) => {
    const { contract } = useContract('0x291B5b48DCAA17bc9b8Abf378ED1120AD001d1d4')
    const { mutateAsync: createImageAsset } = useContractWrite(contract, 'createImageAsset')
    const address = useAddress()
    const connect = useMetamask ()

    const publishAsset = async (form: any) => {
        try {
            const data = await createImageAsset([
                address,
                form.caption,
                form.imageUrl,
            ])
            console.log('contract call success :)', data)
        } catch (error) {
            console.log('contract call failed :(', error)
        }
    }

    return (
        <ContractContext.Provider value={{
            address,
            contract,
            createImageAsset: publishAsset
        }}>
            {children}
        </ContractContext.Provider>
    )
}