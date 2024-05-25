import { useState } from "react";
// import '../changePassword/ChangePassword.css'
import "./AssignMoney.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { expireSession } from "../../Redux/State";

const AssignMoney = () => {
  const [amount, setAmount] = useState(0);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const Adminuser = useSelector((state) => state.BTC.userRes);
  const { token } = useSelector((state) => state.BTC.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  async function assignAmount(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `https://citadel-inv.onrender.com/assignMoney`,
        { userId, amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(Adminuser);
      console.log(response);
      toast.success(response?.data?.message);
      setLoading(false);
      Swal.fire({
        title: "Money Assigned",
        text: response?.data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        timer: "2000",
        showConfirmButton: false,
      });
      nav("/dashboard");
    } catch (err) {
      setLoading(false);
      if (err?.message === "Network Error") {
        Swal.fire({
          title: "Cannot assign profit",
          text: "Please check your internet connection!",
          icon: "error",
          confirmButtonText: "okay",
          timer: "2000",
          showConfirmButton: false,
        });
        setLoading(false);
      } else if (err?.response?.data?.message === "jwt expired") {
        dispatch(expireSession(true));
        nav("/login");
      } else {
        Swal.fire({
          title: "Error",
          text: "",
          icon: "error",
          confirmButtonText: "Okay",
          timer: "2000",
          showConfirmButton: false,
        });
      }
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  }

  return (
    <div className="change-password-container">
      <div className="change-password-body">
        <h2 className="change-password-title" style={{ color: "white" }}>
          Send Money
        </h2>
        <div className="change-password-card">
          <form onSubmit={assignAmount} className="change-password-card-body">
            {/* <div className='current-password-container'>
                            <label>Current Password<span style={{color: 'red'}}>*</span></label>
                            <input type="text" placeholder='Current Password' className='dashboard-current-password-input'/>
                        </div> */}
            <div className="new-confirm-password-container">
              <div className="new-password-container">
                <label htmlFor="">
                  User Id<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  onChange={(e) => setUserId(e.target.value)}
                  value={userId}
                  type="text"
                  placeholder="User Id"
                  className="dashboard-new-password-input"
                />
              </div>
              <div className="confirm-password-container">
                <label htmlFor="">
                  Amount<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  type="text"
                  placeholder="Amount"
                  className="dashboard-confirm-password-input"
                />
              </div>
            </div>
            <div className="change-password-btn-container">
              <button
                disabled={loading}
                type="submit"
                style={{
                  cursor: "pointer",
                  background: loading ? "grey" : null,
                }}
                className="change-password-submit-btn"
              >
                {loading ? <ClipLoader size={20} color="white" /> : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignMoney;
