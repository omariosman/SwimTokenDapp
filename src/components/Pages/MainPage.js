import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import Token from "../Sections/Token";
import TokenDashboard from "../Sections/TokenDashboard";
import Tokenomics from "../Sections/Tokenomics";
import FAQ from "../FAQ/FAQ";
import {questions} from "../FAQ/FaqData";
import RoadMap from "../Sections/RoadMap";
const MainPage=()=>{
    return(
        <div className="outer-body">
         <Header/>
         <TokenDashboard/>
         <Token/>
         <Tokenomics/>
         <RoadMap/>
         <FAQ data={questions}/>
         <Footer/>
        </div>
    )
}
export default MainPage;