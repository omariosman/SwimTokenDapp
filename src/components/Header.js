import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Navbar, Container, Offcanvas, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import config from "../config/config";
import Cookies from "js-cookie";
import Web3 from "web3/dist/web3.min.js";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

import Web3Modal from "web3modal";
import WalletConnect from "@walletconnect/web3-provider";
import * as ethers from "ethers";
import { provider, walletConnect } from "./helper";
// import { provider } from "./helper";
// https://mainnet.infura.io/v3/9255e09afae94ffa9ea052ce163b8c90
const providerOptions = {
    // coinbasewallet: {
    //   package: CoinbaseWalletSDK,
    //   options: {
    //     appName: "Web 3 Modal Demo",
    //     infuraId: process.env.INFURA_KEY
    //   }
    // },
    walletconnect: {
        package: WalletConnect,
        options: {
            infuraId: "9255e09afae94ffa9ea052ce163b8c90",
        },
    },
};
export const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions, // required
});

const Header = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [select, setSelect] = useState("10");

    // const [provider, setProvider] = useState();
    // const [library, setLibrary] = useState();
    const [account, setAccount] = useState();
    // const [network, setNetwork] = useState();
    const [chainId, setChainId] = useState(0);

    const connectWallet = async () => {
        try {
            // const web3 = new Web3(provider);
            // const provider = await web3Modal.connect();
            // setProvider(provider);

            const accounts = await walletConnect();
            const web3 = new Web3(provider); //ethers.providers.Web3Provider(provider);
            // const accounts = await web3.eth.getAccounts();
            // console.log("provider", accounts);
            const network = await web3.eth.getChainId();

            console.log("network", network);
            if (network != 1) {
                toast.error("Please Select ETH Network!!");
                return;
            }
            if (provider.isMetamask) {
                localStorage.setItem("provider", "Metamask");
            } else if (provider.qrcode) {
                localStorage.setItem("provider", "Qrcode");
            }
            if (!(location.pathname.indexOf("presale") > -1)) {
                navigate("./presale");
            }
            if (accounts) {
                setAccount(accounts[0]);
                setChainId(network);
                props.setwalletConnected(accounts[0], web3);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (props.connectNow) {
            connectWallet();
        }
        // if (provider?.on) {
        //   const handleAccountsChanged = (accounts) => {
        //     setAccount(accounts);
        //   };

        //   const handleChainChanged = (chainId) => {
        //     setChainId(chainId);
        //   };

        //   const handleDisconnect = () => {
        //     logout();
        //   };

        //   provider.on("accountsChanged", handleAccountsChanged);
        //   provider.on("chainChanged", handleChainChanged);
        //   provider.on("disconnect", handleDisconnect);

        //   return () => {
        //     if (provider.removeListener) {
        //       provider.removeListener("accountsChanged", handleAccountsChanged);
        //       provider.removeListener("chainChanged", handleChainChanged);
        //       provider.removeListener("disconnect", handleDisconnect);
        //     }
        //   };
        // }
    }, [provider, props.connectNow]);

    const logout = async () => {
        setAccount("");
        props.setwalletConnected("");
        await web3Modal.clearCachedProvider();
        Cookies.remove("loginmetamask");
        window.localStorage.clear();
        // window.location.reload();
    };

    const connectMetasmask = async () => {
        if (window.ethereum) {
            var web3 = new Web3(window.ethereum);

            var currentNetwork = await web3.eth.getChainId();
            if (currentNetwork != "1") {
                // setmsg('Please Select ETH Network!!')
                toast.error("Please Select ETH Network!!");
                Cookies.set("loginmetamask", "");
                return;
            }
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            Cookies.set("loginmetamask", accounts[0]);

            setTimeout(() => {
                window.location.href = `${config.baseUrl}presale`;
            }, 1000);
        } else {
            toast.error("Please use Dapp browser!!");
        }
    };

    const handleChange2 = (event) => {
        setSelect(event.target.value);
    };
    return (
        // <nav >
        <header>
            {["lg"].map((expand) => (
                <Navbar key={expand} bg="black" expand={expand} className="mb-0" fixed="top">
                    <Container>
                        <Toaster style={{ zIndex: "2" }} />

                        <Navbar.Brand href="http://www.swimspreadwisdom.io">
                            <div className="logo-area">
                                <img alt="SWIM" src="assets/img/logo.png" width="120" />
                            </div>
                        </Navbar.Brand>
                        {/* <Navbar.Toggle  /> */}
                        {/* ======================Mobile header====================  */}

                        <div id="menuToggle">
                            <input type="checkbox" />
                            <span></span>
                            <span></span>
                            <span></span>
                            <ul id="menu">
                                <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center">
                                    <Nav.Link href="http://www.swimspreadwisdom.io">Home</Nav.Link>
                                    {/* <Nav.Link href="#aboutWisdom">About Wisdom</Nav.Link>
                                    <Nav.Link href="#ecoSystem">Eco System</Nav.Link>
                                    <Nav.Link target="_blank" href="assets/whitepaper/SWIM_Whitepaper.pdf">WISE Paper</Nav.Link>
                                    <Nav.Link href="#wiseConsensus">WISE Consensus</Nav.Link> */}
                                    <Nav.Link>
                                        {/* href={`${config.baseUrl}presale`} */}
                                        {account ? (
                                            <Nav.Link>
                                                <>
                                                    {account.toString().substr(0, 7) + "..." + account.toString().substr(account.length - 7)}
                                                    &nbsp;
                                                    <Button className="" onClick={logout}>
                                                        Disconnect
                                                    </Button>
                                                </>
                                            </Nav.Link>
                                        ) : (
                                            <Button
                                                className=""
                                                onClick={() => {
                                                    navigate("/presale");
                                                }}
                                            >
                                                Connect Wallet
                                            </Button>
                                        )}
                                    </Nav.Link>
                                </Nav>
                            </ul>
                        </div>
                        {/* ======================Mobile header End====================  */}
                        <Navbar id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end" className="navbar-menus">
                            <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center">
                                <Nav.Link href="http://www.swimspreadwisdom.io">Home</Nav.Link>
                                {/* <Nav.Link href="#aboutWisdom">About Wisdom</Nav.Link>
                                <Nav.Link href="#ecoSystem">Eco System</Nav.Link>
                                <Nav.Link target="_blank" href="assets/whitepaper/SWIM_Whitepaper.pdf">WISE Paper</Nav.Link>
                                <Nav.Link href="#wiseConsensus">WISE Consensus</Nav.Link> */}
                                <Nav.Link>
                                    {/* href={`${config.baseUrl}presale`} */}
                                    {}
                                </Nav.Link>
                            </Nav>
                        </Navbar>
                    </Container>
                </Navbar>
            ))}
        </header>
    );
};
export default Header;
