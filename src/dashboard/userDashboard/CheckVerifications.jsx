import { useNavigate } from "react-router-dom";
import "./CheckVerifications.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IoMdWarning } from "react-icons/io";
import { FaUserLock } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
function CheckVerifications() {
  const [emptyBal, setEmptyBal] = useState(false);
  const { deposit, interest, referal } = useSelector(
    (state) => state.BTC.wallets
  );
  const { kyc, twoFactor } = useSelector((state) => state.BTC.userRes);
  const nav = useNavigate();
  useEffect(() => {
    if (deposit === 0 && referal === 0 && interest === 0) {
      setEmptyBal(true);
    }
  }, []);
  return (
    <div className="checkverification-page">
      {emptyBal ? (
        <div className="verification-boxes">
          <div className="verification-icon">
            <IoMdWarning className="verification-icons verification-icons-1" />;
          </div>
          <div className="verification-text">
            <span>Empty Balance</span>
            <p>
              Your balance is empty, please make{" "}
              <span
                onClick={() => nav("/deposit")}
                style={{ color: "orange", cursor: "pointer" }}
              >
                deposit
              </span>{" "}
              for your next investment
            </p>
          </div>
        </div>
      ) : null}
      {!twoFactor ? (
        <div className="verification-boxes">
          <div className="verification-icon">
            <FaUserLock className="verification-icons verification-icons-2" />;
          </div>
          <div className="verification-text">
            <span>2FA Security</span>
            <p>
              To make your account safer, please enable{" "}
              <span
                onClick={() => nav("/twoFA")}
                style={{ color: "orange", cursor: "pointer" }}
              >
                2FA
              </span>{" "}
              security for more safety measures
            </p>
          </div>
        </div>
      ) : null}
      {!kyc?.verified ? (
        <div className="verification-boxes">
          <div className="verification-icon">
            <FaUserCheck className="verification-icons verification-icons-3" />
          </div>
          <div className="verification-text">
            <span>Kyc Verification</span>
            <p>
              Your account will be limited to most transactions,{" "}
              <span
                onClick={() => nav("/kyc")}
                style={{ color: "orange", cursor: "pointer" }}
              >
                Click here
              </span>{" "}
              to submit your KYC information
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CheckVerifications;
