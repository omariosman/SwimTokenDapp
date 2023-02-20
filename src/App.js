import { BrowserRouter, Routes, Route } from "react-router-dom";
import Buy from "./components/Pages/Buy";
import Home from "./components/Home";
import config from "./config/config";
// import Presale from "./components/Presale";
import Login from "./components/Login";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { InjectedConnector } from "@web3-react/injected-connector";

import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { AuthProvider } from './contexts/AuthContext2';

function App() {
    const chains = [arbitrum, mainnet, polygon];
    // Wagmi client
    const { provider } = configureChains(chains, [
        walletConnectProvider({ projectId: "d786738840ed456764dac0d9512f4948" }),
    ]);

    const wagmiClient = createClient({
        autoConnect: true,
        connectors: modalConnectors({
          projectId: "d786738840ed456764dac0d9512f4948",
          version: "1", // or "2"
          appName: "web3Modal",
          chains,
        }),
        provider,
      });

    // Web3Modal Ethereum Client
    const ethereumClient = new EthereumClient(wagmiClient, chains);

    return (
     
        <AuthProvider>
        <WagmiConfig client={wagmiClient}>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path={`${config.baseUrl}`} element={<Home />} />
                        <Route path={`${config.baseUrl}Buy`} element={<Buy />} />
                        {/* <Route path={`${config.baseUrl}Presale`} element={<Presale />} /> */}
                        <Route path={`${config.baseUrl}Login`} element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </div>

        </WagmiConfig>
        <Web3Modal
            projectId="d786738840ed456764dac0d9512f4948"
            ethereumClient={ethereumClient}
        />
        </AuthProvider>
    );
}

export default App;
