import React from "react";
import "./Footer.css";
import "./FooterMedia.css";
import NewsLetter from "../NewsLetter";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { IoMailOpenSharp } from "react-icons/io5";
import { TbMessages } from "react-icons/tb";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className="footer-section">
      <motion.div
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
        className="footer-container">
        <div className="company-footer-first">
          <h3 className="footer-h3">Logo</h3>

          <p className="footer-details footer-letter-spacing">
            To effectively meet and manage the expectations of all our
            investors, it's crucial to establish clear and firm guidance to
            steer us forward.
          </p>

          <div className="footer-message">
            <div className="footer-message-img-container">
              <img
                className="footer-message-img"
                width={40}
                src="https://img.icons8.com/dusk/64/speech-bubble-with-dots--v1.png"
                alt="speech-bubble-with-dots--v1"
              />
            </div>

            <div className="needfree">
              <h3 className="footer-h3">need consultation?</h3>

              <p>
                <a href="./" className="needfree-contact-support">
                  contact support
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-information">
          <h3 className="footer-h3">Information</h3>

          <ul className="footer-list">
            <li className="footer-links">
              <Link to='/' className="footer-link">Home</Link>
            </li>
            <li className="footer-links">
              <a className="footer-link" href="https://vault-investment-project.vercel.app/">Wallet</a>
            </li>
            <li className="footer-links">
              <Link to='/about' className="footer-link">About Us</Link>
            </li>
            <li className="footer-links">
              <Link to='/terms' className="footer-link">Terms & Conditions</Link>
            </li>
            <li className="footer-links">
              <Link to='/contact' className="footer-link">Contact us</Link>
            </li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <NewsLetter />
        </div>

        <div className="footer-contact">
          <h3 className="footer-h3">Contact information</h3>

          <div className="footer-contact-container">
            <p className="footer-contact-details">
              <IoCallOutline />citadel-investment.com@gmail.com
            </p>

            <p className="footer-contact-details">
              <IoMailOpenSharp /> info@citadelmail.com
            </p>

            <p className="footer-contact-details">
              <CiLocationOn /> 1 citadel street main 
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
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
        className="copyright">
        copyright @2024 citadel
      </motion.div>
    </section>
  );
}

export default Footer;
