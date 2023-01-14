import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../src/chakra/theme"
import { ContractContextProvider } from "./context/ContractContext"
import { WalletContextProvider } from "./context/WalletContext"

const container = document.getElementById("root")
const root = createRoot(container!)

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThirdwebProvider desiredChainId={ChainId.Goerli}>
				<ChakraProvider theme={theme}>
					<ContractContextProvider>
						<WalletContextProvider>
							<App />
						</WalletContextProvider>
					</ContractContextProvider>
				</ChakraProvider>
			</ThirdwebProvider>
		</BrowserRouter>
	</React.StrictMode>
)
