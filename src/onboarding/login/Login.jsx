import { useEffect, useState } from "react";
import "./Login.css";
import "./LoginRes.css";
import { useNavigate, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import axios from "axios";
import { toast } from "react-toastify";
// import citadelLogo from "/CITADEL GOLD LOGOmain.png";
// import citadelLogo from "../../assets/image/citadelLogo.png";
import citadelLogo from "../../assets/citadel2.png";
// import bulb from "../../assets/bulb with image on.png";
import { useDispatch, useSelector } from "react-redux";
import {
  userResData,
  userStoreData,
  getWalletDetails,
  getReferal,
  checkVerification,
  expireSession,
} from "../../Redux/State";

import visibilityIcon from "../../assets/svg/visibilityIcon.svg";
import Swal from "sweetalert2";

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [nextPhase, setNextPhase] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailOrUser, setemailOrUser] = useState("");
  const [password, setpassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { expToken } = useSelector((state) => state.BTC);

  const loginUser = async (e) => {
    e.preventDefault();
    if (!emailOrUser.trim()) {
      setInputError(true);
      setLoading(false);
      toast.error("Your username/email field cannot be empty");
    } else {
      setInputError(false);
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("emailOrUserName", emailOrUser);
        formData.append("password", password);

        const response = await axios.post(
          "https://citadel-inv.onrender.com/login",
          { emailOrUserName: emailOrUser, password: password }
        );
        console.log(response);

        // if (!response.ok) throw new Error(`${data.message} (${res.status})`);
        dispatch(userResData(response?.data?.data));
        dispatch(
          getWalletDetails({
            deposit: response?.data?.data?.depositWallet,
            interest: response?.data?.data?.referalWallet,
            referal: response?.data?.data?.intrestWallet,
          })
        );
        dispatch(
          userStoreData({
            name: response?.data?.data?.firstName,
            email: response?.data?.data?.email,
            id: response?.data?.data?._id,
            token: response?.data?.token,
            login: true,
            admin: response?.data?.data?.isAdmin,
          })
        );
        dispatch(
          checkVerification({
            kyc: response?.data?.data?.kyc?.verified,
            twoFactor: response?.data?.data?.twoFactor,
          })
        );
        dispatch(getReferal(response?.data?.data?.referralLink));
        // console.log("Got saved to redux", userInfo);
        console.log(response);
        toast.success(response?.data?.message);
        localStorage.setItem("loginInfo", JSON.stringify(response?.data?.data));
        localStorage.setItem("token", JSON.stringify(response?.data?.token));
        // toast.success("login successfully");
        nav("/dashboard");
      } catch (err) {
        toast.error(err);
        setLoading(false);
        console.log(err);

        if (err?.message === " Network Error") {
          toast.error("Bad Internet Connection");
        } else {
          toast.error(err?.response?.data?.message);
        }
      }
    }
  };

  useEffect(() => {
    if (expToken) {
      toast.error("Your session has expired, pls log in");
      Swal.fire({
        title: "Token Error",
        text: "Your session has expired, pls log in",
        icon: "error",
        confirmButtonText: "okay",
        timer: "2000",
        showConfirmButton: false,
      });
      setTimeout(() => {
        dispatch(expireSession(false));
      }, 300);
    }
    // alert(expToken);
  }, [expToken]);

  return (
    <div className="Login_Page">
      <div className="animation-div">
        {/* <img
          src={bulb}
          alt="animation-img citadel"
          className="animation-image"
        /> */}
      </div>
      <div className="Login_PageWrapper">
        <div className="LoginCard">
          <form onSubmit={loginUser} className="LoginInput_Wrapper">
            <div className="Login_LogoPart">
              <Link to={"/"}>
                <img
                  src={citadelLogo}
                  height={120}
                  alt="citadelLogo"
                  className="Login_LogoPart_Img"
                />
              </Link>
            </div>
            <div className="LoginForm_Header">
              <span>Log in to Account</span>
            </div>
            {/* <div> */}
            <div className="Login_InputsParts">
              <div className="Login_Inputs_User_Email">
                <article>
                  <span
                    style={{
                      background: "#c48742",
                    }}
                  >
                    Username or Email
                  </span>
                </article>
                <input
                  onChange={(e) => setemailOrUser(e.target.value)}
                  type="text"
                  placeholder="Username or Email"
                  className="login-input-for-input"
                />
                <i></i>
              </div>
              <div className="Login_Inputs">
                <span
                  className={isFocused ? "login-span-focused" : "login-span"}
                >
                  Password
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  // value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  className="login-input-for-input"
                />
                <img
                  src={visibilityIcon}
                  alt="showPassword"
                  className="showPassword"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              </div>
            </div>
            <div className="Login_Buttons">
              <button
                style={{ color: "white" }}
                type="submit"
                onClick={() => {
                  setTimeout(() => {
                    setNextPhase(true);
                  }, 2000);
                  setLoading(true);
                }}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>{" "}
                {loading ? (
                  <ClipLoader
                    id="clipLoader"
                    display="block"
                    position="absolute"
                    top="4px"
                    left="4px"
                    color="#c48742"
                  />
                ) : (
                  "Submit"
                )}
              </button>
              <div className="Login_Route">
                <span className="span-color">Already have an account? </span>
                <span
                  onClick={() => nav("/register")}
                  style={{
                    color: "purple",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Sign up
                </span>
              </div>
              <span
                onClick={() => nav("/forget_password")}
                className="Forgot_Span span-color"
                style={{
                  color: "purple",
                  // textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                Forgot Password?
              </span>
            </div>
            {/* </div> */}
          </form>
        </div>
      </div>
    </div>
  );

  // return (
  //   <>
  //     <div class="login-box">
  //       <h2>Login</h2>
  //       <form>
  //         <div class="user-box">
  //           <input type="text" name="" required="" />
  //           <label>Username</label>
  //         </div>
  //         <div class="user-box">
  //           <input type="password" name="" required="" />
  //           <label>Password</label>
  //         </div>
  //         <a href="#">
  //           <span></span>
  //           <span></span>
  //           <span></span>
  //           <span></span>
  //           Submit
  //         </a>
  //       </form>
  //     </div>
  //   </>
  // );
};

export default Login;
