import React from "react";
const RoadMap = () => {
  return (
    <div className="section roadmap-div">
      <h1>The Main Advantage of the RoadMap</h1>
      <div className="row">
        <div className="col-lg-2">
          <i className="fa fa fa-location fa-3x" style={{"color":"#00eb28"}}></i>Achive Target
        </div>
      </div>
      <div className="row" style={{"textAlign":"right"}}>
        <div className="col-lg-5">
          <div className="card-box-dark" style={{"textAlign":"left"}}><i className="fa fa fa-location-arrow fa-2x"></i><br/>MileStone 2</div>
        </div>
      </div>
      <div className="row" style={{"textAlign":"left"}}>
        <div className="col-lg-5">
          <div className="card-box-dark" style={{"textAlign":"right"}}><i className="fa fa fa-location-arrow fa-2x"></i><br/>MileStone 2</div>
        </div>
      </div>
      <div className="row" style={{"textAlign":"right"}}>
        <div className="col-lg-5">
          <div className="card-box-dark" style={{"textAlign":"left"}}><i className="fa fa fa-location-arrow fa-2x"></i><br/>MileStone 3</div>
        </div>
      </div>
      <div className="row" style={{"textAlign":"left"}}>
        <div className="col-lg-5">
          <div className="card-box-dark" style={{"textAlign":"right"}}><i className="fa fa fa-location-arrow fa-2x"></i><br/>MileStone 4</div>
        </div>
      </div>
      <p>&nbsp;</p>
      <div className="row">
        <div className="col-lg-2">
          <i className="fa fa-bullseye fa-3x" style={{"color":"#fbff00"}}></i>Start Journy
        </div>
      </div>
    </div>
  );
};
export default RoadMap;
