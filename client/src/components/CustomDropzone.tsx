import { Flex, Text } from "@chakra-ui/react"
import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

export interface ICustomDropzonePageProps {
    setUploadImage: (img: any) => void
    setImageUrl: (imageUrl: string) => void
}

const CustomDropzonePage: React.FunctionComponent<ICustomDropzonePageProps> = (
	{ setUploadImage, setImageUrl }
) => {
	const onDrop = useCallback((acceptedFiles: any) => {
        const file = acceptedFiles[0]
        setUploadImage(file)
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	})

	return (
		<Flex
			justify="center"
			align="center"
			textAlign="center"
			bg="#dadada"
			w={300}
			h={400}
			p={50}
			mt={7}
            mb={5}
			borderRadius={5}
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			{isDragActive ? (
				<Text>Drop the files here...</Text>
			) : (
				<Text>
					Drag 'n' drop some files here, or click to select files
				</Text>
			)}
		</Flex>
	)
}

export default CustomDropzonePage
