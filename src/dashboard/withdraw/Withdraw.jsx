import { useEffect, useState } from "react";
import "./Withdrawal.css";
import "./WithdrawalMedia.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { expireSession } from "../../Redux/State";

function Submit({ loading }) {
  return (
    // <>
    <button type="submit" className="btc_proceed_to_withdraw_btn">
      {loading ? (
        <ClipLoader size={25} color="white" />
      ) : (
        " Proceed to withdraw"
      )}
    </button>
    // </>
  );
}

const Withdraw = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [withdrawal, setWithdrawal] = useState("");
  const [usd, setUsd] = useState(0);
  const user = useSelector((state) => state.BTC.userRes);
  const [loading, setLoading] = useState(false);
  const [emptyGateway, setEmptyGateway] = useState(false);
  console.log(user);
  const [select, setSelect] = useState();

  async function withdrawDollars(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("usd", usd);
      const response = await axios.post(
        `https://citadel-inv.onrender.com/withdrawMoney/${user._id}`,
        formData
      );
      console.log(response);
      toast.success(response?.data?.message);
      toast.success(`Remaining balance: $${response?.data?.remainingBalance}`);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
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
      // }
    }
  }

  console.log("Usd", usd);
  console.log(loading);
  useEffect(() => {
    setLoading(false);
    if (user.length === 0) {
      nav("/");
    }
  }, []);
  useEffect(() => {
    if (withdrawal) {
      setEmptyGateway(false);
    }

    setLoading(false);
  }, [emptyGateway, withdrawal]);

  return (
    <>
      <div className="withdraw_page">
        <form onSubmit={withdrawDollars} className="withdraw_page_form">
          <p className="withdraw_page_title_P">Withdraw Fund</p>
          <div className="withdraw_wrapper">
            <span className="withdraw_gateway_text">
              Select Gateway<span style={{ color: "red" }}>*</span>
            </span>
            <select
              className="withdraw_gateway_select"
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value="">Select One...</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Bank_transfer">Bank Transfer</option>
            </select>
          </div>
          {select === "Bitcoin" && (
            <div className="btc_div">
              <div className="btc_address_div">
                <p>
                  Bitcoin Address
                  <span style={{ color: "rgb(226, 5, 5)" }}>*</span>
                </p>
                <input
                  type="text"
                  placeholder=""
                  className="btc_address_input"
                />
              </div>
              <div className="btc_address_div">
                <p>
                  Amount<span style={{ color: "rgb(226, 5, 5)" }}>*</span>
                </p>
                <div className="btc_amount_wrapper">
                  <div>USD</div>
                  <input
                    onChange={(e) => setUsd(e.target.value)}
                    type="number"
                    className="btc_amt_input"
                  />
                </div>
              </div>
              <Submit
                disabled={loading}
                style={{ background: loading ? "grey" : null }}
                loading={loading}
              />
            </div>
          )}

          {select === "Ethereum" && (
            <div className="btc_div">
              <div className="btc_address_div">
                <p>
                  Etherium Address
                  <span style={{ color: "rgb(226, 5, 5)" }}>*</span>
                </p>
                <input
                  type="text"
                  placeholder=""
                  className="btc_address_input"
                />
              </div>
              <div className="btc_address_div">
                <p>
                  Amount<span style={{ color: "rgb(226, 5, 5)" }}>*</span>
                </p>
                <div className="btc_amount_wrapper">
                  <div>USD</div>
                  <input
                    onChange={(e) => setUsd(e.target.value)}
                    type="number"
                    className="btc_amt_input"
                  />
                </div>
              </div>
              <Submit
                disabled={loading}
                style={{ background: loading ? "grey" : null }}
                loading={loading}
              />
            </div>
          )}
          {select === "Bank_transfer" && (
            <div className="bank_transfer_div">
              <div className="bank_name_div">
                <p>
                  Bank Name<span style={{ color: "rgb(226, 5, 5)" }}>*</span>
                </p>
                <input type="text" className="bank_name_input" />
              </div>
              <div className="bank_name_div">
                <p>
                  Account Name<span style={{ color: "rgb(226, 5, 5)" }}>*</span>
                </p>
                <input type="text" className="bank_name_input" />
              </div>
              <div className="bank_name_div">
                <p>
                  Account Number
                  <span style={{ color: "rgb(226, 5, 5)" }}>*</span>
                </p>
                <input type="number" className="bank_name_input" />
              </div>
              <div className="bank_name_div">
                <p>
                  Routine Number
                  <span style={{ color: "rgb(226, 5, 5)" }}>*</span>
                </p>
                <input type="number" className="bank_name_input" />
              </div>
              <div className="bank_amt_div">
                <p>
                  Amount<span style={{ color: "rgb(226, 5, 5)" }}>*</span>
                </p>
                <div className="bank_amt_wrapper">
                  <div>USD</div>
                  <input
                    type="number"
                    className="bank_amt_input"
                    value={usd}
                    onChange={(e) => setUsd(e.target.value)}
                    min={0}
                    max={50000}
                  />
                </div>
              </div>
              <Submit
                disabled={loading}
                style={{ background: loading ? "grey" : null }}
                loading={loading}
              />
            </div>
          )}
        </form>
        <div className="WithdrawCard_Wrapper"></div>
      </div>
    </>
  );
};

export default Withdraw;

// import React, { useState } from "react";
// import "./Withdrawal.css";
// import { IoSearch } from "react-icons/io5";
// function Withdraw() {
//   const [depositHistory, setDepositHistory] = useState(false);
//   const history = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
//   async function viewHistory() {
//     setDepositHistory(true);
//   }

//   return (
//     <div className="withdrawal_Page">
//       {!depositHistory ? (
//         <>
//           <div className="withdrawal_History">
//             <span onClick={viewHistory}>View Wthdrawal History</span>
//           </div>
//           <div className="withdrawal_Card">
//             <section className="top_DepCard">
//               <span>Select gateway</span>
//               <select>
//                 <option value="">Select one</option>
//                 <option value="Bitcoin">BTC</option>
//                 <option value="Etherium">ETHEREUM</option>
//                 <option value="Transfer">Bank Transfer</option>
//               </select>
//             </section>
//             <section className="mid_DepCard">
//               <div className="amount_InputDiv">
//                 <input type="number" />
//                 <span>USD</span>
//               </div>
//             </section>
//             <section className="bot_DepCard">
//               <button>Withdraw</button>
//             </section>
//           </div>
//         </>
//       ) : (
//         <div className="withdrawal_history">
//           <section className="withdrawal_HistoryHeader">
//             <div className="search_HistoryDiv">
//               <input type="text" placeholder="Search transaction" />
//               <span>
//                 <IoSearch />
//               </span>
//             </div>
//           </section>
//           <section className="withdrawal_HistoryBody">
//             <div className="top_HistoryBody">
//               <span>Gateway | Transaction</span>
//               <span>Initiated</span>
//               <span>Amount</span>
//               <span>Conversion</span>
//               <span>Status</span>
//               <span>Details</span>
//             </div>
//             <div className="bot_HistoryBody">
//               <div className="history_Data">
//                 <span>Gateway | Transaction</span>
//                 <span>Initiated</span>
//                 <span>Amount</span>
//                 <span>Conversion</span>
//                 <span>Status</span>
//                 <span>Details</span>
//               </div>
//             </div>
//           </section>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Withdraw;
