import axios from "axios";
import "./Deposit.css";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
import { expireSession } from "../../Redux/State";

function DepositHistory({ user }) {
  const [allDepositHistory, setAllDepositHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(allDepositHistory);
  async function getDepositHistory() {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://citadel-inv.onrender.com/DepositHistory/${user._id}`
      );
      setLoading(false);
      console.log(response);
      setAllDepositHistory(response?.data?.data);
      toast.success(response?.data?.message);
    } catch (err) {
      if (err?.message === " Network Error") {
        toast.error("Bad Internet Connection");
      } else if (err?.response?.data?.message === "jwt expired") {
        nav("/login");
        dispatch(expireSession(true));
      } else {
        toast.error(err?.response?.data?.message);
      }
      setLoading(false);
      console.log(err);
    }
  }

  useEffect(() => {
    getDepositHistory();
  }, []);

  return (
    <>
      <div
        style={{
          marginTop: "2rem",
          overflowY: "auto",
          width: "100%",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "relative",
          borderRadius: "3px",
          // backgroundImage: linear-gradient(to bottom right, #403f44, #1e1b32),
        }}
      >
        <section className="deposit_HistoryHeader">
          <div className="search_HistoryDiv">
            <input type="text" placeholder="Search transaction" />
            <span>
              <IoSearch />
            </span>
          </div>
        </section>
        <div style={{ textAlign: "center" }}>
          <section className="deposit_HistoryBody">
            {loading ? (
              <div>
                <span>Please wait...</span>
                <BounceLoader size={120} color="orangered" />
              </div>
            ) : allDepositHistory.length === 0 ? (
              <p
                style={{
                  color: "orangered",
                  fontSize: "1.2rem",
                  textAlign: "center",
                }}
              >
                No deposit yet
              </p>
            ) : (
              <div className="table-container">
                <table className="transaction-table">
                  <thead className="transaction-table-head">
                    <tr className="transaction-table-row">
                      <th className="transaction-table-th">Deposit ID</th>
                      <th className="transaction-table-th">Amount</th>
                      <th className="transaction-table-th">Date</th>
                      <th className="transaction-table-th">Time</th>
                      {/* <th className="transaction-table-th">Details</th> */}
                    </tr>
                  </thead>

                  <tbody>
                    {allDepositHistory?.map((transaction, index) => (
                      <tr className="transaction-table-row" key={index}>
                        <td className="transaction-table-data">
                          {transaction.depositId}
                        </td>
                        <td className="transaction-table-data">
                          {transaction.amount}
                        </td>
                        <td className="transaction-table-data">
                          {new Date(
                            transaction.proofOfPayment.createdAt
                          ).toLocaleDateString()}
                        </td>
                        <td className="transaction-table-data">
                          {new Date(
                            transaction.proofOfPayment.createdAt
                          ).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* <div className="bot_HistoryBody">
            {allDepositHistory.map((items) => (
              <div key={items.depositId} className="history_Data">
                <span>Gateway | Transaction</span>
                <span>{items.depositId}</span>
                <span>${items.amount}</span>
                <span>{items.proofOfPayment.createdAt.slice(0, 10)}</span>
                <span>{items.proofOfPayment.createdAt.slice(11, 19)}</span>
              </div>
            ))}
          </div> */}

            {/* <div className="top_HistoryBody">
            <span>Gateway | Transaction</span>
            <span>Deposit ID</span>
            <span>Amount</span>
            <span>Date</span>
            <span>Time</span>
            <span>Details</span>
          </div> */}
          </section>
        </div>
      </div>
    </>
  );
}

export default DepositHistory;
