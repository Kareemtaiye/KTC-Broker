import React, { useState } from "react";
import "./One-Time-Password.css";
import "./One-Time-PasswordRes.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
function OneTimePassword() {
  const nav = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const savedInputs = localStorage.getItem("userInfo");
  const savedEmail = localStorage.getItem("userEmail");
  const saveInputParsed = JSON.parse(savedInputs);
  const saveEmailParsed = JSON.parse(savedEmail);
  console.log(saveInputParsed, "ewrtfyuhiokl");
  console.log(saveEmailParsed, "ewrtfyuhiokl");

  function getOtpInputs(e, index) {
    if (isNaN(e.target.value)) return false;

    setOtp([
      ...otp.map((digits, i) => (i === index ? e.target.value : digits)),
    ]);

    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
    if (e.target.value === "" && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  }

  async function confirmOTP() {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("otp", otp.join(""));
      const response = await axios.post(
        `https://citadel-inv.onrender.com/verifyOtp/${token}`,
        formData
      );
      setLoading(false);
      console.log(response);
      toast.success(response?.data?.message);
      nav("/login");
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err?.message === "Network Error") {
        toast.error("Bad Internet Connection");
      } else {
        toast.error(err?.response?.data?.message);
      }
    }
  }
  async function resendOTP() {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", saveEmailParsed);
      const response = await axios.post(
        "https://citadel-inv.onrender.com/resendVerificationOtp",
        formData
      );
      setLoading(false);
      console.log(response);
      toast.success(response?.data?.message);
      //   nav("/login");
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err?.message === "Network Error") {
        toast.error("Bad Internet Connection");
      } else {
        toast.error(err?.response?.data?.message);
      }
    } // <-- Missing closing brace here
  }

  console.log(otp);
  return (
    <div className="OTP_Page">
      <h1>Input the OTP sent to your mail for verification</h1>
      <div className="OTP_Inputs">
        {otp.map((digits, i) => (
          <input
            type="text"
            value={digits}
            maxLength={1}
            onChange={(e) => getOtpInputs(e, i)}
          />
        ))}
      </div>
      <div className="Submit_Btn">
        <button disabled={loading} onClick={confirmOTP}>
          {loading ? <ClipLoader color="white" size={30} /> : "Submit"}
        </button>
        <span className="Resend_OTP" onClick={resendOTP}>
          Resend Verification OTP
        </span>
      </div>
    </div>
  );
}

export default OneTimePassword;
