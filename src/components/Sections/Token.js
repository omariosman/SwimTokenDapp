import React from "react";
import tokenData from "../jsonData/tokenData.json";

const Token = () => {
  return (
    <div className="section token-div">
      <div className="row">
        <div style={{ padding: "2em", textAlign: "center" }}>
          <h1 className="h1 colorfull-text">{tokenData.heading}</h1>
          <p style={{ color: "black" }}>{tokenData.content}</p>
        </div>
        <p>&nbsp;</p>
        {tokenData.contentData.map((tokenDatas) => {
          return (
            <div
              className="col-lg-4 darktext"
              key={tokenDatas.id}
              style={{ padding: "2em", textAlign: "justify" }}
            >
              <i className={tokenDatas.iconclass} style={{color: tokenDatas.iconcolor, marginLeft: "30%" }}></i>
              <h2 className="h1 colorfull-text">{tokenDatas.heading}</h2>
              <p>{tokenDatas.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Token;
