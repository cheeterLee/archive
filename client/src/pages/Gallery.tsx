import { Box } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { DisplayImages } from '../components'
import { useContractContext } from '../context/ContractContext'

export interface IGalleryPageProps {}

const GalleryPage: React.FunctionComponent<IGalleryPageProps> = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState([])
    const { address, contract, getImageAssets } = useContractContext()

    const fetchImages = async () => {
        setIsLoading(true)
        const data = await getImageAssets()
        setImages(data)
        setIsLoading(false)
    }

    useEffect(() => {
        if (contract) {
            fetchImages()
        }
    }, [address, contract])

    return (
        <Box>
            <DisplayImages title="All Images 👓" isLoading={isLoading} images={images} />
        </Box>
    )
}

export default GalleryPage