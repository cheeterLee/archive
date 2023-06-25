import { Box, Flex, Heading, Skeleton, Stack, Divider } from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom"
import { ImageCard } from "."

export interface IDisplayImagesProps {
	title: string
	isLoading: boolean
	images: any
}

const DisplayImages: React.FunctionComponent<IDisplayImagesProps> = ({
	title,
	isLoading,
	images,
}) => {
	const navigate = useNavigate()
	const handleNavigate = (image: any) => {
		navigate(`${image.pId}`, { state: image })
	}

	//TODO 2. sort the image by date timestamp
	return (
		<Box padding="1rem 3rem" display='flex' flexDirection='column' alignItems='center'>
			<Heading as="h3" size="lg" padding='1rem'>
				{title} ({images.length})
			</Heading>
			<Divider />
			{isLoading && (
				<Stack gap=".2rem" padding="2rem">
					<Skeleton height="5rem" />
					<Skeleton height="5rem" />
					<Skeleton height="5rem" />
					<Skeleton height="5rem" />
					<Skeleton height="5rem" />
					<Skeleton height="5rem" />
					<Skeleton height="5rem" />
					<Skeleton height="5rem" />
				</Stack>
			)}
			{!isLoading && images.length === 0 && (
				<Stack justify="center" align="center">
					Sorry...No images available
				</Stack>
			)}
			
			<Flex padding='1rem .5rem' gap='1.5rem' flexWrap='wrap'>
				{!isLoading &&
					images.length > 0 &&
					images.map((image: any) => (
						<ImageCard key={image.pId} {...image} handleClick={() => handleNavigate(image)} />
					))}
			</Flex>
		</Box>
	)
}

export default DisplayImages

/**
 * localhost:3000/gallery/:id
 */