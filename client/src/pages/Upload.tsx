import { Button, Flex, Heading, Input, Text, Stack } from "@chakra-ui/react"
import React, { FormEvent, useState } from "react"
import { CustomDropzone } from "../components"
import { Web3Storage } from "web3.storage"

const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNlOERBMTYyRmQyQjY5OTZlMWQzZDUyNmUwZmY0MTM4NGI5Q2ZiRmIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzM1NzYyMzQ0ODUsIm5hbWUiOiJldmlkZW5jZSJ9.toX_pod8vFLzoWDY3Ws2EbwqjjZRSTpyKYc2SKT3rP8' })

export interface IUploadPageProps {}

const UploadPage: React.FunctionComponent<IUploadPageProps> = (props) => {
    // upload image file captured from CustomDropzone
    const [uploadImage, setUploadImage] = useState<any>()
    // imageUrl returned from ipfs and to write into smart contract
    const [imageUrl, setImageUrl] = useState<string>('')

    const uploadFile = async () => {
        const rootCid = await client.put([uploadImage])
		const res = await client.get(rootCid)
		if (res === null) return
		const imageObjectBack = await res.files()
		const { name } = imageObjectBack[0] 
		console.log('Image Url >>>', `https://${rootCid}.ipfs.w3s.link/${name}`)
        setImageUrl(`https://${rootCid}.ipfs.w3s.link/${name}`)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        console.log("submitting....")
		uploadFile()
        console.log(e.target)
    }

	return (
		<Flex
			p="3rem"
			justifyContent="center"
			flexDirection="column"
			alignItems="center"
		>
			<Flex
				justifyContent="center"
				flexDirection="column"
				alignItems="center"
			>
				<Heading as="h4" size="md">
					Drag and drop the phote you want upload
				</Heading>
				<Text>
					Your asset will be stored on IPFS and visible on Eth
					blockchain.
				</Text>

                <form onSubmit={handleSubmit}>
                    <CustomDropzone setUploadImage={setUploadImage} />
                    <Stack>
                        <Input placeholder="A short caption..." />
                        <Button type="submit">Submit</Button>
                    </Stack>
                </form>
			</Flex>
		</Flex>
	)
}

export default UploadPage
