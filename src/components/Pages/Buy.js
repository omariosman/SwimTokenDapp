import React,{useState,useEffect} from "react";
import Header from "../Header";
import Footer from "../Footer";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Buy = () => {
    const [age, setAge] = useState('10');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [select,setSelect] = useState('20');
     const handleChange2 = (event) =>{
        setSelect(event.target.value)
     }
    return (
        < div className="outer-body">
            <Header />
            <div className="section">
                <div className="row" style={{ display: "flex", justifyContent: "center" }}>
                    <div className=" col-md-3"></div>
                    <div className=" col-md-6" style={{ width: "40%" }}>
                        <div className='buyform'>
                            <span className="text-left text-white" style={{ display: 'flex', flex: '1 1 auto', justifyContent: "center" }}>
                                <strong style={{ fontSize: "22px" }}>Swap</strong></span>
                            <div className="sc-kcDeIU cvqsCp">
                                Connected Wallet: <div style={{ wordBreak: "break-all" }}>0x234567</div>
                                <div className="sc-iomxrj btdLQC" style={{ marginBottom: '20px', color: '#fff', fontSize: '24px', display: 'flex' }}>
                                </div>
                                <div id="swap-page" className="sc-gJWqzi lmKVHo">
                                    <div className="sc-ifAKCX dcxnAx" style={{ height: "90px" }}>
                                        <div id="swap-currency-input" className="sc-ugnQR drzjNC " >
                                            <div className="sc-eIHaNI hNuCqz">
                                                <div className="sc-iQtOjA fLKthc">
                                                    <input className="sc-iybRtq iQKTjs token-amount-input" autoComplete="off" id='bnbAmountError' autoCorrect="off" name="bnb_amount" type="text"
                                                        placeholder="0.00" />
                                                    &nbsp;&nbsp;&nbsp;
                                                 <Box sx={{ minWidth: 120 }} className="select-currency">
                                                 <FormControl fullWidth>
                                                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={age}
                                                            // label="Age"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={10}><div className="select-item"><img src="assets/img/ether.png"/>ETH</div></MenuItem>
                                                            <MenuItem value={20}><div className="select-item"><img src="assets/img/dai.png"/>DAI</div></MenuItem>
                                                            <MenuItem value={30}><div className="select-item"><img src="assets/img/usdc.png"/>USDC</div></MenuItem>
                                                            <MenuItem value={40}><div className="select-item"><img src="assets/img/usdt.png"/>USDT</div></MenuItem>
                                                            <MenuItem value={50}><div className="select-item"><img src="assets/img/wbtc.png"/>WBTC</div></MenuItem>
                                                            <MenuItem value={60}><div className="select-item"><img src="assets/img/wether.png"/>WETH</div></MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                 </Box>
                                                </div>
                                                <div className="balance">
                                                    <p></p>
                                                    </div>
                                                <span style={{ marginLeft: '30px' }} className="validationErr"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mb-4" style={{ position: "relative" }}>
                                        <span className="bxUreM pulse" style={{ display: 'flex', position: "absolute", borderRadius: "50%", top: "-30px" }}>
                                            <a href> <span className="fa fa-exchange" style={{ transform: 'rotate(90deg)' }} /></a>
                                        </span>
                                    </div>

                                    <div className="sc-ifAKCX dcxnAx" style={{ height: "120px" }}>
                                        <div id="swap-currency-input" className="sc-ugnQR second-box" style={{ height: "100%" }}>
                                            <div className="sc-eIHaNI hNuCqz">
                                                <div className="sc-iQtOjA fLKthc">
                                                    <input className="sc-iybRtq iQKTjs token-amount-input" placeholder="0.00" name="mnt_amount" type="text" id='tokenAmountError' />
                                                    <Box sx={{ minWidth: 120 }} className="select-currency">
                                                 <FormControl fullWidth>
                                                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={select}
                                                            // label="Age"
                                                            onChange={setSelect}
                                                        >
                                                            <MenuItem value={10}><div className="select-item"><img src="assets/img/ether.png"/>ETH</div></MenuItem>
                                                            <MenuItem value={20}><div className="select-item"><img src="assets/img/dai.png"/>DAI</div></MenuItem>
                                                            <MenuItem value={30}><div className="select-item"><img src="assets/img/usdc.png"/>USDC</div></MenuItem>
                                                            <MenuItem value={40}><div className="select-item"><img src="assets/img/usdt.png"/>USDT</div></MenuItem>
                                                            <MenuItem value={50}><div className="select-item"><img src="assets/img/wbtc.png"/>WBTC</div></MenuItem>
                                                            <MenuItem value={60}><div className="select-item"><img src="assets/img/wether.png"/>WETH</div></MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                 </Box>
                                                 
                                                </div>
                                                
                                                <div className="balance">
                                                    <p> 1 Token = $</p>
                                                    <p className="select-token">Select token</p>

                                                </div>
                                                <span style={{ marginLeft: '30px' }} className="validationErr"></span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="sc-CtfFt bxUreM btn-primary-c" id="token-buy-button" style={{ margin: "0px 30px" }} >Connect Wallet</div>
                            {/* {!connectWalletAddress || connectWalletAddress == '' ?
                                        <div className="sc-CtfFt bxUreM" id="token-buy-button" onClick={connectMetasmask} style={{ margin: "0px 30px" }} >Connect Wallet</div>
                                        :
                                        <div className="sc-CtfFt bxUreM" id="token-buy-button" onClick={buy_now} style={{ margin: "0px 30px" }} >Buy Now</div>
                                    } */}
                        </div>
                    </div>
                    <div className=" col-md-3"></div>
                </div>
            </div>

            {/* <Footer /> */}
        </div>
    )
}
export default Buy;