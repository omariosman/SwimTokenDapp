import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Favicon from 'react-favicon';

import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button } from "react-bootstrap";

const HomeOld = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <Favicon url="favicon.ico"/>
            <section className="d-block d-md-none">
                <div className="globs-section globs-mobile">
                    <video autoPlay muted loop src="assets/img/file.mp4"></video>
                    {/* <div className="glob-text">
                        <div className="swin wisdom2">
                            <h3>
                                <span className="tommorow">SWIM</span>
                            </h3>
                            <h3>SPREAD WISDOM</h3>
                        </div>
                    </div>
                    <h2 className="tagline fade-in-down">
                        The <span className="tommorow">Future</span> of Wise Decentralisationk{" "}
                    </h2> */}
                    <Row className="d-flex align-items-center">
                        <Col md={5}>
                            <div className="presale-box my-5">
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
                                        <Button className="btn btn-primary" onClick={() => {
                                                navigate("/swim/presale");
                                                }}>
                                            BUY NOW
                                        </Button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </Col>                        
                    </Row>
                </div>
            </section>
            <section className="hero-section" style={{backgroundColor: '#af26aa;'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div className="gaming-btn-box">
                                <div className="pre"></div>
                                <div className="after"></div>
                                <div className="gaming-btn">
                                    <span>Gaming - Learning - Earning </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                    <div className="row d-flex align-items-center">
                        <div className="col-md-5"></div>
                        <div className="col-md-7">
                            <div className="hero-text mt-4">
                                <span className="span-heading">"The Future of Wise and Conscious Utilities."</span>
                                <h1>
                                    A Wise Today is a Sustainable <span className="tommorow">Tomorrow</span>{" "}
                                </h1>
                                <p>
                                    Spread wisdom to "Join the first-ever community of wise utilities on a decentralised network to promote wisdom for the benefit of future
                                    generations and a healthier Earth."
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="list-wrapper mt-5">
                        <div class="rowDiv">
                            <div class="columnsDiv">
                                <div className="hero-list">
                                    <p>The 1.3 million+ community of SS is dedicated to spreading wisdom.</p>
                                </div>
                            </div>

                            <div class="columnsDiv">
                                <div className="hero-list">
                                    <p>The first-ever game NFT wise investment game for the toddlers.</p>
                                </div>
                            </div>

                            <div class="columnsDiv">
                                <div className="hero-list">
                                    <p>In alignment with the United Nations Sustainable development Goals.</p>
                                </div>
                            </div>

                            <div class="columnsDiv">
                                <div className="hero-list">
                                    <p>Constructing a wise protocol to cultivate a wise-conscious ecosystem.</p>
                                </div>
                            </div>

                            <div class="columnsDiv">
                                <div className="hero-list">
                                    <p>Establish Wise Community Metaverse to improve earth-health &amp; well-being.</p>
                                </div>
                            </div>

                            {/* <div className="box">
                                <div className="hero-list">
                                    <p>The 1.3 million+ community of SS  is dedicated to spreading wisdom.</p>
                                </div>
                            </div>
                            <div className="box">
                                <div className="hero-list">
                                    <p>The first-ever NFT wise investment game for toddlers.</p>
                                </div>
                            </div>
                            <div className="box">
                                <div className="hero-list">
                                    <p>In alignment with the United Nations Sustainable development Goals.</p>
                                </div>
                            </div>
                            <div className="box">
                                <div className="hero-list">
                                    <p>Constructing a wise protocol to cultivate a wise-conscious ecosystem..</p>
                                </div>
                            </div>
                            <div className="box">
                                <div className="hero-list">
                                    <p>Establishing the first-ever Wise Community Metaverse to improve earth-health and well-being. </p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
            <section className="d-none d-md-block">
                <div className="globs-section">
                    <video autoPlay muted loop src="assets/img/file.mp4"></video>
                    <div className="glob-text" style={{marginTop: '6rem'}}>
                        <div className="wisdom2 my-5" style={{width: '50%'}}>
                            <div className="mg-right-auto">
                                <div className="wisdom2">
                                    <h3>
                                        Powered by <span className="tommorow">1.3 Million</span>{" "} wise-ards.
                                    </h3>
                                </div>
                                <div className="wisdom2" >
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
                                    <Button className="btn btn-primary ms-3" onClick={() => {
                                                navigate("/swim/presale");
                                            }}>
                                        BUY NOW
                                    </Button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="wisdom">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-6">
                            <div className="wisdom-text">
                                <h2>
                                    The World’s 1st <span className="tommorow">Wisdom</span>
                                    <br /> Platform That Offers Rewards
                                </h2>
                            </div>
                        </div>
                        <div className="col-md-6">
                            {/* <div className="calender">
                                <h3>Stay Tuned And Grab The Swim Once In A Lifetime <span className="tommorow">WISE-RAISE</span></h3>
                                <div className="row">
                                    <div className="col-3">
                                        <div className="cal">
                                            <span>15</span>
                                        </div>
                                        <p>Days</p>
                                    </div>
                                    <div className="col-3">
                                        <div className="cal">
                                            <span>15</span>
                                        </div>
                                        <p>Hours</p>
                                    </div>
                                    <div className="col-3">
                                        <div className="cal">
                                            <span>07</span>
                                        </div>
                                        <p>Minutes</p>
                                    </div>
                                    <div className="col-3">
                                        <div className="cal">
                                            <span>55</span>
                                        </div>
                                        <p>Second</p>
                                    </div>
                                </div>
                            </div> */}
                            <p className="wisdom-content" style={{ fontSize: "18px", textAlign: "" }}>
                                Spread wisdom to "Join the first-ever community of wise utilities on a decentralised network to promote wisdom for the benefit of future generations
                                and a healthier Earth."
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="heading-mobile d-block d-md-none">
                <h2 className="">
                    ABOUT <span className="tommorow">US</span>
                </h2>
            </div>
            <section className="about-bg">
                <div className="container">
                    <div className="row d-none d-md-block">
                        <h2 className="headings">
                            ABOUT <span className="tommorow">US</span>
                        </h2>
                    </div>
                    <div className="about-content">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="about-text">
                                    <h3>
                                        <span className="tommorow">Objective</span>
                                    </h3>
                                    <p>To cultivate a wise ecosystem that promotes the sharing of knowledge about human well-being and the improvement of the earth's health.</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="about-text">
                                    <h3>
                                        <span className="tommorow">Aim</span>
                                    </h3>
                                    <p>
                                        To empower and engage users by incentivising them with rewards and incentives created by a world-class team of researchers and quantitative
                                        experts in the blockchain and gaming industry.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="about-text">
                                    <h3>
                                        <span className="tommorow">Goal</span>
                                    </h3>
                                    <p>
                                        To create a future generation of wiser, environmentally conscious entrepreneurs through the 'WISEME' SWIM Toddlers gaming app alongside
                                        other futuristic innovations",{" "}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="about-text">
                                    <h3>
                                        <span className="tommorow">Proof Of Wisdom</span>
                                    </h3>
                                    <p>
                                        Utlising our innovative wise consensus algorithm based on the unique "Proof of Wisdom" to prevent the failure of DAOs and bringing together
                                        the existing community of over 1.3 million "Wise-ards".
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="heading-mobile d-block d-md-none">
                <h2 className="">
                    <span>WISE <span className="tommorow">SWIM</span> UTILITIES</span>
                </h2>
            </div>
            <section style={{background: '#00000082'}}>
                <div className="" id="ecoSystem">
                    <div></div>
                    {/* <video preload="auto" muted="" loop="" tabindex="-1" autoplay="" src="assets/img/file.mp4" style={{ height: "700px" }}></video> */}
                    <div className="glob-text">
                        <br />
                        <div className="wise-btn d-none d-md-flex">
                            <span>WISE SWIM UTILITIES</span>
                        </div>
                        <div className="metaverse-section pt-lg-5">
                            <div className="meta-column">
                                <div className="meta-world col-md-4">
                                    <img alt="Metaverse" src="assets/img/metaverse.png" />
                                    <div className="metacontent">
                                        <h3>
                                            META INSIDE <span class="tommorow">META</span> INCEPTION (MIAMI)
                                        </h3>
                                        <ul>
                                            <br />
                                            <li>
                                                "Our first-of-its-kind concept, MIAMI (Metaverse Inside a Metaverse Inception), is a community driven universe of metaverses that
                                                incorporates and incepts a range of wise applications and additional metaverses
                                            </li>
                                            <li>
                                                This interactive, brilliantly augmented ground-reality experience allows users to create their own avatars, shop, meditate, plant,
                                                and play games, among other wise applications."
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="meta-world col-md-4">
                                    <img alt="Nature" src="assets/img/nature.png" />
                                    <div className="metacontent">
                                        <h3>
                                            WISE ME <span class="tommorow">Toddlers</span> Parents NFT Game
                                        </h3>
                                        <ul>
                                            <br />
                                            <li>
                                                The first-ever wisdom NFT play-to-earn gaming revolution for toddlers and their parents. To empower the future of toddlers by
                                                converting daily screen time for both parents and toddlers into ZooNFT rewards.
                                            </li>
                                            <li>
                                                Incubating via gaming app ideas that help toddlers flow towards attaining well-being and wisdom about nature, with daily wisdom task
                                                rewards in the form of ZooNFT on a decentralised platform.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="first_ever ">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-6">
                            <div className="first-ever-text">
                                <h2>
                                    First Ever Toddler's/Parent&nbsp;
                                    <span className="tommorow">"WISEME"</span> Play-To-Earn NFT Rewards Game.
                                </h2>
                                <span style={{ fontSize: "1.1rem" }}>
                                    "Shaping the Future: Fostering a Generation of Wiser, Green Entrepreneurs for a Healthier Planet and a Better Society.
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6 text-center">
                            <img alt="Family" style={{ marginTop: "2.9rem" }} src="images/familydog0002_thumbnail.png" />
                        </div>
                    </div>
                </div>
            </section>
            <div className="heading-mobile d-block d-md-none">
                <h2 className="">
                    <span className="tommorow">User </span>Engagement{" "}
                </h2>
            </div>
            <section className="about-bg user">
                <div className="container">
                    <div className="row d-none d-md-block">
                        <h2 className="headings">
                            <span className="tommorow">User </span>Engagement{" "}
                        </h2>
                    </div>
                    <div className="about-content">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="about-text" style={{ minHeight: "220px" }}>
                                    <h3>META INSIDE META INCEPTION </h3>
                                    <ul>
                                        <li>Building and linking the meta world to the real world.</li>
                                        <li>The first ever inter-communicable metaverse for wisdom.</li>
                                        <li>
                                            Special rewards of NFT (sunft) when the user uses the metaverse in a natural or outdoor setting as opposed to a closed indoor space.
                                        </li>
                                        <li>Developing a special solar-powered rechargeable augmented reality headset.</li>
                                        <li>Introducing a self-sustaining AI metaverse with a universal vibrational dimension technology unlike anything previously seen.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="about-text" style={{ minHeight: "200px" }}>
                                    <h3>'WISEME' PLAY-TO-EARN</h3>
                                    <ul>
                                        <li>Innovating the toddler gaming industry.</li>
                                        <li>Turning screen time for children into wise Zoonft.</li>
                                        <li>Introducing the first-ever kids NFT to digital gold conversion on the safest blockchain network protocols for wise investments.</li>
                                        <li>Providing extra rewards for parents who spend time with their children in nature, nurturing the environment.</li>
                                        <li>
                                            Offering special family rewards for using recyclable, environmentally friendly products for kids and inspiring children to do the same.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="nft-glob bg-black" id="wiseConsensus">
                <video loop autoPlay muted src="assets/img/nft-glob.mp4"></video>
                <div className="overlay"></div>
                <div className="" style={{ position: "absolute", top: "0", width: "100%" }}>
                    <div className="container-fluid">
                        <div className="row mb-0 align-items-center justify-content-center" style={{ height: "500px" }}>
                            <div className="col-md-6">
                                <div className="nftglob-text">
                                    <h2>
                                        First-Ever <span className="tommorow ">Wise</span> Consensus Algorithm Based On The Unique 'Proof Of Wisdom'.
                                    </h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="right-text-glob">
                                    <p>
                                        A wise consensus algorithm based on proof of wisdom is definitely more effective and secure than traditional consensus algorithms, as it
                                        would involve the use of knowledge and expertise as a key factor in determining the validity of transactions or actions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="heading-mobile d-block d-md-none">
                <h2 className="">
                    Our Unique <span className="tommorow">Wisdom</span> Model
                </h2>
            </div>
            <section className="bg-black pt-5">
                <div className="container" id="aboutWisdom">
                    <div className="row mb-0 d-none d-md-block">
                        <h2 className="headings" style={{ marginTop: "20px" }}>
                            Our Unique <span className="tommorow">Wisdom</span> Model
                        </h2>
                    </div>
                    <div className="row mb-0">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <div className="unique-wisdom">
                                <div className="row d-flex align-items-center">
                                    <div className="col-md-6">
                                        <div className="unique-model">
                                            <h2>“प्रज्ञाप्रायः “अनभुवः, ज्ञानं, सामान्यज्ञानंचभवितं गुणः।”</h2>
                                            <p>
                                                Wisdom (Pragnya - प्रज्ञा) is often defined as “the quality of having experience, knowledge, and common sense. More generally today,
                                                wisdom can be defined as the use of stored knowledge to create an understanding of humanity, human society, and its environment to
                                                guide one's actions and improve one's life She is more than just cumulative knowledge.
                                            </p>
                                            <h2>“प्रज्ञाप्रायः “अनभुवः, ज्ञानं, सामान्यज्ञानंचभवितं गुणः।”</h2>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="modal-img">
                                            <img src="assets/img/canva.webp" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flow-charts">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="test">
                                            <img src="assets/img/flow1.webp" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="test">
                                            <img src="assets/img/flow2.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="test">
                                            <img src="assets/img/flow3.png" alt="" />
                                        </div>
                                        <div className="btn-wisdom">
                                            <span>Proof Of Wisdom</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="test">
                                            <img src="assets/img/flow4.png" alt="" />
                                        </div>
                                        <div className="btn-wisdom">
                                            <span>Wise Consensus</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </section>
            <section className="we_dont_imp user bg-black ">
                <div className="container">
                    <div class="row p-3 mb-0 justify-content-center">
                        <div class="col-lg-8 text-center">
                            <h1 class="">
                                WE DON'T <span class="tommorow">IMPRESS </span>WE IMPACT
                            </h1>
                            <h5 class="">Our Commitment 100% 'Proof Of Reserves'</h5>
                        </div>
                    </div>
                </div>
            </section>
            <div className="heading-mobile d-block d-md-none">
                <h2 className="">
                    <span className="tommorow">Team</span> Of 'Wise-ards'
                </h2>
            </div>
            <section className="bg-black pt-5">
                <div className="container">
                    <div className="row mb-0">
                        <h2 className="headings pb-0 d-none d-md-block">
                            <span className="tommorow">Team</span> Of 'Wise-ards'
                        </h2>
                        <p className="head-p">Dedication. Expertise. Passion.</p>
                    </div>
                    <div className="row mb-0">
                        <div className="col-md-6 mb-3 p-2">
                            <div className="team-member">
                                <div className="team-box">
                                    <div className="team-img">
                                        <img src="assets/img/dhanraj.jpg" />
                                    </div>
                                    <div className="team-text">
                                        <a href="#">Dhanraj Dadhich</a>
                                        <span>Co-Founder, SWIM.</span>
                                        <p>
                                            Ex-CTO 5ire ($1.5B Valuation),a sustainable unicorn blockchain | Investor | Speaker | Researcher | CMMI Auditor |Algorithms master with
                                            immense knowledge of ancient sciences|| Managing US $8B revenue model.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 p-2">
                            <div className="team-member">
                                <div className="team-box">
                                    <div className="team-img">
                                        <img src="assets/img/arvind.jpg" />
                                    </div>
                                    <div className="team-text">
                                        <a href="#">Arvind Bhanushali</a>
                                        <span>Co-Founder Sadhguru Sadupdesh, SWIM</span>
                                        <p>
                                            Investor | Entrepreneur | Director Hifi Digital Media India’s biggest digital media promotion network and created the largest television
                                            promotions network till date.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 p-2">
                            <div className="team-member">
                                <div className="team-box">
                                    <div className="team-img">
                                        <img src="assets/img/ahbab.jpg" />
                                    </div>
                                    <div className="team-text">
                                        <a href="#">Dr. Ahbab</a>
                                        <span>Director of Research & Business Development, SWIM.</span>
                                        <p>
                                            Experienced in the field of digital economy Acted as a lead consultant in major research | He revised the performance management
                                            research and architecture of financial institutions, education sector, health and professional services.He has published numerous
                                            research papers in highly indexed journals, and presented several research papers and posters at so many international conferences.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 p-2">
                            <div className="team-member">
                                <div className="team-box">
                                    <div className="team-img">
                                        <img src="assets/img/dr-ferdaus.webp" />
                                    </div>
                                    <div className="team-text">
                                        <a href="#">Dr A.S.A Ferdous</a>
                                        <span>Director of Education and Insights,SWIM.</span>
                                        <p>
                                            Ph.D. from the National University of Malaysia (UKM).Senior Lecturer/Assistant Professor, Dept. of International Business (AACSB,
                                            AMBA)Universiti Utara Malaysia | Universiti Kebangsaan Malaysia,awarded the Excellent Service Award for 2021 and the highest KPI for
                                            2019, 2020, and 2021. Written 44 research papers,{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 p-2">
                            <div className="team-member">
                                <div className="team-box">
                                    <div className="team-img">
                                        <img src="assets/img/sachin.webp" />
                                    </div>
                                    <div className="team-text">
                                        <a href="#">Sachin Gupta</a>
                                        <span>
                                            Co-Founder <br />
                                            Sadhguru Sadupdesh, SWIM.
                                        </span>
                                        <p>
                                            One of India's top music producers and a technomical code researcher. His music has raised India's top most royalties for various labels
                                            and artists over time. A full-time meditator with a passion for creating a healthier planet.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 p-2">
                            <div className="team-member">
                                <div className="team-box">
                                    <div className="team-img">
                                        <img src="assets/img/khanka.webp" />
                                    </div>
                                    <div className="team-text">
                                        <a href="#">Mmanish Khanka</a>
                                        <span>
                                            CMO <br />
                                            Sadhguru Sadupdesh, SWIM.
                                        </span>
                                        <p>
                                            A decade of advertising experience in out-of-home, print, and digital media, as well as 10 years of media experience in music videos,
                                            promotion, and brand collaboration.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 p-2">
                            <div className="team-member">
                                <div className="team-box">
                                    <div className="team-img">
                                        <img src="assets/img/deep.jpg" />
                                    </div>
                                    <div className="team-text">
                                        <a href="#">Deep Bhanushali</a>
                                        <span>Digital Marketing Team, SWIM.</span>
                                        <p>
                                            Social Media Marketing | Sadhguru Sadupdesh Youtube Channel Manager | Graphic Designer For Various projects| Managed more than 100 pages
                                            on different social media and Fed Many projects with new age expertise on Various Platforms |
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 p-2">
                            <div className="team-member">
                                <div className="team-box">
                                    <div className="team-img">
                                        <img src="assets/img/wendel.webp" />
                                    </div>
                                    <div className="team-text">
                                        <a href="#">Dr Wendel</a>
                                        <span>Advisory</span>
                                        <p>
                                            Prof. Dr Wendell is a famous researcher and academician in Brazil and expert on environmental management with 20+ Yrs of experience in
                                            teaching, research and innovation. He has more than 100 research papers that published in high indexed journals with vast citations.
                                            Since January 2018, he is advisor in Ph.D. program in Bio-energy from University Sao Paulo (USP), UNICAMP and UNESP.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 p-2">
                            <div className="team-member">
                                <div className="team-box">
                                    <div className="team-img">
                                        <img src="assets/img/jacob.jpg" />
                                    </div>
                                    <div className="team-text">
                                        <a href="#">Jacob Kauble</a>
                                        <span>Advisory</span>
                                        <p>
                                            Ex-VP of Media at Vayner Media, a full-service consumer-centric digital agency where he led omnichannel marketing strategies for the Los
                                            Angeles agency’s clients; Johnson and Johnson, TikTok, Lyft, & Mint Mobil
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 p-2">
                            <div className="team-member">
                                <div className="team-box">
                                    <div className="team-img">
                                        <img src="assets/img/rachel.webp" />
                                    </div>
                                    <div className="team-text">
                                        <a href="#">Rachel Rekkab</a>
                                        <span>Advisory</span>
                                        <p>
                                            Head of Web3 Partnerships | Art & Culture (NFT) I Founder of the Art + FinTech Talk Series. From Background heading up sponsorship sales
                                            for one of the largest business intelligence firm in London, Marcus Evans group
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 p-2">
                            <div className="team-member">
                                <div className="team-box">
                                    <div className="team-img">
                                        <img src="assets/img/gautam.jpg" />
                                    </div>
                                    <div className="team-text">
                                        <a href="#">Gautam Madahvan</a>
                                        <span>Advisory</span>
                                        <p>
                                            Founder and CEO of Mad Influence, India fastest and biggest influencer marketing platform. Founder of Go Dutch India, Go Dutch is a
                                            reward based crowdfunding platform |CMO in Satoshi United, Satoshi United is the world's largest Block Chain Un-conference which is
                                            organized twice every year around the world | BW Disrupt 30 under 30
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 p-2">
                            <div className="team-member">
                                <div className="team-box">
                                    <div className="team-img">
                                        <img src="assets/img/kareem.jpg" />
                                    </div>
                                    <div className="team-text">
                                        <a href="#">Kareem Kassab</a>
                                        <span>Advisory</span>
                                        <p>
                                            Kareem is a blockchain developer with experience in Ethereum development currently working in security management. Presently innovating
                                            a cross-chain wallet with multiple chains and bridges.Founder and mentor of a blockchains community in Egypt. Actively involved in
                                            blockchain portfolio management with participation in over 50 blockchain projects.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 p-2">
                            <div className="team-member">
                                <div className="team-box">
                                    <div className="team-img">
                                        <img src="assets/img/sourabh.jpg" />
                                    </div>
                                    <div className="team-text">
                                        <a href="#">Saurabh Thakur</a>
                                        <span>Advisory</span>
                                        <p>
                                            Founder, Director of Wise Owl Brands & Merchandise | Ex GM at SAMSUNG INDIA | Ex Deputy General Manager(DGM) SAMSUNG, Modern Retail | Ex
                                            Zonal Business Head UNINOR (Telenor Group- Norway) | Ex Sr. Manager IDEA Cellular
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 p-2">
                            <div className="team-member">
                                <div className="team-box">
                                    <div className="team-img">
                                        <img src="assets/img/ajay.webp" />
                                    </div>
                                    <div className="team-text">
                                        <a href="#">Ajay Keswani</a>
                                        <span>Advisory</span>
                                        <p>
                                            Founder, Rocketship Capital | 10+years experience in technical analysis in financial markets. Predicted with precision rise and fall of
                                            crypto's specifically bitcoin and ethereum. Known for his excellence and creativity in technical analysis and creating algorithms.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="about-bg user">
                <div className="container">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-4">
                            <div className="whitepapper">
                                <img src="images/logo-big.jpg"/>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-6"></div>
                    </div>
                </div>
            </section> */}
            <section className="bg-black listing_soon_on">
                <div className="container">
                    <div className="row mb-0 d-md-block">
                        <h2 className="headings">
                            {" "}
                            <span className="tommorow">LISTING</span> SOON ON
                        </h2>
                    </div>
                    <div className="row mb-0">
                        <div className="col-md-3">
                            <div className="listing_soon">
                                <img src="images/listening-logo/probit.png" width="100%" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="listing_soon pb-2">
                                <img src="images/listening-logo/coinstore.png" width="100%" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="listing_soon">
                                <img src="images/listening-logo/latoken.png" width="100%" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="listing_soon">
                                <img src="images/listening-logo/p2b.png" width="100%" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="heading-mobile d-block d-md-none">
                <h2 className="">
                    Powered <span className="tommorow">By</span>
                </h2>
            </div>
            <section className="bg-black">
                <div className="container">
                    <div className="row mb-0 d-none d-md-block">
                        <h2 className="headings">
                            Powered <span className="tommorow">By</span>
                        </h2>
                    </div>
                    <div className="row mb-0">
                        <div className="col-md-6">
                            <div className="powerd-by pb-2">
                                <img src="assets/img/sadguru.png" />
                            </div>
                            <p style={{ textAlign: "center" }}>Sadhguru Sadupdesh</p>
                        </div>
                        <div className="col-md-6">
                            <div className="powerd-by">
                                <img src="assets/img/ram.png" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="powerd-by">
                                <img src="assets/img/nida.png" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="powerd-by">
                                <img src="assets/img/hayuning.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};
export default HomeOld;
