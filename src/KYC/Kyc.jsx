import axios from "axios";
import "./Kyc.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Kyc() {
  const navigate = useNavigate();
  const { id, token } = useSelector((state) => state.BTC.user);
  console.log(token);

  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [gender, setgender] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [SSN, setSSN] = useState("");
  const [occupation, setoccupation] = useState("");
  const [billingAddress, setbillingAddress] = useState("");
  const [driversLicenseFront, setdriversLicenseFront] = useState(null);
  const [driversLicenseBack, setdriversLicenseBack] = useState(null);
  const data = {
    fullName,
    gender,
    dateOfBirth,
    SSN,
    occupation,
    billingAddress,
    driversLicense: [driversLicenseFront, driversLicenseBack],
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    verifyKyc();
  };

  async function verifyKyc() {
    setLoading(true);

    try {
      console.log(token);
      const response = await axios.post(
        `https://citadel-inv.onrender.com/kycVerification/${token}`,
        data
      );
      console.log(response);
      // console.log(response);
      setLoading(false);

      Swal.fire({
        title: "KYC form submited",
        text: response?.data?.message,
        icon: "success",
        confirmButtonText: "Okay",
        timer: "5000",
        showConfirmButton: false,
      });

      // toast.success("Kyc submitted successfully, pls wait for admin approval");
      navigate("/userDashboard/investment");
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.log(err);
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSumbit}>
      <div className="kyc-page-main-container">
        <div className="kyc-page">
          <label className="kyc-page-label">Full Name</label>
          <input
            required
            onChange={(e) => setFullName(e.target.value)}
            className="kyc-page-input"
            type="text"
          />
        </div>

        <div className="kyc-page">
          <label className="kyc-page-label">Drivers License </label>

          <div className="kyc-attached-input-container">
            <input
              type="file"
              onChange={(e) => setdriversLicenseFront(e.target.files[0])}
              className="kyc-choose-file"
              placeholder="No file chosen"
              required
            />
          </div>

          <p className="kyc-attached">Supported mimes: jpg,jpeg,png,pdf,doc</p>
        </div>

        <div className="kyc-page">
          <label className="kyc-page-label">Driver License (back) </label>

          <div className="kyc-attached-input-container">
            <input
              required
              onChange={(e) => setdriversLicenseBack(e.target.files[0])}
              type="file"
              className="kyc-choose-file"
              placeholder="No file chosen"
            />
          </div>

          <p className="kyc-attached">Supported mimes: jpg,jpeg,png,pdf,doc</p>
        </div>

        <div className="kyc-page">
          <label className="kyc-page-label">Gender</label>
          <select
            onChange={(e) => setgender(e.target.value)}
            value={gender}
            name="priority"
            className="kyc-page-select"
            style={{
              backgroundColor: "darkblue",
            }}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="kyc-page">
          <label className="kyc-page-label">Date of birth</label>
          <input
            onChange={(e) => setdateOfBirth(e.target.value)}
            value={dateOfBirth}
            className="kyc-page-input"
            type="date"
            required
          />
        </div>

        <div className="kyc-page">
          <label className="kyc-page-label">SSN</label>
          <input
            onChange={(e) => setSSN(e.target.value)}
            value={SSN}
            className="kyc-page-input"
            type="text"
            required
          />
        </div>

        <div className="kyc-page">
          <label className="kyc-page-label">occupation</label>
          <input
            onChange={(e) => setoccupation(e.target.value)}
            value={occupation}
            className="kyc-page-input"
            type="text"
            required
          />
        </div>

        <div className="kyc-page">
          <label className="kyc-page-label">billing address</label>
          <input
            onChange={(e) => setbillingAddress(e.target.value)}
            value={billingAddress}
            className="kyc-page-input"
            type="text"
            required
          />
        </div>

        <div className="kyc-button-container">
          <button className="kyc-button">
            {loading ? <ClipLoader size={22} color="white" /> : "submit"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Kyc;
