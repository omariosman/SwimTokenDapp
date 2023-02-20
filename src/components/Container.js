import React from "react";
import FAQ from "./FAQ";
import {questions} from "./FaqData";
import tokenData from "./jsonData/tokenData.json";
import tokenEconomics from "./jsonData/tokenEconomics.json";
const Container=()=>{    
    return(
      <div className="section">

        <div>
       
            <div >
              <h1 className="h1">Buy $WSI and be part 
              of the biggest revolution 
                       in the history of Big Data </h1>
              <button className="style-button-1">How to buy?</button>    <button className="style-button-1">PancakeSwap</button>
              <p>SWIM PUBLIC SALE HAS STARTED:
                 Public Sale Stage $0.212 Price per $WSI 0 BNB 0 $WSI 
                  Balance: 0 
                  Note: Trading will be done directly using the PancakeSwap Router. 
                  1% Slippage 
                 Connect now Price Chart Token Contract 
                  CoinMarketCap Security Audit 10/10 
              </p>
           </div>
       </div>
       
       <div className="row">
                  <div style={{textAlign:"center"}}>
                   <h1 className="h1">{tokenData.heading}</h1>
                    <p>{tokenData.content}</p>
                    </div>
              {tokenData.contentData.map(tokenDatas => {
                return(
                    < div className="col-md-4">
                    < h2 className="h2">{tokenDatas.heading}</h2>
                    <p>{tokenDatas.content}</p>
                 </div>
                )
                
           })
           }

           </div>
              
             
         <div>

                 <div>
                    <h1 className="h1">Tokenomics Breakdown</h1>
               < h2 className="h2">TOKEN NAME:	SWIM ($WSI) TOKEN TYPE:	BEP- </h2>
               <p>(Binance Smart Chain), INITIAL CIRCULATING SUPPLY:	37.5M 
                INITIAL MARKET CAP:	1.2M, 
                ESTIMATED PUBLIC LISTING:	12/2022 
                SEED SALE COMPLETED:	$0.011 
                PRIVATE SALE COMPLETED:	$0.017 
                TGE / IDO PRESALE COMPLETED:	$0.032 
                PUBLIC SALE 1. DECEMBER, 8PM (CET) Medium-term price expectation: ≈ $1-5	DEX PANCAKESWAP 
                TOTAL SUPPLY:	1.5 BILLION </p>
                 </div>
            </div>

          
             <div className="row">
            {tokenEconomics.map(tokenEco => {
                return(
                  <div className="col-md-6">
                    < h2 className="h2">{tokenEco.heading}</h2>
                    <div dangerouslySetInnerHTML={{__html: tokenEco.content}}/>
                  </div>)
                })
                }
                </div>

   <div>

  <div>
     Allocation:	Vesting  Seed	vests daily over 22 months, beginning day 61, ≈ 5% per month 
      Private	vests daily over 17 months, beginning day 31, ≈ 6% per  
      TGE / IDO	20 % directly after listing, 80 % linearly over 12 months ≈ 6.6 % per month 
      Exchanges & Liquidity	100% unlocked 
      Team	vests daily over 50 months, beginning day 181, ≈ 2% per month 
      Advisors	vests daily over 60 months, beginning day 91, ≈ 2% per month 
      Referals	vests daily over 57 months, beginning day 91, ≈ 2% per month 
      Development	vests daily over 24 months, beginning day 21, ≈ 2% per month 
      Marketing	vests daily over 50 months, beginning day 31, ≈ 2% per month 
      Operatives	vests daily over 24 months, beginning day 1, ≈ 4% per month 
      Staking Rewards	Available right after listing 
      Activity Rewards	After launch of SWIM 2.0, will be assigned to users 
      Airdrops	Available right after listing and reserved for marketing 
      General Reserve	unlocked strategically for community rewards & marketing campaigns 
</div>
</div>

<div>
    <FAQ data={questions}/>
</div>
</div>
    )
}
export default Container;