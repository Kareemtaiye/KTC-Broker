import React, { useEffect, useRef, useState } from "react";
import "./Register.css";
import "./RegisterRes.css";
import { useNavigate, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";
import Country from "../signUp/Country";

import { IoIosArrowRoundBack } from "react-icons/io";
import visibilityIcon from "../../assets/svg/visibilityIcon.svg";

// import citadelLogo from "../../../public/CITADEL GOLD LOGOmain.png";
// import citadelLogo from "../../assets/image/citadelLogo.png";
import citadelLogo from "../../assets/citadel2.png";

const Register = () => {
  const nav = useNavigate();
  // const [registrationType, setRgistrationType] = useState("username");
  const [nextPhase, setNextPhase] = useState(false);
  const [nextPhaseLoading, setNextPhaseLoading] = useState(false);
  const [errorType, setErrorType] = useState("");
  const [inputError, setInputError] = useState(false);
  const [input2Error, setInput2Error] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const savedInputs = localStorage.getItem("userInfo");
  const saveInputParsed = JSON.parse(savedInputs) ?? {};
  // console.log(saveInputParsed);
  const [loading, setLoading] = useState(false);
  const [userName, setUsername] = useState(
    errorType ? saveInputParsed.userName : ""
  );
  const [email, setemail] = useState(errorType ? saveInputParsed.email : "");
  const [mobile, setmobile] = useState(errorType ? saveInputParsed.mobile : 0);
  const [country, setCountry] = useState(
    errorType ? saveInputParsed.country : ""
  );
  const [password, setpassword] = useState(
    errorType ? saveInputParsed.password : ""
  );
  const [confirmPassword, setconfirmPassword] = useState(
    errorType ? saveInputParsed.confirmPassword : ""
  );
  const [firstName, setfirstName] = useState(
    errorType ? saveInputParsed.firstName : ""
  );
  const [lastName, setlastName] = useState(
    errorType ? saveInputParsed.lastName : ""
  );
  const [zipCode, setzipCode] = useState(
    errorType ? saveInputParsed.zipCode : ""
  );
  const [address, setaddress] = useState(
    errorType ? saveInputParsed.address : ""
  );
  const [city, setcity] = useState(errorType ? saveInputParsed.city : "");
  const inputRef = useRef(null);

  const countries = Country();

  const goToPhaseTwo = () => {
    if (!userName.trim()) {
      setInputError(true);
      setNextPhase(false);
      setErrorType("username");
      toast.error("Your username field cannot be empty");
    } else if (!email.trim()) {
      setInputError(true);
      setNextPhase(false);
      setErrorType("email");
      toast.error("Your email field cannot be empty");
    } else if (!country.trim()) {
      toast.error("Please select your country");
      setInputError(true);
      setNextPhase(false);
      setErrorType("country");
    } else if (!mobile) {
      toast.error("Your mobile field cannot be empty");
      setInputError(true);
      setNextPhase(false);
      setErrorType("mobile");
    } else if (!password.trim()) {
      toast.error("Your password field cannot be empty");
      setInputError(true);
      setNextPhase(false);
      setErrorType("password");
    } else if (!confirmPassword.trim()) {
      toast.error("Your confirm passord field cannot be empty");
      setInputError(true);
      setNextPhase(false);
      setErrorType("confirmpassword");
    } else if (password.trim() !== confirmPassword.trim()) {
      toast.error("Passwords does not match");
      setErrorType("password");
    } else {
      setErrorType("");
      setTimeout(() => {
        setInputError(false);
        setNextPhase(true);
      }, 2000);
      setNextPhaseLoading(true);
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!firstName.trim()) {
      setInput2Error(true);
      toast.error("Your first name field cannot be empty");
    } else if (!lastName.trim()) {
      setInput2Error(true);
      toast.error("Your last name field cannot be empty");
    } else if (!zipCode.trim()) {
      setInput2Error(true);
      toast.error("Your zipcode field cannot be empty");
    } else if (!city.trim()) {
      setInput2Error(true);

      toast.error("Your city field cannot be empty");
    } else if (!address.trim()) {
      setInput2Error(true);
      toast.error("Your address field cannot be empty");
    } else {
      setInput2Error(false);
      setLoading(true);
      const dataObj = {
        userName,
        email,
        password,
        confirmPassword,
        mobile,
        country,
        firstName,
        lastName,
        address,
        zipCode,
        city,
      };
      const data = localStorage.setItem("userInfo", JSON.stringify(dataObj));
      console.log(data);
      setErrorType("");
      try {
        const formData = new FormData();
        formData.append("userName", userName.trim());
        formData.append("email", email.trim());
        formData.append("password", password.trim());
        formData.append("mobile", mobile.trim());
        formData.append("firstName", firstName.trim());
        formData.append("lastName", lastName.trim());
        formData.append("address", address.trim());
        formData.append("zipCode", zipCode.trim());
        formData.append("city", city.trim());
        formData.append("profilePicture", "");
        const response = await axios.post(
          "https://citadel-inv.onrender.com/registration",
          formData
        );
        console.log(response);
        toast.success(response?.data?.message);
        setLoading(false);
        nav(`/verify/${response?.data?.token}`);
        const savedEmail = localStorage.setItem(
          "userEmail",
          JSON.stringify(response?.data?.data?.email)
        );
        localStorage.removeItem("userInfo");
        console.log("Email from signup", savedEmail);
      } catch (err) {
        setLoading(false);
        console.log(err);
        if (err?.response?.data?.error?.includes("Password")) {
          setErrorType("password");
          toast.error(err.response.data.error);
          setNextPhase(false);
        } else if (err?.response?.data?.error?.includes("email")) {
          setErrorType("email");
          toast.error(err.response.data.error);
          setNextPhase(false);
        } else if (
          err.response.data.error ===
          `E11000 duplicate key error collection: test.users index: email_1 dup key: { email: ${email.trim()}" }`
        ) {
          toast.error("This username/Email has already been registered");
        } else if (err?.message === "Network Error") {
          toast.error("Bad Internet Connection");
        }
      }
    }
  };

  // console.log({ nextPhase, inputError });
  const code = countries.filter(
    (countryCode) => countryCode.country === country
  );
  // console.log(code);
  useEffect(() => {
    if (nextPhase) {
      setNextPhaseLoading(false);
    }
  }, [nextPhase]);
  useEffect(() => {
    errorType && inputRef.current.focus();
  }, [errorType]);

  useEffect(() => {}, []);

  return (
    <>
      <div className="signUp_Page">
        <div className="signUp_PageWrapper">
          <div className="signUpCard">
            {nextPhase && !inputError ? (
              <form onSubmit={registerUser} className="signUpInput_Wrapper">
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
                <div
                  style={{
                    display: "flex",
                    gap: "2rem",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginTop: "-45px",
                  }}
                  className="signUpForm_Header"
                >
                  <span
                    onClick={() => setNextPhase(false)}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    <IoIosArrowRoundBack />
                    Go Back
                  </span>

                  <span className="step2">Step 2</span>
                </div>
                <div className="SignUp_InputsParts">
                  <div className="SignUp_Inputs">
                    <span>
                      First Name{" "}
                      <span style={{ color: "red", fontSize: "16px" }}>*</span>
                    </span>
                    <input
                      value={firstName}
                      type="text"
                      onChange={(e) => setfirstName(e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div className="SignUp_Inputs">
                    <span>
                      Last Name{" "}
                      <span style={{ color: "red", fontSize: "16px" }}>*</span>
                    </span>
                    <input
                      value={lastName}
                      type="text"
                      onChange={(e) => setlastName(e.target.value)}
                      placeholder="Doe"
                    />
                  </div>
                  <div className="SignUp_Inputs">
                    <span>
                      Address{" "}
                      <span style={{ color: "red", fontSize: "16px" }}>*</span>
                    </span>
                    <input
                      value={address}
                      type="text"
                      onChange={(e) => setaddress(e.target.value)}
                      placeholder="Sky way"
                    />
                  </div>
                  <div className="SignUp_Inputs">
                    <span>
                      Zip Code{" "}
                      <span style={{ color: "red", fontSize: "16px" }}>*</span>
                    </span>
                    <input
                      value={zipCode}
                      type="number"
                      onChange={(e) => setzipCode(e.target.value)}
                    />
                  </div>
                  <div className="SignUp_Inputs">
                    <span>
                      City{" "}
                      <span style={{ color: "red", fontSize: "16px" }}>*</span>
                    </span>
                    <input
                      value={city}
                      type="text"
                      onChange={(e) => setcity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="SignUp_Buttons Login_Buttons">
                  <button
                    disabled={loading}
                    type="submit"
                    onClick={() => setNextPhase(true)}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>{" "}
                    {loading ? (
                      <ClipLoader color="white" size={30} />
                    ) : (
                      " Create Account"
                    )}
                  </button>
                  <div className="Login_Route">
                    <span>Already have an account? </span>
                    <span
                      onClick={() => nav("/login")}
                      style={{
                        color: "purple",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Log in
                    </span>
                  </div>
                </div>
              </form>
            ) : (
              <section className="signUpInput_Wrapper">
                <div className="Login_LogoPart">
                  <img
                    src={citadelLogo}
                    height={120}
                    alt="citadelLogo"
                    className="Login_LogoPart_Img"
                  />
                </div>
                <div className="SignUpForm_Header">
                  <span>Create New Account</span>
                </div>
                <div className="SignUp_InputsParts">
                  <div className="SignUp_Inputs">
                    <span>
                      Username{" "}
                      <span style={{ color: "red", fontSize: "16px" }}>*</span>
                    </span>

                    <input
                      value={userName}
                      ref={errorType === "username" ? inputRef : null}
                      style={{
                        border:
                          errorType === "username" ? "1px solid red" : null,
                      }}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      placeholder="JohnDoe17"
                    />
                  </div>
                  <div className="SignUp_Inputs">
                    <span>
                      Email{" "}
                      <span style={{ color: "red", fontSize: "16px" }}>*</span>
                    </span>

                    <input
                      value={email}
                      ref={errorType === "email" ? inputRef : null}
                      style={{
                        border: errorType === "email" ? "1px solid red" : null,
                      }}
                      onChange={(e) => setemail(e.target.value)}
                      type="text"
                      placeholder="johnDoe@me.com"
                    />
                  </div>
                  <div className="SignUp_Inputs">
                    <span>
                      Country{" "}
                      <span style={{ color: "red", fontSize: "16px" }}>*</span>
                    </span>
                    <select
                      value={country}
                      ref={errorType === "country" ? inputRef : null}
                      style={{
                        border:
                          errorType === "country" ? "1px solid red" : null,
                      }}
                      type="text"
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                      placeholder="Nigeria"
                    >
                      <option value="">Select Your Country</option>
                      {countries.map((country) => (
                        <option key={country.country} value={country.country}>
                          {country.country} ({country.code})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="SignUp_Inputs" id="signup-special">
                    <span>
                      Mobile Number{" "}
                      <span style={{ color: "red", fontSize: "16px" }}>*</span>
                    </span>
                    <h4 className="Country_Code">
                      {!country ? countries[0].code : code[0]?.code}
                    </h4>
                    <input
                      value={mobile}
                      ref={errorType === "mobile" ? inputRef : null}
                      style={{
                        border: errorType === "mobile" ? "1px solid red" : null,
                      }}
                      type="number"
                      onChange={(e) => setmobile(e.target.value)}
                      placeholder="00000000"
                      id="special-input"
                    />
                  </div>
                  <div className="SignUp_Inputs">
                    <span>
                      Password{" "}
                      <span style={{ color: "red", fontSize: "16px" }}>*</span>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      ref={errorType === "password" ? inputRef : null}
                      style={{
                        border:
                          errorType === "password" ? "1px solid red" : null,
                      }}
                      onChange={(e) => setpassword(e.target.value)}
                      placeholder="8 characters, incl 1 uppercase, lowercase and no "
                    />
                    <img
                      src={visibilityIcon}
                      alt="showPassword"
                      className="showPassword"
                      style={{
                        padding: "3%",
                        top: "70%",
                        right: "1%",
                      }}
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    />
                  </div>
                  <div className="SignUp_Inputs">
                    <span>
                      Confirm Password{" "}
                      <span style={{ color: "red", fontSize: "16px" }}>*</span>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      ref={errorType === "confirmpassword" ? inputRef : null}
                      style={{
                        border:
                          errorType === "password" ||
                          errorType === "confirmpassword"
                            ? "1px solid red"
                            : null,
                      }}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                      placeholder="8 characters, incl 1 uppercase, lowercase and no "
                    />
                    <img
                      src={visibilityIcon}
                      alt="showPassword"
                      className="showPassword"
                      style={{
                        padding: "3%",
                        top: "70%",
                        right: "1%",
                      }}
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    />
                  </div>
                </div>
                <div className="SignUp_Buttons">
                  <button onClick={goToPhaseTwo}>
                    {" "}
                    {nextPhaseLoading ? (
                      <ClipLoader color="white" size={30} />
                    ) : (
                      "Next"
                    )}
                  </button>
                  <div className="Login_Route">
                    <span>Already have an account? </span>
                    <span
                      onClick={() => nav("/login")}
                      style={{
                        color: "purple",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Log in
                    </span>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
