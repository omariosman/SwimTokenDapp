import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import WalletModal from "./WalletModal";
import Header from "./Header";
import Piechart from "./chart";
import ExchangeModal from "./ExchangeModal";
import config from "../config/config";
import Footer from "./Footer";
import Cookies from "js-cookie";
import { useCountdown } from "./useCountdown";
import { padding } from "@mui/system";
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import { Web3Button } from "@web3modal/react";
import DialogBox from "./DialogBox";
import { makeStyles } from '@material-ui/core/styles';
import { useAccount } from "wagmi";
import { useAuth } from '../contexts/AuthContext2';
import Web3 from 'web3';

const useStyles = makeStyles((theme) => ({
  loaderBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    textAlign: 'center',
    margin: 0,
  }

}));

const Home = () => {
  const classes = useStyles();

  const [modalShow, setModalShow] = React.useState(false);
  const [connect, setConnect] = React.useState(false);
  const [getWeb3, setGetWeb3] = React.useState({});
  const [walletConnected, setWalletConnected] = useState(false);
  const [soldToken,setsoldToken] = useState([])
  const [accountAddr, setAccountAddr] = useState("");
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const { isLoggedIn, setIsLoggedIn, web3Auth, setWeb3Auth } = useAuth();

  const onMetamaskConnect = () => {
    setMetamaskConnected(true);
  }


  const onMetamaskDisconnect = () => {
    setMetamaskConnected(false);
  }

  const {
    connector: activeConnector,
    isConnected,
    address,
    isConnecting,
    isDisconnected,
    isDisconnecting,
  } = useAccount();

  useEffect(() => {
    if (isConnected) {
      const web3 = new Web3(window.ethereum);
      setWeb3Auth(web3);
    }
  }, [isConnected]);

  // Function to update parent state
  function updateAddr(addr) {
    setAccountAddr(addr);
  }

  const getSoldTokenAPI = async() => {
    const response = await axios({
        method: 'post',
        url: "https://futureittechsolutions.com:5001/api/getsoldtoken",
        data: {
        }
    })
    .then(function (response) {
      setsoldToken(response.data.data[0])
        })
        .catch(
            error => {
            }

        );
    ;
}

  const DateTimeDisplay = ({ value, type, isDanger }) => {
    return (
      <div className={isDanger ? "countdown danger" : "countdown"}>
        <p>{value}</p>
        <span>{type}</span>
      </div>
    );
  };

  const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="show-counter">
        <a
          href="https://tapasadhikary.com"
          target="_blank"
          rel="noopener noreferrer"
          className="countdown-link"
        >
          <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
          <p>:</p>
          <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
          <p>:</p>
          <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
          <p>:</p>
          <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
        </a>
      </div>
    );
  };

  const CountdownTimer = ({ targetDate }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
      return <ExpiredNotice />;
    } else {
      return (
        <ShowCounter
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      );
    }
  };

  const THREE_DAYS_IN_MS = 27 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
  
  const ExpiredNotice = () => {
    return (
      <div className="expired-notice">
        <span>Expired!!!</span>
        <p>Please select a future date and time.</p>
      </div>
    );
  };

  const getWalletConnected = (addr, web3) => {
    console.log(`get wallet connected web3modal`);
    setWalletConnected(true);
    setConnect(false);
    setGetWeb3(web3);
  };

  const Video = () => {
    return (
      <div className="container">
        <video autoPlay playsInline muted src={"assets/img/file.mp4"} />
      </div>
    );
  };

  

  useEffect(() => {
    // if(localStorage.getItem('provider')){
    // connectWallet()
    // }
    getSoldTokenAPI()
  }, []);

  const connectClicked = () => {
    setDialogBoxOpen(true);
  }

  const disconnectClicked = () => {
    setDialogBoxOpen(true);
  }


  const cancelButton = () => {
    setDialogBoxOpen(false);
  }

  return (
    <>
      <section className="hero-section-pre">
        <Header connectNow={connect} setwalletConnected={getWalletConnected} />
        
        <div className="login-banner" style={{ backgroundImage:`url(assets/img/nature.png)`,backgroundRepeat:"no-repeat", backgroundPositionX: "center", backgroundPositionY: "center", backgroundSize: "250px", backgroundAttachment: "fixed", paddingBottom: "30px", minHeight: "650px"}}>
          
            
            <Row className="d-flex align-items-center">
              <Col md={5} style={{marginTop: "80px"}}>
                <div className="presale-box my-5 ">
                  <div className="mg-left-auto">
                    <div className="wisdom2">
                      <h3>
                        Powered by <span className="tommorow">1.3 Million</span>{" "}
                        wise-ards.
                      </h3>
                    </div>
                    <div className="wisdom2">
                      <h3>
                        <span className="tommorow">SWIM</span>-Spread Wisdom
                      </h3>
                      <h6>
                        Unlock the power of wisdom for a healthier Earth and
                        humanity with 'WISE ME,' the revolutionary NFT
                        Play-To-Earn game for toddlers and parents that combines
                        Gaming-Earning-Learning. #spreadwisdom.
                      </h6>
                      <div className="hero-button">
                        <Button className="btn btn-primary">
                          <a
                            target="_blank"
                            href="assets/whitepaper/SWIM_Whitepaper.pdf"
                          >
                            WHITEPAPER
                          </a>
                        </Button>
                        <Button className="btn btn-primary ms-3">
                          <a
                            target="_blank"
                            href="assets/audit/swim-audit-report.pdf"
                          >
                            SWIM AUDIT
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={2}></Col>
              <Col md={5}>
                <div className="presale-box my-5 ">
                  <div className="mg-right-auto">
                    <div className="wisdom2">
                      <h3>
                        Buy Now Before The{" "}
                        <span className="tommorow">2x Price</span> Rise
                      </h3>
                      <p>
                        <img
                          alt="ETH"
                          style={{ maxHeight: "25px" }}
                          src="images/icons/usdt.png"
                        />{" "}
                        1 USDT = 37 SWIM
                      </p>
                      <div className="timer">
                        <CountdownTimer targetDate={dateTimeAfterThreeDays} />
                      </div>
                      <div className={`loader-bar ${classes.loaderBar}`}>
                      <div className={`value ${classes.value}`}>
                          <h5>Amount Raised $
                          <NumericFormat className="NumericFormat"  value={parseFloat(soldToken.sold).toFixed(2)} allowLeadingZeros thousandSeparator="," />
                             </h5>
                        </div>
                      </div>

                      {isConnected || isLoggedIn ? (
                        <>
                        <div className="wallet mt-3">     
                          <Button
                            className="w-100 btn btn-primary"
                            onClick={() => setModalShow(true) }
                          >
                            Buy
                          </Button>
                          <ExchangeModal
                            getWeb3={web3Auth}
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                          />
                        </div>
                      <Button onClick={disconnectClicked}>Disconnect</Button>
                      </>
                      ) : (
                        <div className="mt-3">
                            <Button onClick={connectClicked}>Connect</Button>
                        </div>
                      )}
                      {
                        <DialogBox dialogBoxOpen={dialogBoxOpen} cancelButton={cancelButton}/>
                      }
                      <p className="text-center">
                        Listing begins SOON on more then 4+ Exchanges.
                      </p>
                      <p className="text-center">
                        Watch this space for claiming.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
      </section>

      <Footer />
    </>
  );
};
export default Home;



