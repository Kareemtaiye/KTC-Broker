import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import "./DeleteUser.css";
import axios from "axios";
import { expireSession } from "../../Redux/State";
import { useNavigate } from "react-router-dom";

const DeleteUser = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const AdminUser = useSelector((state) => state.BTC.userRes);
  const { token } = useSelector((state) => state.BTC.user);
  const [adminAction, setAdminAction] = useState("delete");
  console.log(AdminUser);

  const [loading, setLoading] = useState(false);
  const [deactivateLoading, setdeactivateLoading] = useState(false);
  async function deleteUser() {
    if (!email.trim()) {
      toast.error("Email field cannot be empty");
    } else {
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("email", email.trim());
        const response = await axios.put(
          `https://citadel-inv.onrender.com/delete`,
          { email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        toast.success(response?.data?.message);
        nav("/delete-user");
        setLoading(false);
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
  }

  async function deactivateUser() {
    if (!email.trim()) {
      toast.error("Email field cannot be empty");
    } else {
      setdeactivateLoading(true);

      try {
        const formData = new FormData();
        formData.append("email", email.trim());
        const response = await axios.put(
          `https://citadel-inv.onrender.com/deacvtivateUser`,
          { email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        toast.success(response?.data?.message);
        nav("/delete-user");
        setdeactivateLoading(false);
      } catch (err) {
        console.log(err);
        setdeactivateLoading(false);
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
  }
  console.log(email);
  return (
    <div className="change-password-container">
      <div className="change-password-body">
        <h2 className="change-password-title" style={{ color: "white" }}>
          Delete or Deactivate User Account
        </h2>
        <div className="change-password-card">
          <div className="change-password-card-body">
            <div className="current-password-container">
              <select
                className="select-admin-decision"
                onChange={(e) => setAdminAction(e.target.value)}
              >
                <option value="delete">Delete User Account</option>
                <option value="deactivate">Deactivate User Account</option>
              </select>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="User email"
                className="dashboard-current-password-input"
              />
            </div>

            <div className="change-password-btn-container">
              {adminAction === "deactivate" ? (
                <button
                  className="change-password-submit-btn"
                  type="submit"
                  style={{
                    background: deactivateLoading ? "grey" : null,
                    cursor: "pointer",
                  }}
                  onClick={deactivateUser}
                  disabled={deactivateLoading}
                >
                  {deactivateLoading ? (
                    <ClipLoader size={20} color="white" />
                  ) : (
                    "Deactivate User Account"
                  )}
                </button>
              ) : (
                <button
                  className="change-password-submit-btn"
                  type="submit"
                  style={{
                    background: loading ? "grey" : null,
                    cursor: "pointer",
                  }}
                  onClick={deleteUser}
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader size={20} color="white" />
                  ) : (
                    "Delete User"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
