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
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from "@chakra-ui/react"
import { BiLike, BiChat, BiShoppingBag } from "react-icons/bi"
import { BsThreeDotsVertical, BsEyeSlash } from "react-icons/bs"

export interface IImageCardProps {
	owner: string
	caption: string
	imageUrl: string
}

const ImageCard: React.FunctionComponent<IImageCardProps> = ({
	owner,
	caption,
	imageUrl,
}) => {
	return (
		<Card maxW="400px" padding="1rem 2rem">
			<CardHeader>
				<Flex>
					<Flex flex="1" gap="4" alignItems="center" maxW="100%">
						<Avatar />
						<Text noOfLines={1}>{owner}</Text>
					</Flex>
					<Menu>
						<MenuButton as={IconButton} aria-labe='options' variant='ghost' icon={<BsThreeDotsVertical />} />
						<MenuList>
							<MenuItem gap='.5rem'><BsEyeSlash />Not interested</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</CardHeader>
			<CardBody>
				<Text noOfLines={1}>{caption}</Text>
			</CardBody>
			<Image objectFit="cover" src={imageUrl} alt="image asset" />

			<CardFooter
				justify="space-evenly"
				gap='.2rem'
				flexWrap="wrap"
				sx={{
					"& > button": {
						minW: "80px",
					},
				}}
			>
				<Button fontSize='.9rem' flex="1" variant="ghost" leftIcon={<BiLike />}>
					Like
				</Button>
				<Button transform='translateX(-10px)' fontSize='.9rem' flex="1" variant="ghost" leftIcon={<BiChat />}>
					Comment
				</Button>
				<Button fontSize='.9rem' flex="1" variant="ghost" leftIcon={<BiShoppingBag />}>
					Purchase
				</Button>
			</CardFooter>
		</Card>
	)
}

export default ImageCard
