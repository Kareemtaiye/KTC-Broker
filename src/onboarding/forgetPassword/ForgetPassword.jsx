import React, { useState } from "react";
import "./ForgetPassword.css";
import "./ForgetPasswordMedia.css";
// import citadelLogo from "../../assets/image/citadelLogo.png";
import citadelLogo from "../../assets/citadel2.png";
// import ultimate_logo from '.././../assets/ultimate_logo.png'
import { MdOutlineArrowBackIos } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  const url = `https://citadel-inv.onrender.com/forgotPassword`;
  const sendMailForPassword = async () => {
    if (!email.trim()) {
      toast.error("Email field cannot be empty");
    } else {
      setloading(true);
      try {
        const response = await axios.post(url, { email });
        console.log(response);
        toast.success(response?.data?.message);
        setloading(false);
      } catch (err) {
        setloading(false);
        console.log(err);
        toast.error(err?.response?.data?.message);
      }
    }
  };

  return (
    <div className="forget-password-body">
      <div className="forget-password-main-body">
        <img src={citadelLogo} alt="citadelLogo" />
        <h1 className="forget-password-h1">Forgotten Password</h1>
        <p className="forget-password-p">
          Enter your email and we'll send you a link to reset your password
        </p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="forget-password-input"
          placeholder="Enter your email address here"
        />
        <button
          disabled={loading}
          className="forget-password-submit-btn"
          onClick={sendMailForPassword}
        >
          {loading ? (
            <ClipLoader size={25} thickness={99} speed={100} color="white" />
          ) : (
            "Submit"
          )}
        </button>
        <div
          className="forget-password-back-to-login"
          onClick={() => nav("/login")}
        >
          <MdOutlineArrowBackIos />
          Back to Login
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
