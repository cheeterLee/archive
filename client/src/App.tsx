import { Box } from "@chakra-ui/react"
import { Route, Routes, Navigate } from "react-router-dom"
import { Navbar } from "./components"
import { Home, Upload, Gallery, Mint, Contact } from "./pages"

export default function App() {
	return (
		<Box>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/upload" element={<Upload />} />
				<Route path="/gallery" element={<Gallery />} />
				<Route path="/mint" element={<Mint />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Box>
	)
}
