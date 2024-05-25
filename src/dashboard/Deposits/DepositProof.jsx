import React from "react";
import "./DepositProof.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DepositProof() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [proof, setProof] = useState("");
  const [depositPop, setDepositPop] = useState(false);
  const [wallet, setwallet] = useState("");
  const userGateWay = useSelector((state) => state.BTC.gateWay);
  const depositAmount = useSelector((state) => state.BTC.depositAmount);
  const user = useSelector((state) => state.BTC.userRes);
  const [copied, setCopied] = useState(false);
  console.log(user);

  const [loading, setLoading] = useState(false);
  console.log(proof);

  const submitData = async (e) => {
    e.preventDefault();
    if (!proof) {
      toast.error("You haven't upload your proof");
    } else {
      const confirmation = confirm(
        "Are you sure you want to go ahead with this process?"
      );
      if (confirmation) {
        // alert("confiirmed");
        setLoading(true);
        try {
          const formData = new FormData();
          formData.append("proofOfPayment", proof);
          formData.append("amount", depositAmount);
          const response = await axios.post(
            `https://citadel-inv.onrender.com/DepositFunds/${user._id}`,
            formData
          );
          console.log(response);
          if (response) {
            nav("/deposit");
            toast.success(
              "Your prrof has been been sent, please wait 24hrs for confirmation!"
            );
            setProof("");
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
          if (err?.message === " Network Error") {
            toast.error("Bad Internet Connection");
          } else if (err?.response?.data?.message === "jwt expired") {
            nav("/login");
            dispatch(expireSession(true));
          } else {
            toast.error(err?.response?.data?.message);
          }
        }
        return;
      } else {
        console.log("");
      }
    }
  };

  console.log(proof);

  const removeProof = () => {
    setProof("");
  };

  useEffect(() => {
    userGateWay === "Bitcoin"
      ? setwallet("1AwBidSZMd7pw2zq6ScomjCHMEgmz7MMLG")
      : userGateWay === "Ethereum"
      ? setwallet("1AwBidSZMd7pw2zq6ScomjCHMEgmz7MMLG")
      : userGateWay === "Usdt"
      ? setwallet("THPoLVTj57tNNcbiumqbct1JYGnGUgNwLA")
      : "";
  }, []);

  async function copyWallet() {
    try {
      await navigator.clipboard.writeText(wallet);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
      console.log("heheheheh");
    } catch (err) {
      console.log("Error", err);
    }
  }

  return (
    <div className="Confirm_Deposit">
      <section className="Confirm_DepositWrapper">
        <section className="Confirm_DepositBody">
          <span className="DepositConfirmation_Text">Deposit Confirmation</span>
          <p>
            Send deposit amount to the below information and submit required
            proof to the system's admin. The admin will check the request and
            will match the submitted proof. After verification, if everything is
            ok, the admin will approve the request and the amount will be
            deposited to your Deposit Wallet.
          </p>
          <div className="Bitcoin_Payment">
            <div className="Bitcoin_PaymentHeader">
              <span>BITCOIN Payment</span>
              <div className="PaymentLine"></div>
            </div>
            <div className="Bitcoin_PaymentParagraphs">
              <p>
                You have requested a payment, Please pay{" "}
                <span style={{ color: "red" }}>0.00</span>USD charge for
                successful payment
              </p>
              <p>
                Copy Below BITCOIN Address and pay the amount generated for the
                system to credit you accordingly.
              </p>
              <p>
                N/B: Be mindful of the charge/gas fee to make sure your
                deposited amount is complete.
              </p>
              <p
                className="CopyDiv"
                style={{
                  textAlign: "left",
                  marginTop: "2rem",
                }}
              >
                <button className="Copy_Btn" onClick={copyWallet}>
                  Copy
                </button>
                {copied ? (
                  <h3 className="Clipboard_Notification">
                    Text copied to clipboard
                  </h3>
                ) : null}
                <span
                  style={{
                    fontSize: "0.8rem",
                  }}
                >
                  {userGateWay === "Bitcoin"
                    ? "1AwBidSZMd7pw2zq6ScomjCHMEgmz7MMLG"
                    : userGateWay === "Ethereum"
                    ? "0x61168A7F3DdF3565866acff0BE88EeEfde34e051"
                    : userGateWay === "Usdt"
                    ? "THPoLVTj57tNNcbiumqbct1JYGnGUgNwLA"
                    : "No gateway selected"}{" "}
                </span>
              </p>
            </div>
            {!proof ? (
              <div className="Payment_Wish">
                <span>Good luck on your Deposit!</span>
                <span>
                  Submit your Payment Screenshot{" "}
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
            ) : null}
            {!proof ? (
              <div className="Payment_Proof">
                <span>Upload your proof of payment</span>
                <input
                  onChange={(e) => setProof(e.target.files[0])}
                  type="file"
                  id="File"
                  // accept="/jpg,/png,/pdf"
                />
                <p>Supported mimes: jpg,png,pdf</p>
              </div>
            ) : (
              <div className="Image_Proof">
                <div className="Image">
                  <img
                    src={URL.createObjectURL(proof)}
                    alt="proof of payment"
                  />
                </div>
                <div className="Proof_Buttons">
                  <label htmlFor="File">Change</label>
                  <input
                    style={{ display: "none" }}
                    onChange={(e) => setProof(e.target.files[0])}
                    type="file"
                    id="File"
                  />
                  <button onClick={removeProof}>Remove</button>
                </div>
              </div>
            )}
            <div className="Submit_Btn">
              <button
                style={{ background: loading ? "rgb(34, 2, 34)" : null }}
                onClick={submitData}
                disabled={loading}
              >
                {loading ? "Please wait " : "Submit"}
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default DepositProof;
