import React, { useContext, createContext, ReactNode } from "react"
import { useAddress, useContract, useContractWrite, useMetamask } from "@thirdweb-dev/react"
import { ethers } from "ethers"

type ContractContextProviderProps = {
    children: ReactNode
}

type ContractContext = {
    connect: any
    address: string | undefined
    contract: any
    createImageAsset: any
    getImageAssets: any
}

const ContractContext = createContext({} as ContractContext)

export const useContractContext = () => {
    return useContext(ContractContext)
}

export const ContractContextProvider = ({ children }: ContractContextProviderProps) => {
    const { contract } = useContract('0x291B5b48DCAA17bc9b8Abf378ED1120AD001d1d4')
    const { mutateAsync: createImageAsset } = useContractWrite(contract, 'createImageAsset')
    const address = useAddress()
    const connect = useMetamask()

    const publishAsset = async (caption: string, imageUrl: string) => {
        try {
            const data = await createImageAsset([
                address,
                caption,
                imageUrl,
            ])
            console.log('contract call success :)', data)
        } catch (error) {
            console.log('contract call failed :(', error)
        }
    }

    const getImageAssets = async () => {
        const images = await contract!.call('getImageAssets')

        const parsedImages = images.map((image: any, i: number) => ({
            owner: image.owneer, // Typo in smart contract...
            caption: image.caption,
            imageUrl: image.imageUrl,
            pId: i,
        }))
        console.log(parsedImages)
        return parsedImages
    }

    return (
        <ContractContext.Provider value={{
            connect,
            address,
            contract,
            createImageAsset: publishAsset,
            getImageAssets,
        }}>
            {children}
        </ContractContext.Provider>
    )
}