import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { web3Modal } from "./Header";
import WalletConnect from "@walletconnect/web3-provider";
import WalletConnectProvider from "@walletconnect/web3-provider";
import toast, { Toaster } from "react-hot-toast";
import config from "../config/config";
import { Dialog, Classes } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { provider } from "./helper";
import { useAuth } from "../contexts/AuthContext2";
import { fa1 } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import "./buyForm.css";
const flatted = require("flatted");

const useStyles = makeStyles({
  balancesContainer: {
    border: "2px solid #0c0d23",
    borderRadius: "1rem",
    width: "85%",
    margin: "auto",
    padding: "0.75rem",
    backgroundColor: "#0c0d23",
    color: "white",
    paddingLeft: "25px",
    marginTop: "1rem",
    marginBottom: "2rem",
  },
  balanceHere: {
    textAlign: "center",
  },
  message: {
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0",
    padding: "1rem",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderRadius: "1rem",
    boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.5)",
    marginBottom: "1rem",
  },
  adjustSelectMenu: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdown: {
    color: "black",
    border: "1px solid #0c0d23",
    padding: "5px",
    outline: "none",
    borderRadius: "0.5rem",
    backgroundColor: "transparent",
    cursor: "pointer",
  },

  exchangeModal: {
    backgroundColor: "#0C0C24",
  },
  exchangeModalButton: {
    backgroundColor: "#BF53C8",
    color: "white",
  },
  conditionParagraph: {
    marginTop: "0.5rem",
  },
});

const ExchangeModal = (props) => {
  const [metamaskbalance, setmetamaskbalance] = useState(0);
  const [ethbalance, setethbalance] = useState(0);
  const [usdtBalance, setusdtBalance] = useState(0);
  const [swimbalance, setswimbalance] = useState(0);
  const [useramount, setuseramount] = useState(0);
  const [bnbprice, setbnbprice] = useState(0);
  const [swimTokenAmt, setSwimTokenAmt] = useState(0);

  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [getWeb3, setGetWeb3] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [isprocessing, setisprocessing] = useState(false);
  const { web3Auth, setWeb3Auth } = useAuth();
  const [selectedCurrency, setSelectedCurrency] = useState("eth");
  const [isMsgShown, setIsMsgShown] = useState(false);

  async function fetchBalance() {
    let web3 = null;
    if (window.ethereum !== undefined) {
      web3 = new Web3(Web3.givenProvider);
    } else {
      const provider = new WalletConnectProvider({
        infuraId: "9255e09afae94ffa9ea052ce163b8c90", // Required
        qrcode: false,
      });
      //Enable session (triggers QR Code modal)
      await provider.enable();
      //  Create Web3
      web3 = new Web3(provider);
    }
    if (web3 != null) {
      let accounts = await web3.eth.getAccounts();
      let userAddress = accounts[0];

      let ethBalance = await web3.eth.getBalance(userAddress);
      ethBalance = ethBalance / 10 ** 18;
      ethBalance = parseFloat(ethBalance).toFixed(6);
      setethbalance(ethBalance);

      const usdtContractGoerli = new web3.eth.Contract(
        config.USDT_ABI,
        config.USDT_ADDRESS
      );

      const balance = await usdtContractGoerli.methods
        .balanceOf(userAddress)
        .call();
      console.log(`usdt balancee: ${balance}`);

      const decimals = await usdtContractGoerli.methods.decimals().call();
      const usdtBalance = balance / Math.pow(10, decimals);
      console.log(`usdt balance: ${usdtBalance}`);
      setusdtBalance(usdtBalance);

      const swimContract = new web3.eth.Contract(
        config.SWIM_ABI,
        config.SWIM_TOKEN
      );

      let swimBalance =
        (await swimContract.methods.balanceOf(userAddress).call()) / 10 ** 18;
      setswimbalance(swimBalance);
    }
  }

  useEffect(() => {
    fetchBalance();
  }, []);

  const classes = useStyles();

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
    maxToken();
  };

  const handleBuyNowClick = () => {
    if (selectedCurrency === "eth") {
      handleSubmitTokenWithETH();
    } else {
      usdtApproval();
    }
  };

  const handleBuyNowClickGoerli = () => {
    if (selectedCurrency === "eth") {
      handleSubmitTokenWithETHGoerli();
    } else {
      usdtApprovalGoerli();
    }
  };

  useEffect(() => {
    if (selectedCurrency === `eth`) {
      setuseramount(ethbalance);
      let ethTokenToPrice = 58405;
      let tokenToeth = parseFloat(ethbalance).toFixed(6);
      let bnbPrice = parseFloat(tokenToeth * ethTokenToPrice).toFixed(6);

      if (bnbPrice > 0) {
        setbnbprice(bnbPrice);
      }
    } else if (selectedCurrency === `usdt`) {
      setuseramount(metamaskbalance);
      let usdTokenToPrice = 37;
      let tokenTousd = parseFloat(metamaskbalance).toFixed(6);
      let bnbPrice = parseFloat(tokenTousd * usdTokenToPrice).toFixed(6);

      if (bnbPrice > 0) {
        setbnbprice(bnbPrice);
      }
    }
  }, [selectedCurrency]);

  useEffect(() => {
    setGetWeb3(web3Auth);
    getMetamaskBalance(web3Auth);
  });

  const getMetamaskBalance = async (web3) => {
    var currentNetwork = await web3.eth.getChainId();
    /*
    if (currentNetwork != "1") {
      toast.error("Please Select ETH mainnet!!");
      return;
    }
*/
    const accounts = await web3.eth.getAccounts();
    var from_address = accounts[0];

    const contract = await new web3.eth.Contract(
      config.BYC_ABI,
      config.BYC_TOKEN
    );
    let decimals = await contract.methods.decimals().call();

    var currentBal =
      (await contract.methods.balanceOf(from_address).call()) / 10 ** 6;

    const contract1 = await new web3.eth.Contract(
      config.SWIM_ABI,
      config.SWIM_TOKEN
    );

    var currentBal2 =
      (await contract1.methods.balanceOf(from_address).call()) / 10 ** 18;

    var getBalance1 = (await web3.eth.getBalance(from_address)) / 10 ** 18;
    var currentBal1 = getBalance1.toFixed(6);

    setmetamaskbalance(currentBal);
    setethbalance(currentBal1);
    setswimbalance(currentBal2);
  };

  const maxToken = async () => {
    if (selectedCurrency === `eth`) {
      setuseramount(ethbalance);
    } else if (selectedCurrency === `usdt`) {
      setuseramount(metamaskbalance);
    }
  };

  const inputHandler = (e) => {
    let { name, value, id } = e.target;
    if (value < 0) {
      value = value * -1;
    }
    setuseramount(value);
    if (selectedCurrency === `eth`) {
      let ethTokenToPrice = 58405;
      let tokenToeth = parseFloat(value).toFixed(6);
      let bnbPrice = parseFloat(tokenToeth * ethTokenToPrice).toFixed(6);

      if (bnbPrice > 0) {
        setbnbprice(bnbPrice);
      }
    } else if (selectedCurrency === `usdt`) {
      let usdTokenToPrice = 37;
      let tokenTousd = parseFloat(value).toFixed(6);
      let bnbPrice = parseFloat(tokenTousd * usdTokenToPrice).toFixed(6);

      if (bnbPrice > 0) {
        setbnbprice(bnbPrice);
      }
    }
  };

  const usdtApprovalGoerli = async () => {
    let web3 = null;
    if (window.ethereum !== undefined) {
      web3 = new Web3(Web3.givenProvider);
    } else {
      const provider = new WalletConnectProvider({
        infuraId: "9255e09afae94ffa9ea052ce163b8c90", // Required
        qrcode: false,
      });

      //  Enable session (triggers QR Code modal)
      await provider.enable();

      //  Create Web3
      web3 = new Web3(provider);
    }
    if (web3 != null) {
      try {
        setisprocessing(true);

        var currentNetwork = await web3.eth.getChainId();

        var accounts = await web3.eth.getAccounts();

        const userAddress = accounts[0];
        /*
    if (!provider.connected) {
      provider.enable();
    }
    let newProvider = new Web3(provider);
  */
        const usdtContract = new web3.eth.Contract(
          config.USDT_ABI,
          config.USDT_ADDRESS
        );
        var supply_amount = parseFloat(useramount);
        if (isNaN(supply_amount)) {
          alert("Invalid Amount value");
        }

        const amountToApprove = supply_amount * 10 ** 6;

        const result = await usdtContract.methods
          .approve(config.PRE_SALE_ADDRESS_GOERL, amountToApprove)
          .send({
            from: userAddress,
          });

        const contract = new web3.eth.Contract(
          config.PRE_SALE_ABI_GOERLI,
          config.PRE_SALE_ADDRESS_GOERL
        );

        var tx_builder = "";
        tx_builder = await contract.methods.buyTokensWithUSDT(amountToApprove);
        let encoded_tx = tx_builder.encodeABI();
        let gasPrice = await web3.eth.getGasPrice();

        const tx = {
          from: userAddress,
          to: config.PRE_SALE_ADDRESS_GOERL,
          gasPrice: gasPrice,
          data: encoded_tx,
        };

        const gas = await web3.eth.estimateGas(tx);

        tx.gas = gas;
        const receipt = await web3.eth.sendTransaction(tx);

        if (receipt) {
          contract.events.newVesting().on("data", (event) => {
            console.log(`Print event: ${event.returnValues}`);
            console.log(JSON.stringify(event.returnValues, null, 4));
            // Do something with the emitted event
          });
        } else {
          toast.error(`${receipt.message}`);
          return false;
        }
        setisprocessing(false);
      } catch (error) {
        console.log(error);
        console.log(`Tx Failed`);
        setisprocessing(false);
      }
    } else {
      alert(`Install Metamask wallet`);
    }
  };

  const usdtApproval = async () => {
    let web3 = null;
    if (window.ethereum !== undefined) {
      web3 = new Web3(Web3.givenProvider);
    } else {
      const provider = new WalletConnectProvider({
        infuraId: "9255e09afae94ffa9ea052ce163b8c90", // Required
        qrcode: false,
      });

      //  Enable session (triggers QR Code modal)
      await provider.enable();

      //  Create Web3
      web3 = new Web3(provider);
    }
    if (web3 != null) {
      try {
        var currentNetwork = await web3.eth.getChainId();

        if (currentNetwork != "0x1" && currentNetwork != "1") {
          toast.error("Please Select ETH mainnet!!");
          return;
        }

        var accounts = await web3.eth.getAccounts();

        const userAddress = accounts[0];

        const usdtContract = new web3.eth.Contract(
          config.USDT_ABI,
          config.USDT_ADDRESS
        );
        var supply_amount = parseFloat(useramount);
        if (isNaN(supply_amount)) {
          alert("Invalid Amount value");
        }

        const amountToApprove = supply_amount * 10 ** 6;

        const result = await usdtContract.methods
          .approve(config.PRE_SALE_ADDRESS, amountToApprove)
          .send({
            from: userAddress,
          });

        const contract = new web3.eth.Contract(
          config.PRE_SALE_ABI,
          config.PRE_SALE_ADDRESS
        );

        var tx_builder = "";
        tx_builder = await contract.methods.buyTokensWithUSDT(amountToApprove);
        let encoded_tx = tx_builder.encodeABI();
        let gasPrice = await web3.eth.getGasPrice();

        const tx = {
          from: userAddress,
          to: config.PRE_SALE_ADDRESS,
          gasPrice: gasPrice,
          data: encoded_tx,
        };

        const gas = await web3.eth.estimateGas(tx);

        tx.gas = gas;
        const receipt = await web3.eth.sendTransaction(tx);

        if (receipt) {
          contract.events.newVesting().on("data", (event) => {
            console.log(`Print event: ${event.returnValues}`);
            console.log(JSON.stringify(event.returnValues, null, 4));
          });
          console.log("Transaction", receipt);
        } else {
          console.log("Transaction123", receipt);

          toast.error(`${receipt.message}`);
          // setisprocessing(false)
          // setisDialogOpen(false)
        }
        setisprocessing(false);
      } catch (error) {
        console.log(error);
        console.log(`Tx Failed`);
        setisprocessing(false);
      }
    } else {
      alert(`Install Metamask wallet`);
    }
  };

  const handleSubmitTokenWithETHGoerli = async () => {
    let web3 = null;
    if (window.ethereum !== undefined) {
      web3 = new Web3(Web3.givenProvider);
    } else {
      const provider = new WalletConnectProvider({
        infuraId: "9255e09afae94ffa9ea052ce163b8c90", // Required
        qrcode: false,
      });

      //  Enable session (triggers QR Code modal)
      await provider.enable();

      //  Create Web3
      web3 = new Web3(provider);
    }
    if (web3 != null) {
      //  Create WalletConnect Provider
      var supply_amount = parseFloat(useramount);

      if (!supply_amount) {
        toast.error("Please Enter amount");
        return false;
      }

      try {
        var currentNetwork = await web3.eth.getChainId();

        var accounts = await web3.eth.getAccounts();
        let from_address = accounts[0];
        var getBalace = (await web3.eth.getBalance(from_address)) / 10 ** 18;
        var currentBal = parseFloat(getBalace).toFixed(6);

        setisprocessing(true);

        const contract = new web3.eth.Contract(
          config.PRE_SALE_ABI_GOERLI,
          config.PRE_SALE_ADDRESS_GOERL
        );
        var tx_builder = "";

        supply_amount = web3.utils.toWei(supply_amount.toString(), "ether");

        tx_builder = await contract.methods.buyTokensWithEth();
        let encoded_tx = tx_builder.encodeABI();
        let gasPrice = await web3.eth.getGasPrice();
        const tx = {
          from: from_address,
          to: config.PRE_SALE_ADDRESS_GOERL,
          gasPrice: gasPrice,
          data: encoded_tx,
          value: supply_amount,
        };
        const gas = await web3.eth.estimateGas(tx);
        tx.gas = gas;

        const receipt = await web3.eth.sendTransaction(tx);
        if (receipt) {
          console.log("Transaction", receipt);
        } else {
          console.log("Transaction123", receipt);

          toast.error(`${receipt.message}`);

          return false;
        }
        setisprocessing(false);
      } catch (error) {
        console.log("err", error);
        console.log(JSON.stringify(error, null, 4));
        toast.error(
          `Something went wrong! Please try again later. ${error.toString()}`
        );
        setisprocessing(false);
        return false;
      }
    } else {
      alert(`Install Metamask wallet`);
    }
  };

  const handleSubmitTokenWithETH = async () => {
    let web3 = null;
    if (window.ethereum !== undefined) {
      web3 = new Web3(Web3.givenProvider);
    } else {
      const provider = new WalletConnectProvider({
        infuraId: "9255e09afae94ffa9ea052ce163b8c90", // Required
        qrcode: false,
      });

      //  Enable session (triggers QR Code modal)
      await provider.enable();

      //  Create Web3
      web3 = new Web3(provider);
    }
    if (web3 != null) {
      var supply_amount = parseFloat(useramount);

      if (!supply_amount) {
        toast.error("Please Enter amount");
        return false;
      }

      // setisDialogOpen(true)
      try {
        //var web3 = web3Auth;
        var currentNetwork = await web3.eth.getChainId();
        if (currentNetwork != "0x1" && currentNetwork != "1") {
          toast.error("Please Select ETH mainnet!!");
          return;
        }

        var accounts = await web3.eth.getAccounts();
        let from_address = accounts[0];
        var getBalace = (await web3.eth.getBalance(from_address)) / 10 ** 18;
        var currentBal = parseFloat(getBalace).toFixed(6);

        setisprocessing(true);

        const contract = new web3.eth.Contract(
          config.PRE_SALE_ABI,
          config.PRE_SALE_ADDRESS
        );
        var tx_builder = "";

        supply_amount = web3.utils.toWei(supply_amount.toString(), "ether");

        tx_builder = await contract.methods.buyTokensWithEth();
        let encoded_tx = tx_builder.encodeABI();
        let gasPrice = await web3.eth.getGasPrice();
        const tx = {
          from: from_address,
          to: config.PRE_SALE_ADDRESS,
          gasPrice: gasPrice,
          data: encoded_tx,
          value: supply_amount,
        };
        const gas = await web3.eth.estimateGas(tx);
        tx.gas = gas;

        const receipt = await web3.eth.sendTransaction(tx);
        if (receipt) {
        } else {
          toast.error(`${receipt.message}`);

          return false;
        }
        setisprocessing(false);
      } catch (error) {
        console.log("err", error);
        console.log(JSON.stringify(error, null, 4));
        toast.error(
          `Something went wrong! Please try again later. ${error.toString()}`
        );
        setisprocessing(false);
      }
    } else {
      alert(`Install Metamask wallet`);
    }
  };

  const buyToken = async () => {
    if (window.ethereum) {
      try {
        let amount = useramount;
        if (!amount || amount <= 0) {
          // setmsg('Please Enter amount')
          return false;
        }
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setisDialogOpen(true);
        // setisprocessing(true)

        var web3 = new Web3(window.ethereum);
        var currentNetwork = web3.currentProvider.chainId;

        var chainId = "0x1";
        var from_address = accounts[0];

        var getBalace = (await web3.eth.getBalance(from_address)) / 10 ** 18;
        var currentBal = parseFloat(getBalace).toFixed(6);

        const contract = await new web3.eth.Contract(
          config.BYC_ABI,
          config.BYC_TOKEN
        );
        let decimals = await contract.methods.decimals().call();

        var currentTokenBal =
          (await contract.methods.balanceOf(from_address).call()) / 10 ** 18;

        let allowanceBalance = await contract.methods
          .allowance(from_address, config.PRE_SALE_ADDRESS)
          .call();

        if (getBalace == 0 || currentTokenBal == 0) {
          toast.error(`insufficient funds for transfer`);
          setisDialogOpen(false);
          // setisprocessing(false)
          return false;
        }

        allowanceBalance = allowanceBalance / 10 ** 18;
        if (amount !== allowanceBalance || allowanceBalance > amount) {
          amount = parseInt(amount * 10 ** decimals).toString();

          let trx = await contract.methods.approve(
            config.PRE_SALE_ADDRESS,
            amount
          );

          let encodeData = trx.encodeABI();
          console.log("tr", encodeData);
          let gasPrice = await web3.eth.getGasPrice();

          let gasLimit = await web3.eth.estimateGas({
            gasPrice: web3.utils.toHex(gasPrice),
            to: config.BYC_TOKEN,
            from: from_address,
            value: 0,
            data: encodeData,
            chainId: chainId,
          });
          const txData = await web3.eth.sendTransaction({
            gasPrice: web3.utils.toHex(gasPrice),
            gas: web3.utils.toHex(gasLimit),
            to: config.BYC_TOKEN,
            from: from_address,
            data: encodeData,
            value: 0,
            chainId: chainId,
          });
          if (txData.transactionHash) {
            console.log("tx1234", txData.transactionHash);
            handleSubmitToken1();
          }
        } else {
          handleSubmitToken1();
        }
      } catch (error) {
        console.log("error", error);
        setisDialogOpen(false);
        // setisprocessing(false)

        toast.error(`Something went wrong! Please try again later.`);
        return false;
      }
    } else {
      toast.error(`Please connect your MetaMask wallet!`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }
  };

  const handleSubmitToken1 = async () => {
    var supply_amount = parseFloat(useramount);

    if (!supply_amount) {
      toast.error("Please Enter amount");
      return false;
    }

    setisDialogOpen(true);
    // setisprocessing(true)

    if (window.ethereum) {
      // try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      var web3 = new Web3(window.ethereum);

      const contract = await new web3.eth.Contract(
        config.PRE_SALE_ABI,
        config.PRE_SALE_ADDRESS
      );
      var tx_builder = "";
      var from_address = accounts[0];
      tx_builder = await contract.methods.buyTokensWithUSDT(from_address);
      // console.log('tx',tx_builder);
      let encoded_tx = tx_builder.encodeABI();

      var currentNetwork = web3.currentProvider.chainId;

      if (currentNetwork !== "0x1") {
        // toast.error(`Please select BNB  network !`);
        // setisprocessing(true)
        return false;
      }
      var chainId = "0x1";

      const contractbalance = await new web3.eth.Contract(
        config.BYC_ABI,
        config.BYC_TOKEN
      );
      let decimals = await contractbalance.methods.decimals().call();

      var currentBal =
        (await contractbalance.methods.balanceOf(from_address).call()) /
        10 ** 18;

      if (currentBal < supply_amount) {
        toast.error(`insufficient funds for transfer`);
        // setisprocessing(false)
        setisDialogOpen(false);
        return false;
      }

      setisDialogOpen(true);

      supply_amount = supply_amount * 10 ** 18;
      supply_amount = web3.utils.toWei(supply_amount.toString(), "ether");

      let gasPrice = await web3.eth.getGasPrice();
      let gasLimit = await web3.eth.estimateGas({
        gasPrice: web3.utils.toHex(gasPrice),
        to: config.PRE_SALE_ADDRESS,
        from: from_address,
        data: encoded_tx,
        // value: 0,
        chainId: chainId,
      });
      console.log("gas", gasLimit);

      const txData = await web3.eth.sendTransaction({
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(gasLimit),
        to: config.PRE_SALE_ADDRESS,
        from: from_address,
        data: encoded_tx,
        // value: 0,
        chainId: chainId,
      });
      console.log("tx123", txData);

      if (txData.transactionHash) {
        console.log("txdata", txData.transactionHash);
        // await metamaskConfirm(txData.transactionHash);
      } else {
        console.log("txdata1232", txData);

        toast.error(`${txData.message}`);
        // setisprocessing(false)
        setisDialogOpen(false);
        return false;
      }
      // }
      // catch (error) {
      //   toast.error(`Something went wrong! Please try again later. ${error.toString()}`);
      //   // setisprocessing(false)
      //   setisDialogOpen(false)
      //   return false;
      // }
    } else {
      toast.error(`Please connect your MetaMask wallet!`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setisDialogOpen(false);

      return false;
    }
  };

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-box"
    >
      <Modal.Header closeButton className="header">
        <Modal.Title id="contained-modal-title-vcenter">
          <h3 className="modal-head"> BUY: SWIM TOKEN </h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="body">
        <div className={`exchange-modal`}>
          <div className={classes.balanceHere}>
            <span>
              <p className="choose">Choose a network: &nbsp;</p>
            </span>
            <select
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              className={classes.dropdown}
            >
              <option value="eth">ETH</option>
              <option value="usdt">USDT</option>
            </select>
          </div>
          <div className={classes.balancesContainer}>
            <div className={`balance-here d-flex align-items-center`}>
              <img alt="ETH" src="images/icons/ether.png" className="icons" />
              <p
                style={{
                  lineHeight: "3rem",
                  fontSize: "1rem",
                  padding: "1px",
                }}
              >
                ETH BALANCE: {ethbalance}{" "}
              </p>
            </div>
            <div className="balance-here d-flex align-items-center">
              <img alt="USDT" src="images/icons/usdt.png" className="icons" />
              <p
                style={{
                  lineHeight: "3rem",
                  fontSize: "1em",
                  padding: "1px",
                }}
              >
                {" "}
                USDT BALANCE: {usdtBalance}{" "}
              </p>
            </div>
            <div className="balance-here d-flex align-items-center">
              <img
                alt="SWIM"
                src="assets/img/logo.png"
                style={{ width: "25px" }}
                className="icons"
              />
              <p
                style={{
                  lineHeight: "3rem",
                  fontSize: "1rem",
                  padding: "1px",
                }}
              >
                {" "}
                SWIM BALANCE: {swimbalance}{" "}
              </p>
              <hr />
            </div>
          </div>
          <div className="forminput">
            <div className="step-box">
              <p className="label">
                Pay
                {selectedCurrency === "eth" ? (
                  <span> ETH:</span>
                ) : (
                  <span> USDT:</span>
                )}
              </p>
            </div>
            <div className="enter-input">
              <input
                type="number"
                onChange={inputHandler}
                onKeyPress={preventMinus}
                class="form-control "
                value={useramount}
                name="useramount"
                placeholder="0"
                className="inpt"
              />
              <button className="maxbtn" onClick={maxToken}>
                MAX
              </button>
            </div>
            <p className={classes.conditionParagraph}>
              <strong>Minimum Buy:</strong> 1000 Swim | $27 | 0.018 ETH
            </p>
          </div>

          <div className="forminput">
            <div className="step-box">
              <p className="label">Receive SWIM:</p>
            </div>
            <div className="enter-input">
              <input
                type="text"
                value={bnbprice}
                placeholder="0"
                className="inpt"
              />
            </div>
          </div>
          <p style={{ fontSize: "10px" }}> 2M Cliff, 12M Vesting.</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="form-footer">
        {isprocessing && (
          <button disabled className="buyNowBtn">
            Proceeding ... Please Wait
          </button>
        )}
        {!isprocessing &&
          (bnbprice < 999 ? (
            <button
              disabled
              className="buyNowBtn"
              onClick={handleBuyNowClick}
              onMouseOver={() => setIsMsgShown(true)}
              onMouseOut={() => setIsMsgShown(false)}
            >
              Buy Now
            </button>
          ) : (
            <button className="buyNowBtn" onClick={handleBuyNowClick}>
              Buy Now
            </button>
          ))}
        {isMsgShown ? (
          <p className={classes.conditionParagraph}>
            <strong>Minimum Buy:</strong> 1000 Swim | $27
          </p>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
};
export default ExchangeModal;
