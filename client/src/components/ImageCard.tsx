import React from "react"
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Button,
	Image,
	Avatar,
	Flex,
	IconButton,
	Box,
	Text,
	Heading,
} from "@chakra-ui/react"
import { BiLike, BiChat, BiShare } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs' 

export interface IImageCardProps {
    owner: string
    caption: string
    imgUrl: string
}

const ImageCard: React.FunctionComponent<IImageCardProps> = ({ owner, caption, imgUrl }) => {
    

	return (
		<Card maxW='400px' padding='1rem 2rem'>
			<CardHeader>
				<Flex>
					<Flex flex="1" gap="4" alignItems="center" maxW='100%'>
						<Avatar/>
						<Text noOfLines={1}>{owner}</Text>
					</Flex>
					<IconButton
						variant="ghost"
						colorScheme="gray"
						aria-label="See menu"
						icon={<BsThreeDotsVertical />}
					/>
				</Flex>
			</CardHeader>
			<CardBody>
				<Text noOfLines={1}>{caption}</Text>
			</CardBody>
			<Image
				objectFit="cover"
				src={imgUrl}
				alt="image asset"
			/>

			<CardFooter
				justify="space-between"
				flexWrap="wrap"
				sx={{
					"& > button": {
						minW: "80px",
					},
				}}
			>
				<Button flex="1" variant="ghost" leftIcon={<BiLike />}>
					Like
				</Button>
				<Button flex="1" variant="ghost" leftIcon={<BiChat />}>
					Comment
				</Button>
				<Button flex="1" variant="ghost" leftIcon={<BiShare />}>
					Share
				</Button>
			</CardFooter>
		</Card>
	)
}

export default ImageCard
