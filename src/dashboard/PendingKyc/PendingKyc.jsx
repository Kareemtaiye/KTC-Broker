import axios from "axios";
import "./PendingKyc.css";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { expireSession } from "../../Redux/State";
import { useNavigate } from "react-router-dom";

function PendingKyc() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [allKyc, setAllKyc] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [isApprovedKyc, setisApprovedKyc] = useState(false);
  const { token } = useSelector((state) => state.BTC.user);

  async function getAllPendingKyc() {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://citadel-inv.onrender.com/getUsersKYCWithUnverifiedKYC`
      );
      console.log(response);
      setLoading(false);
      setAllKyc(response?.data?.kycDocs);
      console.log(allKyc);
      toast.success("All Kyc gotten successfully");
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.message === "Network Error") {
        toast.error("No internet Connection");
      } else if (err?.response?.data?.message === "jwt expired") {
        nav("/login");
        dispatch(expireSession(true));
      } else if (err.message === "timeout exceeded") {
        toast.error("timeout exceeded");
      } else {
        toast.error(err.response?.data?.message);
      }
    }
  }

  async function approveKyc(userId) {
    setApproveLoading(true);
    try {
      const response = await axios.post(
        `https://citadel-inv.onrender.com/approveKyc`,
        { userId }
      );
      console.log(response);
      setApproveLoading(false);
      // setAllKyc(response?.data?.kycDocs);
      toast.success("User KYC updated successfully");
      setisApprovedKyc(true);
    } catch (err) {
      setisApprovedKyc(false);
      console.log(err);
      setApproveLoading(false);
      console.log(err);
      if (err.message === "Network Error") {
        toast.error("No internet Connection");
      } else if (err?.response?.data?.message === "jwt expired") {
        nav("/login");
        dispatch(expireSession(true));
      } else if (err.message === "timeout exceeded") {
        toast.error("timeout exceeded");
      } else {
        toast.error(err.response?.data?.message);
      }
    }
  }

  async function rejectKyc(userId) {
    setApproveLoading(true);
    try {
      const response = await axios.post(
        `https://citadel-inv.onrender.com/rejectKyc`,
        { userId }
      );
      console.log(response);
      setApproveLoading(false);
      // setAllKyc(response?.data?.kycDocs);
      toast.success("User KYC updated successfully");
      setisApprovedKyc(true);
    } catch (err) {
      setisApprovedKyc(false);
      console.log(err);
      setApproveLoading(false);
      console.log(err);
      if (err.message === "Network Error") {
        toast.error("No internet Connection");
      } else if (err?.response?.data?.message === "jwt expired") {
        nav("/login");
        dispatch(expireSession(true));
      } else if (err.message === "timeout exceeded") {
        toast.error("timeout exceeded");
      } else {
        toast.error(err.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    getAllPendingKyc();
  }, []);
  useEffect(() => {
    if (isApprovedKyc) {
      getAllPendingKyc();
    }
  }, [isApprovedKyc]);
  return (
    <div className="pending-kyc-page">
      <div style={{ position: "relative" }} className="bot_HistoryBody">
        {loading ? (
          <div className="loadingData">
            <span>Please wait...</span>
            <BounceLoader size={120} color="orangered" />
          </div>
        ) : allKyc.length === 0 ? (
          <p
            style={{
              color: "orangered",
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            No Kyc to verify yet
          </p>
        ) : (
          <div className="table-container">
            <table className="transaction-table">
              <thead className="transaction-table-head">
                <tr className="transaction-table-row">
                  <th className="transaction-table-th">FullName</th>
                  <th className="transaction-table-th">Gender</th>
                  <th className="transaction-table-th">Occupation</th>
                  <th className="transaction-table-th">SSN</th>
                  <th className="transaction-table-th">View</th>
                </tr>
              </thead>

              <tbody>
                {allKyc?.map((transaction, index) => (
                  <tr className="transaction-table-row" key={index}>
                    <td className="transaction-table-data">
                      {transaction.fullName ? transaction.fullName : "N/A"}
                    </td>
                    <td className="transaction-table-data">
                      {transaction.gender}
                    </td>
                    <td className="transaction-table-data">
                      {transaction.occupation}
                    </td>
                    <td className="transaction-table-data">
                      {transaction.SSN}
                    </td>
                    <td
                      className="transaction-table-data"
                      style={{
                        padding: "0.1rem",
                        textAlign: "center",
                      }}
                    >
                      {/* Open the modal using document.getElementById('ID').showModal() method */}
                      <button
                        key={`modal_button_${index}`}
                        className="btn btn-[white] rounded-none text-[blue]"
                        onClick={() =>
                          document
                            .getElementById(`my_modal_${index}`)
                            .showModal()
                        }
                      >
                        view
                      </button>
                      <dialog
                        key={`modal_dialog_${index}`}
                        id={`my_modal_${index}`}
                        className="modal modal-middle  "
                      >
                        <div className="modal-box text-[orangered] bg-[#141414] mt-2">
                          <h3 className="font-bold text-lg">
                            Name: {transaction.fullName}
                          </h3>
                          <p className="mt-2">gender: {transaction.gender}</p>
                          <p className="mt-2">SSN: {transaction.SSN}</p>
                          <p className="mt-2">
                            occupation: {transaction.occupation}
                          </p>

                          <div className="mt-3 flex flex-col items-center gap-2 max-width-[50rem]">
                            Driver's License
                            {transaction.driversLicense &&
                              transaction.driversLicense.map(
                                (img, imgIndex) => (
                                  <div key={`modal_img_${index}_${imgIndex}`}>
                                    <img
                                      src={img.url}
                                      alt={img}
                                      style={{
                                        width: "20rem",
                                      }}
                                    />
                                  </div>
                                )
                              )}
                          </div>

                          <div className="mt-3 flex gap-2 flex-wrap min-width-[fit-content]">
                            <button
                              onClick={() => rejectKyc(transaction.userId._id)}
                              className="p-2 text-[white] bg-[red] text-[1rem] rounded-md"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => approveKyc(transaction.userId._id)}
                              className="p-2 text-[white] bg-[green] text-[1rem] rounded-md"
                            >
                              Accept
                            </button>
                          </div>

                          <div className="modal-action">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-[white]">
                                ✕
                              </button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* <div className="pending-kyc-page-wrapper">
        <div
          className="top_HistoryBodyS"
          style={{ justifyContent: "space-around" }}
        >
          <span>Gateway | Transaction</span>
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
          <span>Details</span>
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
                style={{
                  height: "95%",
                  background: "none",
                  justifyContent: "space-around",
                }}
                key={items?.investmentId}
                className="history_Data"
              >
                <span>{items?.fullName || "N/A"}</span>
                <span>{items?.gender || "N/A"}</span>
                <span>{items?.occupation || "N/A"}</span>
                <span>{items?.SSN || "N/A"}</span>
                <button
                  onClick={() => approveKyc(items?.userId?._id)}
                  className="view-more-btn"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {approveLoading ? (
                    <BounceLoader size={17} color="red" />
                  ) : (
                    "View Details"
                  )}
                </button>
              </div>
            ))
          )}
        </div>
        <div className="pending-kyc-page-header"></div>
      </div>
      <div className="kyc-pop-up"></div> */}
    </div>
  );
}

export default PendingKyc;
