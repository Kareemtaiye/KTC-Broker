import React from "react";
import "./ProfileSettingPage.css";
// import {}

import { FaAngleDown } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { userResData } from "../../Redux/State";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
// import { toast } from "react-toastify";

function ProfileSettingPage({ user }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.BTC.user);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    zipCode: "",
    address: "",
    state: "",
  });

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const userId = user._id;
  console.log(user);

  console.log(userId);

  const [loading, setLoading] = useState(false);

  const { firstName, lastName, city, zipCode, address, state } = formData;

  const updateUser = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `https://citadel-inv.onrender.com/updateUser/${userId}`,
        formData,
        config
      );
      dispatch(userResData(response?.data?.data));
      // console.log(response);
      toast.success(response.data?.message);
    } catch (err) {
      console.log(err);
      toast.error(err);
    } finally {
      setLoading(false);
      setFormData({
        firstName: "",
        lastName: "",
        city: "",
        zipCode: "",
        address: "",
        state: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };
  const onMutate = (e) => {
    // Text/Booleans /NUmber

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="profile-section">
      {/* Header bar */}
      {/* <HeaderBar /> */}
      <div className="profile-main-info-container">
        <div className="profile-main-content">
          {/* render dynamically */}
          {/* <h5 className="profile-h5">{user.email}</h5> */}
          {/* <p>{user.email}</p> */}

          <div className="profile-main-content-container">
            <div className="profile-submain-content">
              <p className="profile-sub-detail">
                <CiUser /> name
              </p>

              {/* render dynamically */}
              <p>{user.userName}</p>
            </div>

            {/* <div className="profile-submain-content">
              <p className="profile-sub-detail">
                <CiMail />
                email{" "}
              </p>

            </div> */}
            {/* render dynamically */}

            <div className="profile-submain-content">
              <p className="profile-sub-detail">
                <IoCallOutline />
                Mobile{" "}
              </p>

              {/* render dynamically */}
              <p>{user.mobile}</p>
            </div>

            <div className="profile-submain-content">
              <p className="profile-sub-detail">
                <BiWorld />
                city{" "}
              </p>

              {/* render dynamically */}
              <p>{user.city}</p>
            </div>
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div class="profile-form-group ">
            <label class="profile-form-label " for="firstname">
              First Name
            </label>
            <input
              onChange={onMutate}
              value={firstName}
              type="text"
              class="profile-form-input"
              name="firstName"
              placeholder="firstname"
              required
            />
          </div>

          <div class="profile-form-group ">
            <label class="profile-form-label" for="lastname">
              Last Name
            </label>
            <input
              onChange={onMutate}
              value={lastName}
              type="text"
              class="profile-form-input"
              required
              placeholder="lastname"
              name="lastName"
            />
          </div>

          <div class="profile-form-group ">
            <label class="profile-form-label" for="lastname">
              address
            </label>
            <input
              onChange={onMutate}
              value={address}
              type="text"
              class="profile-form-input"
              required
              name="address"
              placeholder="address"
            />
          </div>

          <div class="profile-form-group ">
            <label class="profile-form-label" for="lastname">
              state
            </label>
            <input
              onChange={onMutate}
              value={state}
              type="text"
              class="profile-form-input"
              required
              name="state"
              placeholder="state"
            />
          </div>
          <div class="profile-form-group ">
            <label class="profile-form-label" for="lastname">
              zip code
            </label>
            <input
              onChange={onMutate}
              value={zipCode}
              type="text"
              class="profile-form-input"
              name="zipCode"
              required
              placeholder="zipcode"
            />
          </div>

          <div class="profile-form-group ">
            <label class="profile-form-label" for="lastname">
              city
            </label>
            <input
              onChange={onMutate}
              value={city}
              type="text"
              class="profile-form-input"
              required
              placeholder="city"
              name="city"
            />
          </div>

          <div className="profile-button-container">
            <button className="profile-button">
              {loading ? <ClipLoader color="white" size={30} /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
      //{" "}
    </section>
  );
}

export default ProfileSettingPage;
