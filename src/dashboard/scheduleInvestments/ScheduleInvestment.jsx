import axios from "axios";
import "../Deposits/Deposit.css";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
import { expireSession } from "../../Redux/State";

function ScheduleInvestment() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.BTC.user);
  const [loading, setLoading] = useState(false);
  const [scheduleInvestments, setScheduleInvestments] = useState([]);

  async function getScheduleInvestments() {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://citadel-inv.onrender.com/getScheduledInvestments/${id}`
      );
      console.log(response);
      setLoading(false);
      toast?.success("Schedule investement recovered successfully");
      setScheduleInvestments(response?.data?.scheduledInvestments);
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err?.message === " Network Error") {
        toast.error("Bad Internet Connection");
      } else {
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
  }

  useEffect(() => {
    getScheduleInvestments();
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
        <section className="deposit_HistoryBody">
          <div className="top_HistoryBodyS">
            {/* <span>Gateway | Transaction</span> */}
            <span
              style={{
                width: "16.3%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Investment ID
            </span>
            <span
              style={{
                width: "16.3%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Amount
            </span>
            <span
              style={{
                width: "16.3%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Plan
            </span>
            <span
              style={{
                width: "16.3%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Schedule Type
            </span>
            <span
              style={{
                width: "16.3%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Satus
            </span>
            <span
              style={{
                width: "16.3%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Date
            </span>
            {/* <span>Details</span> */}
          </div>
          <div style={{ position: "relative" }} className="bot_HistoryBody">
            {loading ? (
              <div className="loadingData">
                <span>Getting User Schedule Investments</span>
                <BounceLoader size={120} color="white" />
              </div>
            ) : (
              scheduleInvestments?.map((items) => (
                <div
                  style={{ justifyContent: "space-between" }}
                  key={items?.investmentId}
                  className="history_Data"
                >
                  <span
                    style={{
                      width: "16.3%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {items?.investmentId || "N/A"}
                  </span>
                  <span
                    style={{
                      width: "16.3%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    ${items?.amount || "N/A"}
                  </span>
                  <span
                    style={{
                      width: "16.3%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {items?.plan || "N/A"}
                  </span>
                  <span
                    style={{
                      width: "16.3%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {items?.scheduleType?.toUpperCase() || "N/A"}
                  </span>
                  <span
                    style={{
                      width: "16.3%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {items?.Satus ? "OnGoing" : "Done" || "N?A"}
                  </span>
                  <span
                    style={{
                      width: "16.3%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {items?.createdAt?.slice(11, 16) || "N?A"}
                  </span>
                  {/* <span>{items?.proofOfPayment.createdAt?.slice(0, 10)}</span>
                <span>{items?.proofOfPayment.createdAt?.slice(11, 19)}</span> */}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default ScheduleInvestment;
