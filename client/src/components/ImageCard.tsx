import React, { useState } from "react"
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
import {
	BsThreeDotsVertical,
	BsEyeSlash,
	BsHandThumbsDown,
} from "react-icons/bs"

export interface IImageCardProps {
	owner: string
	caption: string
	imageUrl: string
	handleClick: any
}

const ImageCard: React.FunctionComponent<IImageCardProps> = ({
	owner,
	caption,
	imageUrl,
	handleClick,
}) => {
	const [displayed, setDisplayed] = useState<string>("block")

	return (
		<Card
			maxW="400px"
			padding="1rem 2rem"
			display={displayed}
			// TODO: stop hover event propagating
			_hover={{
				bg: "blackAlpha.100",
			}}
		>
			<CardHeader>
				<Flex>
					<Flex flex="1" gap="4" alignItems="center" maxW="100%">
						<Avatar />
						<Text noOfLines={1}>{owner}</Text>
					</Flex>
					<Menu>
						<MenuButton
							as={IconButton}
							aria-labe="options"
							variant="ghost"
							icon={<BsThreeDotsVertical />}
						/>
						<MenuList>
							<MenuItem
								gap=".5rem"
								onClick={() => {
									setDisplayed("none")
								}}
							>
								<BsEyeSlash />
								Not interested
							</MenuItem>
							<MenuItem
								gap=".5rem"
								onClick={() => {
									//TODO navigate to report
								}}
							>
								<BsHandThumbsDown />
								Report
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</CardHeader>
			<CardBody cursor="pointer" onClick={handleClick}>
				<Text noOfLines={1}>{caption}</Text>
			</CardBody>
			<Image
				objectFit="cover"
				src={imageUrl}
				alt="image asset"
				cursor="pointer"
				onClick={handleClick}
			/>

			<CardFooter
				justify="space-evenly"
				gap=".2rem"
				flexWrap="wrap"
				sx={{
					"& > button": {
						minW: "80px",
					},
				}}
			>
				<Button
					fontSize=".9rem"
					flex="1"
					variant="ghost"
					leftIcon={<BiLike />}
				>
					Like
				</Button>
				<Button
					transform="translateX(-10px)"
					fontSize=".9rem"
					flex="1"
					variant="ghost"
					leftIcon={<BiChat />}
				>
					Comment
				</Button>
				<Button
					fontSize=".9rem"
					flex="1"
					variant="ghost"
					leftIcon={<BiShoppingBag />}
				>
					Purchase
				</Button>
			</CardFooter>
		</Card>
	)
}

export default ImageCard
