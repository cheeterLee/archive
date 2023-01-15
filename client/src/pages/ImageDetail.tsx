import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Flex,
	Heading,
	Image,
	Stack,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from "@chakra-ui/react"
import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useContractContext } from "../context/ContractContext"

export interface IImageDetailProps {}

const ImageDetail: React.FunctionComponent<IImageDetailProps> = (props) => {
	const { state } = useLocation()

	return (
		<Flex
			flexDirection={{
				xs: "column",
				sm: "column",
				md: "row",
				lg: "row",
				xl: "row",
			}}
			justify="center"
			p="1.5rem 1rem"
		>
			<Box p="1rem 2rem">
				<Card maxW="xl">
					<CardBody>
						<Image
							src={state.imageUrl}
							alt="image"
							borderRadius="lg"
						/>
						<Stack mt="6" spacing="3">
							<Heading size="md" textAlign="center">
								{state.caption}
							</Heading>
						</Stack>
					</CardBody>
					<Divider />
					<CardFooter display="flex" justifyContent="center">
						<ButtonGroup spacing="2">
							<Button variant="solid" colorScheme="blue">
								Buy now
							</Button>
							<Button variant="ghost" colorScheme="blue">
								Add to cart
							</Button>
						</ButtonGroup>
					</CardFooter>
				</Card>
			</Box>
			<Box>
				<Tabs isFitted variant="enclosed">
					<TabList mb="1em">
						<Tab>Transaction History</Tab>
						<Tab>Comments</Tab>
						<Tab>Ownership</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<p>one!</p>
						</TabPanel>
						<TabPanel>
							<p>two!</p>
						</TabPanel>
						<TabPanel>
							<p>Three!</p>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Flex>
	)
}

export default ImageDetail
