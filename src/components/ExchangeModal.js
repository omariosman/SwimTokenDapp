import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Container, Row, Spinner, Form } from "react-bootstrap";
import Cookies from "js-cookie";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { web3Modal } from "./Header";
import WalletConnect from "@walletconnect/web3-provider";
import WalletConnectProvider from "@walletconnect/web3-provider";
import toast, { Toaster } from "react-hot-toast";
import config from "../config/config";
import { Dialog, Classes } from "@blueprintjs/core";
import DialogBox from "./DialogBox";
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
    backgroundColor: '#BF53C8',
    color: 'white',
  },
  courierNew: {
    fontFamily: "Courier New"
  },
  btnLoadingSpinner: {
    border: "1px solid #2d3436",
    padding:"0.4rem",
    color: "#dfe6e9",
    backgroundColor: "#ecf0f1",
    width: "100%",
    fontWeight: "900"
  },
  buyNowBtn: {
    border: "1px solid #2d3436",
    padding:"0.4rem",
    color: "#dfe6e9",
    backgroundColor: "#2d3436",
    width: "100%",
    fontWeight: "900"
  },
  maxBtn: {
    border: "1px solid #2d3436",
    padding:"0.3rem",
    color: "#b2bec3",
    backgroundColor: "#2d3436",
    fontWeight: "900"
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
  const [swimTokenAmt, setSwimTokenAmt] = useState(0);

  const [getWeb3, setGetWeb3] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [isprocessing, setisprocessing] = useState(false);
  const { web3Auth, setWeb3Auth } = useAuth();
  const [selectedCurrency, setSelectedCurrency] = useState("eth");
  const [isMsgShown, setIsMsgShown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);

  const [dialogBoxText, setDialogBoxText] = useState("");


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
      //Create Web3
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
      let swimTokenAmt = parseFloat(tokenToeth * ethTokenToPrice).toFixed(6);
  
      if (swimTokenAmt > 0) {
        setSwimTokenAmt(swimTokenAmt); 
      }
    } else if (selectedCurrency === `usdt`) {
      setuseramount(metamaskbalance);
      let usdTokenToPrice = 37;
      let tokenTousd = parseFloat(metamaskbalance).toFixed(6);
      let swimTokenAmt = parseFloat(tokenTousd * usdTokenToPrice).toFixed(6);
  
      if (swimTokenAmt > 0) {
        setSwimTokenAmt(swimTokenAmt); 
      }
    }
  }, [selectedCurrency]);

  useEffect(() => {
    setGetWeb3(web3Auth);
    getMetamaskBalance(web3Auth);
  });

  const getMetamaskBalance = async (web3) => {
    var currentNetwork = await web3.eth.getChainId();
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
    let swimTokenAmt = parseFloat(tokenToeth * ethTokenToPrice).toFixed(6);

    if (swimTokenAmt > 0) {
      setSwimTokenAmt(swimTokenAmt); 
    }
  } else if (selectedCurrency === `usdt`) {
    let usdTokenToPrice = 37;
    let tokenTousd = parseFloat(value).toFixed(6);
    let swimTokenAmt = parseFloat(tokenTousd * usdTokenToPrice).toFixed(6);

    if (swimTokenAmt > 0) {
      setSwimTokenAmt(swimTokenAmt); 
    }
  };
}

  const usdtApprovalGoerli = async () => {
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

      //Create Web3
      web3 = new Web3(provider);
    }
    if (web3 != null) {
      try {
        setisprocessing(true);

        var currentNetwork = await web3.eth.getChainId();

        var accounts = await web3.eth.getAccounts();

        const userAddress = accounts[0];
        
        const usdtContract = new web3.eth.Contract(
          config.USDT_ABI_GOERLI,
          config.USDT_ADDRESS_GOERLI
        );
        var supply_amount = parseFloat(useramount);
        if (isNaN(supply_amount)) {
          let errorText = `Please enter valid amount`;
          setDialogBoxText(errorText);
          setDialogBoxOpen(true);
          return false;
        }

        const amountToApprove = supply_amount * 10 ** 6;
        try {
        
          const result = await usdtContract.methods
          .approve(config.PRE_SALE_ADDRESS_GOERL, amountToApprove)
          .send({
            from: userAddress,
          });
          
        } catch(error) {
          let errorText = `${error}`;
          setDialogBoxText(errorText);
          setDialogBoxOpen(true);
        }

        const contract = new web3.eth.Contract(
          config.PRE_SALE_ABI_GOERLI,
          config.PRE_SALE_ADDRESS_GOERL
        );
        let receipt = "";
          try {
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
           receipt = await web3.eth.sendTransaction(tx);
          } catch(error) {
            let errorText = `${error}`;
            setDialogBoxText(errorText);
            setDialogBoxOpen(true);
          }


        if (receipt) {
          let successText = `Transaction is successful. You got ${swimTokenAmt} Swim Tokens.`;
          setDialogBoxText(successText);
          setDialogBoxOpen(true);
        } else {
          let errorText = `${receipt.message}`;
          setDialogBoxText(errorText);
          setDialogBoxOpen(true);
          //toast.error(`${receipt.message}`);
          return false;
        }
        setisprocessing(false);
      } catch (error) {
        setisprocessing(false);
        let errorText = `${error}`;
        setDialogBoxText(errorText);
        setDialogBoxOpen(true);
      }
    } else {
      let errorText = `Install Metamask wallet`;
      setDialogBoxText(errorText);
      setDialogBoxOpen(true);
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
          let errorText = `Please enter valid amount`;
          setDialogBoxText(errorText);
          setDialogBoxOpen(true);
        }

        const amountToApprove = supply_amount * 10 ** 6;
        
        
        const checkAllowance = await usdtContract.methods
          .allowance(userAddress, config.PRE_SALE_ADDRESS).call();

        const usdtApproveZero = await usdtContract.methods
          .approve(config.PRE_SALE_ADDRESS, 0)
          .send({
            from: userAddress,
            gasLimit: 200000
          });

        const result = await usdtContract.methods
          .approve(config.PRE_SALE_ADDRESS, amountToApprove)
          .send({
            from: userAddress,
            gasLimit: 200000
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
        let successText = `Transaction is successful. You got ${swimTokenAmt} Swim Tokens.`;
        setDialogBoxText(successText);
        setDialogBoxOpen(true);
        } else {
          let errorText = `${receipt.message}`;
          setDialogBoxText(errorText);
          setDialogBoxOpen(true);
        }
        setisprocessing(false);
      } catch (error) {
        setisprocessing(false);
        let errorText = `${error}`;
        setDialogBoxText(errorText);
        setDialogBoxOpen(true);
      }
    } else {
      let errorText = `Install Metamask wallet`;
      setDialogBoxText(errorText);
      setDialogBoxOpen(true);
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
        toast.error("Please Enter amount",{
          position: 'top-right',
        });
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
        
        let supply_amount_wei = web3.utils.toWei(supply_amount.toString(), "ether");
        let receipt;
        try{
          tx_builder = await contract.methods.buyTokensWithEth();
          let encoded_tx = tx_builder.encodeABI();
          let gasPrice = await web3.eth.getGasPrice();
          const tx = {
            from: from_address,
            to: config.PRE_SALE_ADDRESS_GOERL,
            gasPrice: gasPrice,
            data: encoded_tx,
            value: supply_amount_wei,
          };
          const gas = await web3.eth.estimateGas(tx);
          tx.gas = gas;

          receipt = await web3.eth.sendTransaction(tx);     
          setisprocessing(false);
        } catch(error) {
          setisprocessing(false);
          let errorText = `${error}`;
          setDialogBoxText(errorText);
          setDialogBoxOpen(true);
        }
        if (receipt) {
          let successText = `Transaction is successful. You got ${swimTokenAmt} Swim Tokens.`;
          setDialogBoxText(successText);
          setDialogBoxOpen(true);
        } else {
          let errorText = `${receipt.message}`;
          setDialogBoxText(errorText);
          setDialogBoxOpen(true);
          return false;
        }
        setisprocessing(false);
      } 
      catch (error) {
        setisprocessing(false);
        let errorText = `${error}`;
        setDialogBoxText(errorText);
        setDialogBoxOpen(true);
        return false;
      }
    } else {
      //alert(`Install Metamask wallet`);
      let errorText = `Install Metamask wallet`;
      setDialogBoxText(errorText);
      setDialogBoxOpen(true);
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

        let supply_amount_wei = web3.utils.toWei(supply_amount.toString(), "ether");

        tx_builder = await contract.methods.buyTokensWithEth();
        let encoded_tx = tx_builder.encodeABI();
        let gasPrice = await web3.eth.getGasPrice();
        const tx = {
          from: from_address,
          to: config.PRE_SALE_ADDRESS,
          gasPrice: gasPrice,
          data: encoded_tx,
          value: supply_amount_wei,
        };
        const gas = await web3.eth.estimateGas(tx);
        tx.gas = gas;

        const receipt = await web3.eth.sendTransaction(tx);
        if (receipt) {
          let successText = `Transaction is successful. You got ${swimTokenAmt} Swim Tokens.`;
          setDialogBoxText(successText);
          setDialogBoxOpen(true);
        } else {
          let errorText = `${receipt.message}`;
          setDialogBoxText(errorText);
          setDialogBoxOpen(true);
          //toast.error(`${receipt.message}`);
          return false;
        }
        setisprocessing(false);
      } catch (error) {
        setisprocessing(false);
        let errorText = `${error}`;
        setDialogBoxText(errorText);
        setDialogBoxOpen(true);
      }
    } else {
      //alert(`Install Metamask wallet`);
      let errorText = `Install Metamask wallet`;
      setDialogBoxText(errorText);
      setDialogBoxOpen(true);
    }
  };

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const closeDialogBox = () => {
    setDialogBoxOpen(false);
  }

  return (
    <>
    <DialogBox
     dialogBoxOpen={dialogBoxOpen}
     closeDialogBox={closeDialogBox}
     dialogBoxText={dialogBoxText}
    >

    </DialogBox>
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
              <input type="text" value={swimTokenAmt} placeholder="0" />
            </div>
          </div>
          <p style={{ fontSize: "10px" }}> 2M Cliff, 12M Vesting.</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="form-footer">
        {isprocessing && (
          <button disabled className={classes.btnLoadingSpinner}>
                 <Spinner
                 animation="border"
                 variant="dark"
                 className="my-1"
               />
          </button>
        )}
        {!isprocessing && (
            swimTokenAmt < 0
            ? 
            (
            <button disabled className={classes.buyNowBtn}>
              Buy Now
            </button>
            )
            :
            (
              <button className={classes.buyNowBtn} onClick={handleBuyNowClickGoerli}>
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
    </>
  );
};
export default ExchangeModal;
