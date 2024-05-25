import { BounceLoader } from "react-spinners";
import "./PendingTickets.css";
import { useEffect, useState } from "react";
import axios from "axios";

function PendingTickets() {
  const [allKyc, setAllKyc] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getAllPendingKyc() {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://citadel-inv.onrender.com/getUsersKYCWithUnverifiedKYC`
      );
      console.log(response);
      setLoading(false);
      setAllKyc(response?.data?.kycDocs);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllPendingKyc();
  }, []);
  return (
    <div className="pending-kyc-page">
      <div className="pending-kyc-page-wrapper">
        <div
          className="top_HistoryBodyS"
          style={{ justifyContent: "space-around" }}
        >
          {/* <span>Gateway | Transaction</span> */}
          <span
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Full-name
          </span>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Gender
          </span>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Occupation
          </span>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            SSN no
          </span>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          ></span>
          {/* <span>Details</span> */}
        </div>
        <div style={{ position: "relative" }} className="bot_HistoryBody">
          {loading ? (
            <div className="loadingData">
              <span>Getting Pending Kyc</span>
              <BounceLoader size={120} color="white" />
            </div>
          ) : (
            allKyc?.map((items) => (
              <div
                style={{ justifyContent: "space-around" }}
                key={items?.investmentId}
                className="history_Data"
              >
                <span style={{}}>{items?.fullName || "N/A"}</span>
                <span style={{}}>${items?.gender || "N/A"}</span>
                <span style={{}}>{items?.occupation || "N/A"}</span>
                <span style={{}}>{items?.SSN || "N/A"}</span>
                <button
                  className="view-more-btn"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  View
                </button>
              </div>
            ))
          )}
        </div>
        <div className="pending-kyc-page-header"></div>
      </div>
    </div>
  );
}

export default PendingTickets;
