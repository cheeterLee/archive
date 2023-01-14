import { Button, Flex, Heading, Input, Text, Stack } from "@chakra-ui/react"
import React from "react"
import { CustomDropzone } from "../components"

export interface IUploadPageProps {}

const UploadPage: React.FunctionComponent<IUploadPageProps> = (props) => {
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
                <form>

				<CustomDropzone />
				<Stack>
					<Input placeholder="A short caption..." />
					<Button>Submit</Button>
				</Stack>
                </form>
			</Flex>
		</Flex>
	)
}

export default UploadPage
