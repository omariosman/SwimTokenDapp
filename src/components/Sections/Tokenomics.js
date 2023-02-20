import React from "react";
import tokenEconomics from "../jsonData/tokenEconomics.json";
import TokenomicsTable from "../Table/Tokenomics/TokenomicsTable";
import TokenBreakDownTable from "../Table/TokenBreakDown/TokenBreakDownTable";
const Tokenomics = () => {
  return (
    <div className="section tokenomics-div">
      <div className="row">
        <h1 className="h1">Tokenomics Breakdown</h1>
        <h2 className="h2">TOKEN NAME: SWIM ($WSI) TOKEN TYPE: BEP </h2>
      </div>

      <p>&nbsp;</p>

      <div className="row" style={{height: "32em"}}>
        <TokenBreakDownTable className="col-lg-4"/>
        {tokenEconomics.map((tokenEco) => {
          return (
            <div className="col-lg-4" key={tokenEco.id}>
              <h2 className="h2 colorfull-text">{tokenEco.heading}</h2>
              <div dangerouslySetInnerHTML={{ __html: tokenEco.content }} />
            </div>
          );
        })}
      </div>

      <p>&nbsp;</p>

      <div className="row ">
        <div className="table1 tokendashboard" style={{"padding": "2em"}}>
          <TokenomicsTable />
        </div>
      </div>
    </div>
  );
};
export default Tokenomics;
