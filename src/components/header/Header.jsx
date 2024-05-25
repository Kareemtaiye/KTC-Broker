import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import "./Header.css";
import "./HeaderMedia.css";
import CITADEL from "../../assets/citadel1.png";

const Header = () => {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    // Dynamically load the LiveCoinWatch script
    const script = document.createElement("script");
    script.src = "https://www.livecoinwatch.com/static/lcw-widget.js";
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="home-widget-homeMenu-holder">
        <div className="home-widget">
          <div className="home-widget-wrapper">
            {/* <TradingViewWidget /> */}
            <script
              defer
              src="https://www.livecoinwatch.com/static/lcw-widget.js"></script>{" "}
            <div
              className="livecoinwatch-widget-5"
              lcw-base="USD"
              lcw-color-tx="#999999"
              lcw-marquee-1="coins"
              lcw-marquee-2="movers"
              lcw-marquee-items="10"></div>
          </div>
        </div>
        <div className="home-header-container">
          <div className="home-header-wrapper">
            <div className="home-header-wrapper-logo">
              <img src={CITADEL} alt="company logo" />
            </div>
            {/*  */}
            <div className="home-header-wrappper-menu">
              <ul>
                <li>
                  <NavLink to='/' className={({ isActive }) => isActive ? 'menuactive' : 'menunotactive'}>Home</NavLink>
                </li>
                <li className="navLinks">
                  <a href="https://vault-investment-project.vercel.app/">
                    wallet
                  </a>
                </li>
                <li>
                  <NavLink to='/about' className={({ isActive }) => isActive ? 'menuactive' : 'menunotactive'}>About Us</NavLink>
                </li>
                <li>
                  <NavLink to='/terms' className={({ isActive }) => isActive ? 'menuactive' : 'menunotactive'}>Terms</NavLink>
                </li>
                <li>
                  <NavLink to='/login' className={({ isActive }) => isActive ? 'menuactive' : 'menunotactive'}>Login</NavLink>
                </li>
                <li>
                  <NavLink to='/contact' className={({ isActive }) => isActive ? 'menuactive' : 'menunotactive'}>Contact Us</NavLink>
                </li>
              </ul>
            </div>
            <span className="home-header-create-acct-span">
              <NavLink to='/register' className={({ isActive }) => isActive ? 'menuactive' : 'menunotactive'}>Create Account</NavLink>
            </span>
          </div>
          <div className="home-header-wrapper-media">
            <div className="header-mobile-logo-container">
              {/* <img src={CITADEL} alt="logo" /> */}
            </div>
            <div className="header-burger-menu-container">
              {menu ? (
                <IoMdClose
                  onClick={() => {
                    setMenu(false);
                  }}
                />
              ) : (
                <RxHamburgerMenu
                  onClick={() => {
                    setMenu(true);
                  }}
                />
              )}
            </div>
            {menu ? (
              <div className="header-mobile-menu">
                <ul>
                  <li>
                    <NavLink to='/' className={({ isActive }) => isActive ? 'menuactive' : 'menunotactive'}>Home</NavLink>
                  </li>
                  <li className="navLinks">
                    <a href="https://vault-investment-project.vercel.app/">
                      Wallet
                    </a>
                  </li>
                  <li>
                    <NavLink to='/about' className={({ isActive }) => isActive ? 'menuactive' : 'menunotactive'}>About Us</NavLink>
                  </li>
                  <li>
                    <NavLink to='/terms' className={({ isActive }) => isActive ? 'menuactive' : 'menunotactive'}>Terms</NavLink>
                  </li>
                  <li>
                    <NavLink to='/login' className={({ isActive }) => isActive ? 'menuactive' : 'menunotactive'}>Login</NavLink>
                  </li>
                  <li>
                    <NavLink to='/contact' className={({ isActive }) => isActive ? 'menuactive' : 'menunotactive'}>Contact Us</NavLink>
                  </li>
                  <li>
                    <NavLink to='/register' className={({ isActive }) => isActive ? 'menuactive' : 'menunotactive'}>Create Account</NavLink>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
