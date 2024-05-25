import axios, { all } from "axios";
// import "./MyInv.css";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
import { expireSession } from "../../Redux/State";

function MyInv() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.BTC.user);
  const [allInvestments, setAlInvestments] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(allInvestments);
  async function getInvestments() {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://citadel-inv.onrender.com/getOngoingPlans/${user.id}`
      );
      setLoading(false);
      console.log(response);
      setAlInvestments(response?.data?.ongoingPlans);
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
    getInvestments();
  }, []);

  console.log(user);

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

        <div style={{ position: "relative" }}>
          {loading ? (
            <div className="loadingData">
              <span>Please wait...</span>
              <BounceLoader size={120} color="orangered" />
            </div>
          ) : allInvestments.length === 0 ? (
            <p
              style={{
                color: "orangered",
                fontSize: "1.2rem",
                textAlign: "center",
              }}
            >
              No Investment yet
            </p>
          ) : (
            <table className="transaction-table">
              <thead className="transaction-table-head">
                <tr className="transaction-table-row">
                  <th className="transaction-table-th">Id</th>
                  <th className="transaction-table-th">Amount</th>
                  <th className="transaction-table-th">Plan</th>
                  <th className="transaction-table-th">Wallet</th>
                  {/* <th className="transaction-table-th">Schedule Type</th> */}
                  <th className="transaction-table-th">Date</th>
                </tr>
              </thead>

              <tbody>
                {allInvestments?.map((transaction, index) => (
                  <tr className="transaction-table-row" key={index}>
                    <td className="transaction-table-data">
                      {transaction.investmentId
                        ? transaction.investmentId
                        : "N/A"}
                    </td>
                    <td className="transaction-table-data">
                      {transaction.amount}
                    </td>
                    <td className="transaction-table-data">
                      {transaction.plan}
                    </td>
                    <td className="transaction-table-data">
                      {transaction.wallet}
                    </td>
                    {/* <td className="transaction-table-data">
                      {transaction.scheduleType}
                    </td> */}
                    <td className="transaction-table-data">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* <section className="deposit_HistoryBody">
          <div className="top_HistoryBody">
            <span>ID</span>
            <span>Amount</span>
            <span>Plan</span>
            <span>Wallet</span>
            <span>Schedule type</span>
            <span>Date</span>
           
          </div>
          <div style={{ position: "relative" }} className="bot_HistoryBody">
            {loading ? (
              <div className="loadingData">
                <span>Please wait...</span>
                <BounceLoader size={120} color="white" />
              </div>
            ) : (
              allInvestments?.map((items) => (
                <div key={items?._id} className="history_Data">
                  <span>{items?._id}</span>
                  <span>${items?.amount}</span>
                  <span>{items?.plan}</span>
                  <span>{items?.wallet}</span>
                  <span>{items?.scheduleType}</span>
                  <span>{items?.createdAt}</span>
                  
                </div>
              ))
            )}
          </div>
        </section> */}
      </div>
    </>
  );
}

export default MyInv;
