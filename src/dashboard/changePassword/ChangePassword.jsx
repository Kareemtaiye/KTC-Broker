import React, { useState } from "react";
import "./ChangePassword.css";
import "./ChangePasswordMedia.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { expireSession } from "../../Redux/State";

const ChangePassword = () => {
  const [currentPassword, setcurrentPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const passBody = { currentPassword, NewPassword };
  const userToken = useSelector((state) => state.BTC.user);

  async function changeUserPasword() {
    if (NewPassword !== confirmPassword) {
      setPasswordError(true);
      toast.error("New Passwords does not match");
    } else {
      setPasswordError(false);
      try {
        const response = await axios.post(
          `https://citadel-inv.onrender.com/changePassword/${userToken?.token}`,
          passBody,
          {
            headers: {
              Authorization: `Bearer ${userToken?.token}`,
              "Content-Type": "application/json", // Assuming passBody is JSON
            },
          }
        );

        setLoading(false);
        console.log(response);
        toast.success(response.data.message);
      } catch (err) {
        setLoading(false);
        console.log(err);
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
        }
      }
    }
  }

  console.log(userToken.token);
  return (
    <div className="change-password-container">
      <div className="change-password-body">
        <h2 className="change-password-title">Change Password</h2>
        <div className="change-password-card">
          <div className="change-password-card-body">
            <div className="current-password-container">
              <label>
                Current Password<span style={{ color: "red" }}>*</span>
              </label>
              <input
                onChange={(e) => setcurrentPassword(e.target.value)}
                value={currentPassword}
                type="password"
                placeholder="Current Password"
                className="dashboard-current-password-input"
              />
            </div>
            <div className="new-confirm-password-container">
              <div className="new-password-container">
                <label htmlFor="">
                  New Password<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  style={{ border: passwordError ? "1px solid red" : null }}
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={NewPassword}
                  //   onChange={(e) => setcurrentPassword(e.target.value)}
                  //   value={currentPassword}
                  type="password"
                  placeholder="New Password"
                  className="dashboard-new-password-input"
                />
              </div>
              <div className="confirm-password-container">
                <label htmlFor="">
                  Confirm Password<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  style={{ border: passwordError ? "1px solid red" : null }}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  type="password"
                  placeholder="Confirm Password"
                  className="dashboard-confirm-password-input"
                />
              </div>
            </div>
            <div className="change-password-btn-container">
              <button
                style={{ background: loading ? "grey" : null }}
                disabled={loading}
                // className="change-password-submit-btn changeBtn"
                className="changeBtn"
                onClick={changeUserPasword}
              >
                {loading ? <ClipLoader size={20} color="white" /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
