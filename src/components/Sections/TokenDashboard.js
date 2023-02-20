import React from "react";
const TokenDashboard = () => {
  return (
    <div className="section tokendashboard">
      <div class="col-lg-6" style={{ textAlign: "justify" }}>
        <div className="banner-big-text">
          <h1>
            Buy $WSI and be part of the biggest revolution in the history of Big
            Data{" "}
          </h1>
          <button className="style-button-1">How to buy?</button>
          <button className="style-button-1">PancakeSwap</button>
        </div>
        <p>&nbsp;</p>
      </div>
      <div class="col-lg-6">
        WE SEND IT PUBLIC SALE HAS STARTED:
        <br />
        <div className="">
          <div className="row">
            <div className="col-lg-5">
              <label type="text" style={{ fontSize: "2rem" }}>
                Public Sale{" "}
              </label>
              <label type="text ">Stage</label>
            </div>
            <div className="col-lg-5">
              <label type="text " style={{ fontSize: "2rem" }}>
                $0.229{" "}
              </label>
              <label type="text ">Price per $WSI</label>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-lg-5">
              <input type="text" value="0 BNB" style={{color:"black"}}></input>
            </div>
            <div className="col-lg-5">
              <input type="text" value="0 $WSI"></input>
            </div>
          </div>

          <div className="row smalltext">Balance: 0</div>
          <br />
          <div className="row">
            <div className="col-lg-5">
              Note: Trading will be done directly using the <br />
              PancakeSwap Router. <br />
            </div>
            <div className="col-lg-5">
              <input type="text" value=" 1% Slippage "></input>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3">&nbsp;</div>
            <button className="style-button-1">Connect now</button>
          </div>

          <div className="row smalltext">
            <a href="#" className="col-lg-6 nomargin-nopadding">
              Price Chart
            </a>{" "}
            <a href="#" className="col-lg-6 nomargin-nopadding">
              CoinMarketCap
            </a>
            <a href="#" className="col-lg-6 nomargin-nopadding">
              Token Contract
            </a>{" "}
            <a href="#" className="col-lg-6 nomargin-nopadding">
              Security Audit 10/10
            </a>
          </div>
        </div>
        <p>&nbsp;</p>
      </div>
    </div>
  );
};
export default TokenDashboard;
