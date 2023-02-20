import React, { useState } from 'react';
import { Navbar, Container, Offcanvas, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import Web3 from 'web3';
import { useAuth } from '../../contexts/AuthContext2';

function MetaMaskConnector(props) {
  //const [account, setAccount] = useState('');
  const { isLoggedIn, setIsLoggedIn, metamaskAccount, setMetamaskAccount, web3Auth, setWeb3Auth} = useAuth();

  async function connectToMetaMask() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        //setAccount(accounts[0]);
        setIsLoggedIn(true);
        setMetamaskAccount(accounts[0]);
        setWeb3Auth(web3);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('MetaMask is not installed!');
    }
  }

  async function disconnectFromMetaMask() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
        //setAccount('');
        setIsLoggedIn(false);
        setMetamaskAccount('');
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('MetaMask is not installed!');
    }
  }

  function shortenAddress(address) {
    const prefix = address.slice(0, 4);
    const suffix = address.slice(-4);
    return `${prefix}...${suffix}`;
  }

  return (
    <div>
      {isLoggedIn ? (
        <div className="d-flex align-items-center">
          <p className="mb-0">{shortenAddress(metamaskAccount)}</p>
          <Button className="ml-2" onClick={disconnectFromMetaMask}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4.929 4.929l14.142 14.142-1.414 1.414L3.515 6.343z"/><path d="M3.515 19.071l14.142-14.142 1.414 1.414L4.929 20.485z"/></svg>
          </Button>
        </div>
      ) : (
        <Button onClick={connectToMetaMask}>Connect to MetaMask</Button>
      )}
    </div>
  );
}

export default MetaMaskConnector;
