import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
import { expireSession } from "../../Redux/State";

// import TransactionTable from "./TransactionTable";
import "./Transaction.css";

const Transaction = () => {
  const { id } = useSelector((state) => state.BTC.user);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [transactionHistory, setTransactionHistory] = useState([]);

  console.log(transactionHistory);

  useEffect(() => {
    async function getTransactionHistory() {
      try {
        const response = await axios.get(
          `https://citadel-inv.onrender.com/getTransactionHistory/${id}`
        );
        console.log(response);
        toast?.success(response?.data?.message);
        setTransactionHistory(response?.data?.data);
        setLoading(false);
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
    }

    getTransactionHistory();
  }, []);

  return (
    <>
      <div className="deposit_history">
        <section className="deposit_HistoryHeader">
          <div className="search_HistoryDiv">
            <input type="text" placeholder="Search transaction" />
            <span>
              <IoSearch />
            </span>
          </div>
        </section>

        <div style={{ position: "relative" }} className="bot_HistoryBody">
          {loading ? (
            <div className="loadingData">
              <span>Please wait...</span>
              <BounceLoader size={120} color="orangered" />
            </div>
          ) : transactionHistory.length === 0 ? (
            <p
              style={{
                color: "orangered",
                fontSize: "1.2rem",
                textAlign: "center",
              }}
            >
              No transaction yet
            </p>
          ) : (
            <div className="table-container">
              <table className="transaction-table">
                <thead className="transaction-table-head">
                  <tr className="transaction-table-row">
                    <th className="transaction-table-th">Id</th>
                    <th className="transaction-table-th">Amount</th>
                    <th className="transaction-table-th">Type</th>
                    <th className="transaction-table-th">Date</th>
                    <th className="transaction-table-th">Time</th>
                  </tr>
                </thead>

                <tbody>
                  {transactionHistory?.map((transaction, index) => (
                    <tr className="transaction-table-row" key={index}>
                      <td className="transaction-table-data">
                        {transaction.ID ? transaction.ID : "N/A"}
                      </td>
                      <td className="transaction-table-data">
                        {transaction.amount}
                      </td>
                      <td className="transaction-table-data">
                        {transaction.type}
                      </td>
                      <td className="transaction-table-data">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </td>
                      <td className="transaction-table-data">
                        {new Date(transaction.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Transaction;
