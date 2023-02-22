import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnect from "@walletconnect/web3-provider";
import toast, { Toaster } from "react-hot-toast";
import config from "../config/config";
import { Dialog, Classes } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { provider } from "./helper";
import { useAuth } from '../contexts/AuthContext2';
import { fa1 } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from '@material-ui/core/styles';
const flatted = require('flatted');


const useStyles = makeStyles({
  message: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '0',
    padding: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: '1rem',
    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.5)',
    marginBottom: '1rem'
  },
  adjustSelectMenu: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    backgroundColor: 'white',
    color: 'black',
    border: '2px solid black',
    padding: '5px',
  },
});

const ExchangeModal = (props) => {
  const [metamaskbalance, setmetamaskbalance] = useState(0);
  const [ethbalance, setethbalance] = useState(0);
  const [swimbalance, setswimbalance] = useState(0);
  const [useramount, setuseramount] = useState(0);
  const [bnbprice, setbnbprice] = useState(0);
  const [swimTokenAmt, setSwimTokenAmt] = useState(0);

  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [getWeb3, setGetWeb3] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [isprocessing, setisprocessing] = useState(false);
  const { web3Auth, setWeb3Auth} = useAuth();
  const [selectedCurrency, setSelectedCurrency] = useState("eth");
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

  useEffect(() => {
    if(selectedCurrency === `eth`) {
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

    if (currentNetwork != "1") {
      toast.error("Please Select ETH Network!!");
      return;
    }
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
    var currentBal1 = getBalance1;

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
    // if (value !== '') {
    //     setvalidatioError((old) => {
    //         return { ...old, ['tokenAmountError']: '', ['cryptoAmountError']: '', ['transferAmountError']: '', }
    //     })
    // }
  };

  const usdtApproval = async () => {
      // Step 1: Get the web3 instance
      //const web3Modal = new Web3Modal();
      //const web3 = new Web3(web3Modal.provider);
      try{
        var web3 = web3Auth;
        var currentNetwork = await web3.eth.getChainId();
        if (currentNetwork != "0x1" && currentNetwork != "1") {
          toast.error("Please Select ETH Network!!");
          return;
        }
  
      var accounts = await web3.eth.getAccounts();

      const userAddress = accounts[0];
      if (!provider.connected) {
        provider.enable();
      }
      let newProvider = new Web3(provider);


      const usdtContract = new web3.eth.Contract(config.USDT_ABI, config.USDT_ADDRESS);
      var supply_amount = parseFloat(useramount);
      if (isNaN(supply_amount)) {
        alert('Invalid Amount value');
        //throw new Error('Invalid useramount value');
      }
      const amountToApprove = supply_amount * 10 ** 6;
      //tweak this parameter to change the gas price
      //const gasPriceGwei = '0.3'; // Set the gas price to 20 Gwei (can be adjusted)

      //const result = await usdtContract.methods.approve(config.PRE_SALE_ADDRESS, amountToApprove).send({ 
        //from: userAddress,
        //gasPrice: web3.utils.toWei(gasPriceGwei, 'Gwei')
     // });

      const contract = new newProvider.eth.Contract(
        config.PRE_SALE_ABI,
        config.PRE_SALE_ADDRESS
      );
      //call CliffVesting BuyTokenWithUSDT function
      supply_amount = (supply_amount * 10 ** 6);
      
      var tx_builder = "";
      tx_builder = await contract.methods.buyTokensWithUSDT(supply_amount);
      let encoded_tx = tx_builder.encodeABI();
      let gasPrice = await web3.eth.getGasPrice();

      const tx = {
        from: userAddress,
        to: config.PRE_SALE_ADDRESS,
        gasPrice: gasPrice,
        data: encoded_tx,
        value: supply_amount.toString()
      }

      const gas = await web3.eth.estimateGas(tx);

      tx.gas = gas;
      
      const receipt = await web3.eth.sendTransaction(tx);
      if (receipt) {
        contract.events.newVesting({}, (error, event) => {
          console.log(`Print event: ${event}`);
        });
        
        console.log("Transaction", receipt);
        //await metamaskConfirm(txData.transactionHash);
      } else {
        console.log("Transaction123", receipt);

        toast.error(`${receipt.message}`);
        // setisprocessing(false)
        // setisDialogOpen(false)
        return false;
      }
      } catch(error) {
        console.log(error);
        console.log(`Tx Failed`);
      }
  };
  

  const handleSubmitTokenWithETH = async () => {
    var supply_amount = parseFloat(useramount);

    if (!supply_amount) {
      toast.error("Please Enter amount");
      return false;
    }

    // setisDialogOpen(true)
    try {
      var web3 = web3Auth;
      var currentNetwork = await web3.eth.getChainId();
      if (currentNetwork != "0x1" && currentNetwork != "1") {
        toast.error("Please Select ETH Network!!");
        return;
      }

      var accounts = await web3.eth.getAccounts();
      let from_address = accounts[0];
      var getBalace = (await web3.eth.getBalance(from_address)) / 10 ** 18;
      var currentBal = parseFloat(getBalace).toFixed(6);

      //   if (currentBal < supply_amount) {
      //     toast.error(`insufficient funds for transfer`);
      //     return false;
      //   }
      setisprocessing(true);

      if (!provider.connected) {
        provider.enable();
      }
      let newProvider = new Web3(provider);
      const contract = new newProvider.eth.Contract(
        config.PRE_SALE_ABI,
        config.PRE_SALE_ADDRESS
      );
      var tx_builder = "";

      //supply_amount = (supply_amount * 10 ** 18);
      supply_amount = web3.utils.toWei(supply_amount.toString(), 'ether');

      tx_builder = await contract.methods.buyTokensWithEth(from_address);
      let encoded_tx = tx_builder.encodeABI();
      let gasPrice = await web3.eth.getGasPrice();
      const tx = {
        from: from_address,
        to: config.PRE_SALE_ADDRESS,
        gasPrice: gasPrice,
        data: encoded_tx,
        value: supply_amount
      }
      const gas = await web3.eth.estimateGas(tx);
      tx.gas = gas;

      const receipt = await web3.eth.sendTransaction(tx);
      if (receipt) {

        console.log("Transaction", receipt);
        // await metamaskConfirm(txData.transactionHash);
      } else {
        console.log("Transaction123", receipt);

        toast.error(`${receipt.message}`);
        // setisprocessing(false)
        // setisDialogOpen(false)
        return false;
      }
        /*

      let gasLimit = await web3.eth.estimateGas({
        //gasPrice: web3.utils.toHex(gasPrice),
        to: config.PRE_SALE_ADDRESS,
        from: from_address,
        data: encoded_tx,
        value: supply_amount,
        // chainId: chainId,
      });
      const txData = await web3.eth.sendTransaction({
        //gasPrice: web3.utils.toHex(gasPrice),
        gasPrice: gasPrice,
        gas: web3.utils.toHex(gasLimit),
        to: config.PRE_SALE_ADDRESS,
        from: from_address,
        data: encoded_tx,
        value: supply_amount,
        // chainId: chainId,
      });
      */

    } catch (error) {
      console.log("err", error);
      console.log(JSON.stringify(error, null, 4));
      toast.error(
        `Something went wrong! Please try again later. ${error.toString()}`
      );
      setisprocessing(false);
      // setisDialogOpen(false)
      return false;
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

      supply_amount = (supply_amount * 10 ** 18);
      supply_amount = web3.utils.toWei(supply_amount.toString(), 'ether');

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

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-box"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3 className="modal-head"> BUY: SWIM TOKEN </h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="exchange-modal">
          <p className={classes.message}>Stay Tuned <br /> Buying Swim Tokens with USDT feature will be unlocked at 25th Feb.</p>
          <div className={classes.balanceHere}>
            <select value={selectedCurrency} onChange={handleCurrencyChange} className={classes.dropdown}>
              <option value="eth">ETH</option>
              <option disabled value="usdt">USDT</option>
            </select>
          </div>
          <div className={`balance-here d-flex align-items-center`} >
            <img alt="ETH" src="images/icons/ether.png" />
            <p style={{ lineHeight: "3rem", fontSize: "16px", padding: "5px" }}>
              ETH BALANCE: {ethbalance}{" "}
            </p>
            <hr />
          </div>
          <div className="balance-here d-flex align-items-center">
            <img alt="USDT" src="images/icons/usdt.png" />
            <p style={{ lineHeight: "3rem", fontSize: "16px", padding: "5px" }}>
              {" "}
              USDT BALANCE: {metamaskbalance}{" "}
            </p>
            <hr />
          </div>
          <div className="balance-here d-flex align-items-center">
            <img
              alt="SWIM"
              src="assets/img/logo.png"
              style={{ width: "25px" }}
            />
            <p style={{ lineHeight: "3rem", fontSize: "16px", padding: "5px" }}>
              {" "}
              SWIM BALANCE: {swimbalance}{" "}
            </p>
            <hr />
          </div>
          <div className="forminput">
            <div className="step-box">
              <h4>Pay</h4>
              <h5>TOKEN</h5>
            </div>
            <div className="enter-input">
              <input
                type="number"
                onKeyPress={(event) => {
                  if (!/^\d*[.]?\d{0,1}$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={inputHandler}
                class="form-control "
                value={useramount}
                name="useramount"
                placeholder="0"
              />
              <button onClick={maxToken} className="max-btn">
                MAX
              </button>
            </div>
          </div>
          <div className="forminput">
            <div className="step-box">
              <h4>Receive SWIM</h4>
            </div>
            <div className="enter-input">
              <input type="text" value={bnbprice} placeholder="0" />
            </div>
          </div>
          <p style={{ fontSize: "10px" }}> 2M Cliff, 12M Vesting.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {isprocessing && (
          <Button disabled={true} className="w-100">
            Proceeding...
          </Button>
        )}
        {!isprocessing && (
          <Button className="w-100" onClick={handleBuyNowClick}>
            BUY NOW
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
export default ExchangeModal;
