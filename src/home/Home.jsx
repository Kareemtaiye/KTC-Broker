import React, { useEffect, useState } from "react";
import "./Home.css";
import "./HomeMedia.css";
import CardPlan from "./CardPlan";
import ImgHomeSec4 from "./images/HomeSection4Img.png";
// import citadelHomeLogo from "../assets/citadel1.png";
import mobilePhone from "../assets/phone.png";


// transfer payment method
import bitCoin from "../assets/bitcoin.gif";
import bitCoinCash from "../assets/bitcoincash.gif";
import litecoin from "../assets/litecoin.gif";
import tron from "../assets/tron.gif";
import pax from "../assets/pax.gif";
import tetherusdt from "../assets/tetherusdt.gif";
import tetherusdterc20token from "../assets/tetherusdterc20token.gif";
import dash from "../assets/dash.gif";
import doge from "../assets/doge.gif";
import payeer from "../assets/payeer.gif";
import ethereum from "../assets/ethereum.gif";
import tetherusdttrc20token from "../assets/tetherusdttrc20token.gif";
import { motion, stagger } from "framer-motion";
import citadel1 from "../assets/citadel1.png";
import Hero from "./Hero";

const Home = () => {
  // const [widgetLoaded, setWidgetLoaded] = useState(false);
  // useEffect(() => {
  //     const script = document.createElement('script');
  //     script.type = 'text/javascript';
  //     script.async = true;
  //     script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
  //     script.onload = () => {
  //         setWidgetLoaded(true);
  //     };
  //     document.body.appendChild(script);

  //     return () => {
  //         document.body.removeChild(script);
  //     };
  // }, []);
  // const images = [image1, image2, image3];
  const images = [
    { url: "../../public/investPhoto1.jpg" },
    { url: "../../public/investPhoto2.jpg" },
    { url: "../../public/investPhoto3.jpg" },
    { url: "../../public/investPhoto4.jpg" },
  ];

  const pageAnimationY = {
    initial: {
      opacity: 0,
      y: 300,
    },
    transition: { type: "spring", stiffness: 40, mass: 1.5 },
    // animate={{ opacity: 1, y: 0 }}
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: { margin: "-40px" },
  };

  const pageAnimationX = {};

  return (
    <>
      <div className="home-body">
        <div className="hero-holder">
          <Hero />
          <div className="section2-Home">
            <p className="section2-Home-Header">
              Welcome to Citadel Investment
            </p>
            <motion.div className="section2-Home-MainContainer">
              <div className="section2-image-container">
                <motion.img
                  src={mobilePhone}
                  alt="mobilePhone"
                  className="supposed-img"
                  initial={{
                    opacity: 0,
                    y: 300,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 30,
                    mass: 1.5,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ margin: "-40px" }}
                ></motion.img>
              </div>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 300,
                }}
                transition={{
                  type: "spring",
                  stiffness: 30,
                  mass: 1.5,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ margin: "-40px" }}
                className="section2-txt-container"
              >
                <p>
                  We invest to create a financial return, while constantly
                  challenging our methods and improving our ability to make an
                  impact. Our values center around intellectual humility, idea
                  meritocracy, and close teamwork with management, experts and
                  the Board, thrusted with an adequate culture and shared
                  vision. We are a true long-term investor in both private and
                  public markets. We form long term partnerships, and we engage
                  proactively, transparently and constructively in our
                  investments. We are an independent private investment group
                  that supports individual and entrepreneurs in realizing their
                  growth ambitions.
                </p>
                <p>
                  Our primary focus is on assets located in Europe, Asia and
                  North America. Our focus is on the cash-flow profile of the
                  asset, underpinned by long contracts. Core sectors include
                  forex market, cryptocurrencies, energy, utilities, transport
                  and telecom. We invest in high quality assets where the
                  governance and structure are well defined and carried out
                  together with best-in-class investment team. We avoid high
                  dependency on market risks via long contractual arrangements
                  and investment structures.
                </p>
                <p>
                  Our team of brilliant minds is dedicated to identifying
                  emerging technologies and harnessing their potential to create
                  positive and lasting change. We believe that innovation is the
                  key to addressing the world's most pressing challenges and
                  unlocking new opportunities for growth and progress.
                </p>
              </motion.div>
            </motion.div>
          </div>
          <div className="section3-Home">
            <div className="section3-Home-Header">
              <motion.h4
                initial={{
                  opacity: 0,
                  x: 300,
                }}
                transition={{
                  type: "spring",
                  stiffness: 30,
                  mass: 1.5,
                }}
                // animate={{ opacity: 1, y: 0 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  //   delay: stagger(0.05),
                }}
                viewport={{ margin: "-40px" }}
              >
                OUR INVESTMENT PLANS
              </motion.h4>
              <motion.h1
                initial={{
                  opacity: 0,
                  x: 100,
                }}
                transition={{
                  type: "spring",
                  stiffness: 30,
                  mass: 1.5,
                }}
                // animate={{ opacity: 1, y: 0 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  //   delay: stagger(0.05),
                }}
                viewport={{ margin: "-40px" }}
              >
                INVESTMENT SOLUTIONS
              </motion.h1>
            </div>
            <motion.div
              initial={{
                opacity: 0,
                y: 300,
              }}
              transition={{
                type: "spring",
                stiffness: 30,
                mass: 1.5,
              }}
              // animate={{ opacity: 1, y: 0 }}
              whileInView={{
                opacity: 1,
                y: 0,

                //   delay: stagger(0.05),
              }}
              viewport={{ margin: "-40px", once: true }}
              className="section3-Home-mainContainer"
            >
              <CardPlan />
            </motion.div>
          </div>
          <div className="section4_Home">
            <div className="section4-Home-MainContainer">
              <h1>Independent private digital investment group</h1>
              <p>
                We identify and realise untapped potential and build on our
                collective learnings while pursuing fact-based methods to secure
                and document our value creation
              </p>
              <div className="section4-Home-button">
                <button>ABOUT US</button>
              </div>
            </div>
            <div className="section4-home-imgContainer">
              <img src={ImgHomeSec4} alt="" />
            </div>
          </div>
          <div className="section5-Home">
            <div className="section5-Home-logoContainer">
              <motion.div
                initial={{
                  opacity: 0,
                  x: -100,
                }}
                transition={{
                  type: "spring",
                  stiffness: 30,
                  mass: 1.5,
                }}
                // animate={{ opacity: 1, y: 0 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  //   delay: stagger(0.05),
                }}
                viewport={{ once: true }}
                className="section5-Home-logoContainer-title"
              >
                Welcome to Citadel Investment
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  x: -100,
                }}
                transition={{
                  type: "spring",
                  stiffness: 30,
                  mass: 1.5,
                }}
                // animate={{ opacity: 1, y: 0 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  //   delay: stagger(0.05),
                }}
                viewport={{ once: true }}
                className="section5-home-logo-icons"
              >
                <img src={bitCoin} alt="bitcoin" />
                <img src={ethereum} alt="ethereum" />
                <img src={dash} alt="dash" />
                <img src={bitCoinCash} alt="bitCoinCash" />
                <img src={doge} alt="doge" />
                <img src={litecoin} alt="litecoin" />
                <img src={pax} alt="pax" />
                <img src={payeer} alt="payeer" />
                <img src={tron} alt="tron" />
                <img src={tetherusdt} alt="tetherusdt" />
                <img src={tetherusdterc20token} alt="tetherusdterc20token" />
                <img src={tetherusdttrc20token} alt="tetherusdttrc20token" />
              </motion.div>
            </div>
            <div className="section5-Home-textHolder">
              <motion.p
                initial={{
                  opacity: 0,
                  x: 100,
                }}
                transition={{
                  type: "spring",
                  stiffness: 30,
                  mass: 1.5,
                }}
                // animate={{ opacity: 1, y: 0 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  //   delay: stagger(0.05),
                }}
                viewport={{ margin: "-10px", once: true }}
              >
                Our primary focus is on assets located in Europe, Asia and North
                America. Our focus is on the cash-flow profile of the asset,
                underpinned by long contracts. Core sectors include forex
                market, cryptocurrencies, energy, utilities, transport and
                telecom. We invest in high quality assets where the governance
                and structure are well defined and carried out together with
                best-in-class investment team. We avoid high dependency on
                market risks via long contractual arrangements and investment
                structures.
              </motion.p>
              <motion.p
                initial={{
                  opacity: 0,
                  x: 100,
                }}
                transition={{
                  type: "spring",
                  stiffness: 30,
                  mass: 1.5,
                }}
                // animate={{ opacity: 1, y: 0 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  //   delay: stagger(0.05),
                }}
                viewport={{ margin: "-40px", once: true }}
              >
                We invest to create a financial return, while constantly
                challenging our methods and improving our ability to make an
                impact. Our values center around intellectual humility, idea
                meritocracy, and close teamwork with management, experts and the
                Board, thrusted with an adequate culture and shared vision. Our
                values center around intellectual humility, idea meritocracy,
                and close teamwork with management, experts and the Board,
                thrusted with an adequate culture and shared vision.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
