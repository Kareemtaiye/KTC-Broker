import React, { useState } from "react";
import "./ResetPassword.css";
import axios from "axios";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
// import ultimate_logo from '../../assets/ultimate_logo.png'

const ResetPassword = () => {
  const { token } = useParams();
  const nav = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validMessage, setValidMessage] = useState({
    error: "false",
    value: "",
    msg: "",
  });

  const url = `https://citadel-inv.onrender.com/resetPassword/${token}`;

  const data = { newPassword, confirmNewPassword };

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{}|:;"'<>,.?/])[A-Za-z\d!@#$%^&*()_\-+=\[\]{}|:;"'<>,.?/]{8,}$/;

  const ResetPassword = () => {
    if (newPassword === "") {
      setValidMessage({
        error: "true",
        value: "password",
        msg: "Please input your new password",
      });
    } else if (!strongPasswordRegex.test(newPassword)) {
      setValidMessage({
        error: "true",
        value: "passwordError",
        msg: "Password should contain at least one uppercase letter, lowercase letter, digit, special character and should be 8 characters and above",
      });
    } else if (confirmNewPassword === "") {
      setValidMessage({
        error: "true",
        value: "confirmPassword",
        msg: "Please confirm your password",
      });
    } else if (confirmNewPassword !== newPassword) {
      setValidMessage({
        error: "true",
        value: "confirmPasswordError",
        msg: "Password do not match",
      });
    } else {
      setValidMessage("");
      axios
        .put(url, data)
        .then((res) => {
          console.log(res);
          nav("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="resetPasswordMainBody">
      <div className="ResetPasswordCon">
        <section className="ResetPasswordH1Section">
          <img src={""} alt="" />
          <h1 className="ResetPasswordH1">Reset Password</h1>
        </section>
        <div className="inputTextCon">
          <div className="ResetPasswordInputDiv">
            <div
              className={
                validMessage.value === "password" ||
                validMessage.value === "passwordError"
                  ? "resetInstitutePasswordIconDivError"
                  : "resetPasswordInputHolder"
              }
            >
              <input
                className="resetPasswordInput"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className="resetPasswordIcon">
                {showPassword ? (
                  <BiSolidHide
                    className="showPassIcon"
                    onClick={() => {
                      setShowPassword(false);
                    }}
                  />
                ) : (
                  <BiSolidShow
                    className="showPassIcon"
                    onClick={() => {
                      setShowPassword(true);
                    }}
                  />
                )}
              </div>
            </div>
            {validMessage.value === "password" ? (
              <p className="errorParagraph">{validMessage.msg}</p>
            ) : null}
            {validMessage.value === "passwordError" ? (
              <p className="errorParagraph">{validMessage.msg}</p>
            ) : null}
            <div
              className={
                validMessage.value === "confirmPassword" ||
                validMessage.value === "confirmPasswordError"
                  ? "resetInstitutePasswordIconDivError"
                  : "resetPasswordInputHolder"
              }
            >
              <input
                className="resetPasswordInput"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <div className="resetPasswordIcon">
                {showConfirmPassword ? (
                  <BiSolidHide
                    className="showPassIcon"
                    onClick={() => {
                      setShowConfirmPassword(false);
                    }}
                  />
                ) : (
                  <BiSolidShow
                    className="showPassIcon"
                    onClick={() => {
                      setShowConfirmPassword(true);
                    }}
                  />
                )}
              </div>
            </div>
            {validMessage.value === "confirmPassword" ? (
              <p className="errorParagraph">{validMessage.msg}</p>
            ) : null}
            {validMessage.value === "confirmPasswordError" ? (
              <p className="errorParagraph">{validMessage.msg}</p>
            ) : null}
          </div>
        </div>
        <div className="ResetPasswordButton">
          <button className="ResetPasswordButtonSend" onClick={ResetPassword}>
            {"Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
