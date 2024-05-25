import React, { useState } from "react";
import "./Deposit.css";
import DepositProof from "./DepositProof";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userAmount, userDeposit, userGateway } from "../../Redux/State";
import { toast } from "react-toastify";
import DepositHistory from "./DepositHistory";
function Deposit() {
  const dispatch = useDispatch();
  const [depositHistory, setDepositHistory] = useState(false);
  const [goToProof, setGoToProof] = useState(false);
  const [gate, setGate] = useState("");
  const [usd, setUsd] = useState("");
  const user = useSelector((state) => state.BTC.userRes);
  const selGateWay = useSelector((state) => state.BTC.gateWay);
  console.log(selGateWay);

  async function viewHistory() {
    setDepositHistory(true);
  }

  async function proceedToDeposit() {
    if (!gate?.trim()) {
      toast.error("Select a payment gateway");
      setGoToProof(false);
    } else if (!usd?.trim()) {
      toast.error("Please input an amount");
      setGoToProof(false);
    } else {
      setGoToProof(true);
    }
  }
  return (
    <div className="deposit_Page">
      {!depositHistory ? (
        <>
          {goToProof ? (
            <DepositProof />
          ) : (
            <>
              <div className="deposit_History">
                <span onClick={viewHistory}>View Deposit History</span>
              </div>
              <div className="deposit_Card">
                <section
                  className="top_DepCard"
                  style={{
                    margin: "1rem 0",
                    /* height: 30%; */
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    /* justify-content: space-evenly; */
                    gap: "2rem",
                    fontSize: "1rem",
                    color: "white",
                  }}
                >
                  <span>Select gateway</span>
                  <select
                    onChange={(e) => {
                      setGate(e.target.value);
                      dispatch(userGateway(e.target.value));
                    }}
                  >
                    <option value="">Select one</option>
                    <option value="Bitcoin">BTC</option>
                    <option value="Usdt">USDT</option>
                    <option value="Ethereum">ETHEREUM</option>
                  </select>
                </section>
                <section className="mid_DepCard">
                  <div className="amount_InputDiv">
                    <input
                      onChange={(e) => {
                        setUsd(e.target.value);
                        dispatch(userDeposit(e.target.value));
                      }}
                      type="number"
                    />
                    <span className="deposit-usd">USD</span>
                  </div>
                </section>
                <section className="bot_DepCard">
                  <button onClick={proceedToDeposit}>Next</button>
                </section>
              </div>
            </>
          )}
        </>
      ) : (
        <DepositHistory user={user} />
      )}
    </div>
  );
}

export default Deposit;
