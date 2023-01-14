import React, { useRef } from "react"
import {
	Box,
	Flex,
	Image,
	Heading,
	Link,
	IconButton,
	Button,
	Drawer,
	useDisclosure,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	useColorMode,
	useToast
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.svg"
import { HamburgerIcon, SunIcon, MoonIcon } from "@chakra-ui/icons"
import { useContractContext } from "../context/ContractContext"

export interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
	// chakra util function from doc
	const { isOpen, onOpen, onClose } = useDisclosure()
	const menuRef = useRef<any>()
	const { colorMode, toggleColorMode } = useColorMode()
	const toast = useToast()
	// call hook from react-router-dom
	const navigate = useNavigate()
	// destructure from ContractContext
	const { connect, address } = useContractContext()

	return (
		<Flex
			padding="2rem 4rem"
			background="whiteAlpha.100"
			alignItems="center"
			justifyContent="space-between"
			bg="blackAlpha.400"
		>
			<Flex alignItems="center" gap="1.5rem">
				<Box
					boxSize="2rem"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Image src={logo} />
				</Box>
				<Heading
					as="h1"
					display={{
						xs: "none",
						sm: "none",
						md: "none",
						lg: "flex",
						xl: "flex",
					}}
				>
					<span
						style={{
							textDecoration: "underline #ED8936",
							textUnderlineOffset: "3px",
						}}
					>
						Archive
					</span>
					.com
				</Heading>
			</Flex>
			<Flex alignItems="center" gap="2rem" fontSize="1.5rem">
				<Flex
					alignItems="center"
					gap="2rem"
					display={{
						xs: "none",
						sm: "none",
						md: "none",
						lg: "flex",
						xl: "flex",
					}}
				>
					<Link href="/">Home</Link>
					<Link href="/upload">Upload</Link>
					<Link href="/gallery">Gallery</Link>
					<Link href="/mint">Mint</Link>
					<Link href="/contact">Contact</Link>
				</Flex>
				<Flex gap=".5rem">
					<IconButton
						aria-label="open menu"
						icon={<HamburgerIcon />}
						display={{
							xs: "flex",
							sm: "flex",
							md: "flex",
							lg: "none",
							xl: "none",
						}}
						ref={menuRef}
						onClick={onOpen}
					/>
					<IconButton
						aria-label="theme"
						onClick={toggleColorMode}
						icon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
					/>
					<Button bg="orange.300"
						onClick={async () => {
							if (address) {
								navigate('upload')
							} else {
								const isConnected = await connect()
								if (isConnected) {
									toast({
										title: 'Successfully connected :)',
										status: 'success',
										isClosable: true,
									})
								} else {
									toast({
										title: 'Failed to connect :(',
										status: 'error',
										isClosable: true,
									})
								}
							}
						}}
					>
						{address ? "upload asset" : "connect wallet"}
					</Button>
				</Flex>
				<Drawer
					isOpen={isOpen}
					placement="top"
					onClose={onClose}
					finalFocusRef={menuRef}
				>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader textAlign="center">
							Archive.com
						</DrawerHeader>

						<DrawerBody>
							<Flex
								alignItems="center"
								gap="2rem"
								flexDir="column"
							>
								<Link href="/">Home</Link>
								<Link href="/upload">Upload</Link>
								<Link href="/gallery">Gallery</Link>
								<Link href="/mint">Mint</Link>
								<Link href="/contact">Contact</Link>
							</Flex>
						</DrawerBody>

						<DrawerFooter></DrawerFooter>
					</DrawerContent>
				</Drawer>
			</Flex>
		</Flex>
	)
}

export default Navbar
