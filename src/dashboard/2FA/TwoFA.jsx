import React, { useEffect, useState } from "react";
import "./TwoFA.css";
import axios from "axios";
import { BounceLoader, ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { expireSession } from "../../Redux/State";

function TwoFA() {
  const [googleToken, setGoogleToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifytLoading] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [secretBase, setsecretBase] = useState("");
  const url = "https://citadel-inv.onrender.com/code";
  const generatBarCode = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      console.log(response);
      setQrCode(response?.data?.qrCodeImageUrl);
      setsecretBase(response?.data?.secretBase32);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err?.code === "ERR_NETWORK") {
        toast.error("Cannot get QR code, check your internet connection");
      } else if (err.message === "timeout exceeded") {
        toast.error("timeout exceeded");
        setLoading(false);
      } else if (err?.response?.data?.message === "jwt expired") {
        nav("/login");
        dispatch(expireSession(true));
      } else {
        setLoading(false);
        toast.error(err.response?.data?.message);
        setLoading(false);
      }
      console.log(err);
    }
  };

  const verifyQrToken = async () => {
    setVerifytLoading(true);
    try {
      const response = await axios.post(
        "https://citadel-inv.onrender.com/verify",
        {
          token: googleToken,
        }
      );
      console.log(response);
      toast.success("Token is valid, account confirmed");
      setVerifytLoading(false);
    } catch (err) {
      setVerifytLoading(false);
      console.log(err);
      if (err.message === "Network Error") {
        toast.error("No internet Connection");
        setLoading(false);
      } else if (err.message === "timeout exceeded") {
        toast.error("timeout exceeded");
        setLoading(false);
      } else if (err?.response?.data?.message === "jwt expired") {
        nav("/login");
        dispatch(expireSession(true));
      } else {
        setLoading(false);
        toast.error(err.response?.data?.message);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    generatBarCode();
  }, []);
  console.log("code", qrCode);
  console.log("code", secretBase);

  return (
    <div className="TwoFA_Page">
      <div className="Header_Tab"></div>
      <div className="TwoFA_Wrapper">
        <div className="First_TFA">
          <section className="FirstTFA_Top">
            <span>Add your account</span>
            <p>
              Use the QR code or setup key on your Google Authenticator app to
              add your account.
            </p>
            {/* <img src="" alt="" /> */}
          </section>
          <section className="twoFA_QR">
            <img src={qrCode} alt="" />
          </section>
          <section className="FirstTFA_Mid">
            <p>Setup Key</p>
            <input type="text" value={secretBase} />
            <div className="Copy_Btn">Copy</div>
          </section>
          <section className="FirstTFA_Bot">
            <div>
              <p>Help</p>
            </div>
            <span style={{ lineHeight: "22px" }}>
              Google Authenticator is a multifactor app for mobile devices. It
              generates timed codes used during the 2-step verification process.
              To use Google Authenticator, install the Google Authenticator
              application on your mobile device.
            </span>
            <span className="helpBtn">Download</span>
          </section>
        </div>
        <div className="Sec_TFA">
          <section className="Enable_2FA">
            <div className="SecTFA_Header">
              <span>Enable 2FA Security</span>
            </div>
            <div className="SecTFA_Body">
              <div className="TFA_OTP">
                <p>
                  Google Authenticatior OTP
                  <span style={{ color: "red" }}>*</span>
                </p>
                <input
                  type="text"
                  onChange={(e) => setGoogleToken(e.target.value)}
                  value={googleToken}
                />
              </div>
              <div className="Submit_TFA">
                <button onClick={verifyQrToken} disabled={verifyLoading}>
                  {verifyLoading ? (
                    <ClipLoader color="white" size={30} />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      {loading ? (
        <div className="loadingData">
          <span>Getting QR Code</span>
          <BounceLoader size={120} color="white" />
        </div>
      ) : verifyLoading ? (
        <div className="loadingData">
          <span>Please wait</span>
          <BounceLoader size={120} color="white" />
        </div>
      ) : null}
    </div>
  );
}

export default TwoFA;
