import {
    Box,
	Button,
	Flex,
	Heading,
	Input,
	Text,
	Stack,
	Image,
	useToast,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	IconButton,
	Portal,
} from "@chakra-ui/react"
import React, { FormEvent, useState } from "react"
import { CustomDropzone } from "../components"
import { Web3Storage } from "web3.storage"
import { useContractContext } from "../context/ContractContext"
import { useWalletContext } from "../context/WalletContext"
import { QuestionOutlineIcon, ChevronRightIcon } from "@chakra-ui/icons"

const client = new Web3Storage({
	token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNlOERBMTYyRmQyQjY5OTZlMWQzZDUyNmUwZmY0MTM4NGI5Q2ZiRmIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzM1NzYyMzQ0ODUsIm5hbWUiOiJldmlkZW5jZSJ9.toX_pod8vFLzoWDY3Ws2EbwqjjZRSTpyKYc2SKT3rP8",
})

export interface IUploadPageProps {}

const UploadPage: React.FunctionComponent<IUploadPageProps> = (props) => {
	// chakra toast
	const toast = useToast()
	// upload image file captured from CustomDropzone
	const [uploadImage, setUploadImage] = useState<any>(null)
	// state for caption input
	const [caption, setCaption] = useState("")
	// state for loading
	const [isLoading, setIsLoading] = useState(false)
	// destructure from ContractContext
	const { createImageAsset } = useContractContext()
	// destructure from WalletContext
	const { isConnected } = useWalletContext()

	const uploadFile = async () => {
		const rootCid = await client.put([uploadImage])
		const res = await client.get(rootCid)
		if (res === null) return
		const imageObjectBack = await res.files()
		const { name } = imageObjectBack[0]
		console.log("Image Url >>>", `https://${rootCid}.ipfs.w3s.link/${name}`)
		const tempUrl = `https://${rootCid}.ipfs.w3s.link/${name}`
		return tempUrl
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		console.log("submitting....")
		setIsLoading(true)
		try {
			// upload file to ipfs
			const imageUrl = await uploadFile()
			// communicate with blockchain
			console.log("caption", caption, "url", imageUrl)
			await createImageAsset(caption, imageUrl)
			toast({
				title: "Successfully submitted :)",
				status: "success",
				isClosable: true,
			})
		} catch (error) {
			toast({
				title: "Failed to submit :(",
				status: "error",
				isClosable: true,
			})
		}
		setIsLoading(false)
		setCaption("")
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
					{uploadImage === null ? (
						<CustomDropzone setUploadImage={setUploadImage} />
					) : (
						<Image
							p="2rem"
							w="400px"
							h="400px"
							objectFit="cover"
							src={URL.createObjectURL(uploadImage)}
						/>
					)}

					<Stack>
						<Input
							placeholder="A short caption..."
							onChange={(e) => setCaption(e.target.value)}
							value={caption}
						/>
						<Button
							disabled={!isConnected}
							isLoading={isLoading}
							loadingText="submitting..."
							type="submit"
						>
							Submit
						</Button>
					</Stack>
				</form>
			</Flex>
			<Popover>
				<PopoverTrigger>
					<IconButton
						zIndex={20}
						position="fixed"
						right="10"
						bottom="10"
						aria-label="question"
						icon={<QuestionOutlineIcon />}
					/>
				</PopoverTrigger>
				<Portal>
					<PopoverContent>
						<PopoverArrow />
						<PopoverHeader>Tips 💡</PopoverHeader>
						<PopoverCloseButton />
						<PopoverFooter>
							Connect to crypto wallet first before uploading your
							asset!
						</PopoverFooter>
					</PopoverContent>
				</Portal>
			</Popover>
		</Flex>
	)
}

export default UploadPage
