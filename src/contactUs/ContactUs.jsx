import React from "react";
import classes from "./ContactUs.module.css";
import { MdOutlineEmail } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiChat1Line } from "react-icons/ri";
import { GrCompliance } from "react-icons/gr";

function ContactUs() {
  return (
    <div>
      <div className={classes.contactDetailsContainer}>
        <h1 className={classes.contactH1}>
          <span className={classes.contactSpan}>Get in Touch,</span>
          <br />
          We're here to assist you whenever you need.
        </h1>
        <div className={classes.contactIconContainer}>
          <div className={classes.second}>
            <MdOutlineEmail className={classes.contactIcon1} />
            {/* <img
              src={rightBottom}
              alt="line drawing"
              className={classes.contactImg1}
            /> */}
          </div>
        </div>

        <FaUsers className={classes.contactIcon2} />
      </div>

      <div className={classes.contactSection2}>
        <h2 className={classes.contactSection2H2}>
          Reach out to our dedicated team via email.
        </h2>
        <div className={classes.contactGeneralContainer}>
          <div className={classes.contactSubContainer}>
            <RiChat1Line className={classes.genIcon} />
            <h3 className={classes.genH3}>General</h3>
            <div className={classes.contactBtnContainer}>
              <a href="mailto:info@citadel">
                <button className={classes.contactBtn}>Let's Talk</button>
              </a>
            </div>
          </div>

          <div className={classes.contactSubContainer}>
            <FaUsers className={classes.genIcon} />
            <h3 className={classes.genH3}>Patnership</h3>
            <div className={classes.contactBtnContainer}>
              <a href="mailto:info@citadel">
                <button className={classes.contactBtn}>Let's Talk</button>
              </a>
            </div>
          </div>

          <div className={classes.contactSubContainer}>
            <GrCompliance className={classes.genIcon} />
            <h3 className={classes.genH3}>Complain</h3>
            <div className={classes.contactBtnContainer}>
              <a href="mailto:info@citadel">
                <button className={classes.contactBtn}>Let's Talk</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
