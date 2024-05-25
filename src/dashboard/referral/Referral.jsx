import React from "react";
import "./Referral.css";
import { FaCopy } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

const Referral = () => {
  const referal = useSelector((state) => state.BTC.referalLink);

  // async function getReferalLink() {
  //   try{
  //     const response = await axios.get()
  //   }
  // }
  return (
    <div className="referral-main-container">
      <h4 className="referral-h4">Referral link</h4>
      <div className="referral-subcontainer">
        {referal}
        <span className="referral-icon">
          <FaCopy />
        </span>
      </div>
    </div>
  );
};

export default Referral;
