import React, { useState } from "react";
import "./Profile.css";
// import {}

import { FaAngleDown } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";

// function HeaderBar() {
//   return (
//     <div className="profile-headbar flex">
//       <div className="profile-setting">
//         <p className="profile-setting-detail">Profile Setting</p>
//       </div>

//       <div className="profile-info-container">
//         {/* dynamically coming from the user */}
//         <span className="profile-info-abbrv">BS</span>

//         <div className="profile-info-content">
//           <p className="profile-info-content-detail">
//             {" "}
//             Bab Seg
//             <FaAngleDown />
//           </p>

//           {/* email from backend */}
//           <p className="profile-email">babatundesegun@gmail.com</p>
//         </div>
//       </div>
//     </div>
//   );
// }

function Profile({ user }) {
  const { name, email } = useSelector((state) => state.BTC.user);
  const { firstName, lastName } = useSelector((state) => state.BTC.userRes);
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  async function LogoutUser() {
    navigate("/");
  }

  const getHeaderText = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/investment":
        return "Investment";
      case "/scheduleInvestment":
        return "Schedule Investment";
      case "/deposit":
        return "Deposit";
      case "/withdraw":
        return "Withdraw";
      case "/transaction":
        return "Transaction";
      case "/referral":
        return "Referral";
      case "/supportTicket":
        return "Support Ticket";
      case "/twoFA":
        return "2 FA";
      case "/change_password":
        return "Change Password";
      case "/assign-profit":
        return "Assign Profit";

      case "/delete-user":
        return "Delete User";
      default:
        return "Dashboard";
    }
  };

  return (
    <>
      <div className="user-dashboard-profile-div">
        <p className="get-header-text">{getHeaderText()}</p>
        <div className="user-dashboard-profile-holder">
          <div
            className="profile-info-container"
            onClick={() => {
              setDropDown(!dropDown);
            }}
          >
            <span className="profile-info-abbrv">
              {firstName?.charAt(0)}
              {lastName?.charAt(0)}
            </span>

            <div className="profile-info-content">
              <p className="profile-info-content-detail">
                {" "}
                {user.userName}
                {dropDown ? <IoIosClose /> : <FaAngleDown />}
              </p>

              {/* <p className="profile-email">{email}</p> */}
            </div>
          </div>
        </div>
        {dropDown ? (
          <div className="profile-dropDown-menu">
            <ul className="profile-dropDown-menu-ul">
              <li
                onClick={() => {
                  nav("/profile-setting");
                  setDropDown(false);
                }}
              >
                Profile Settings
              </li>
              <li
                onClick={() => {
                  nav("/change_password");
                  setDropDown(false);
                }}
              >
                Change Password
              </li>

              <li onClick={LogoutUser}>Logout</li>
            </ul>
          </div>
        ) : null}
      </div>
    </>
    // <section className="profile-section">
    //   {/* Header bar */}
    //   {/* <HeaderBar /> */}
    //   <div className="profile-main-info-container">
    //     <div className="profile-main-content">
    //       {/* render dynamically */}
    //       <h5 className="profile-h5">Baba Vincent</h5>

    //       <div className="profile-main-content-container">
    //         <div className="profile-submain-content">
    //           <p className="profile-sub-detail">
    //             <CiUser />
    //             username{" "}
    //           </p>

    //           {/* render dynamically */}
    //           <p>Vincent</p>
    //         </div>

    //         <div className="profile-submain-content">
    //           <p className="profile-sub-detail">
    //             <CiMail />
    //             email{" "}
    //           </p>

    //           {/* render dynamically */}
    //           <p>testing@gmail.com</p>
    //         </div>

    //         <div className="profile-submain-content">
    //           <p className="profile-sub-detail">
    //             <IoCallOutline />
    //             Mobile{" "}
    //           </p>

    //           {/* render dynamically */}
    //           <p>02929020029</p>
    //         </div>

    //         <div className="profile-submain-content">
    //           <p className="profile-sub-detail">
    //             <BiWorld />
    //             country{" "}
    //           </p>

    //           {/* render dynamically */}
    //           <p>Nigeria</p>
    //         </div>
    //       </div>
    //     </div>

    //     <form className="profile-form">
    //       <div class="profile-form-group ">
    //         <label class="profile-form-label " for="firstname">
    //           First Name
    //         </label>
    //         <input
    //           type="text"
    //           class="profile-form-input"
    //           name="firstname"
    //           placeholder="firstname"
    //           required
    //         />
    //       </div>

    //       <div class="profile-form-group ">
    //         <label class="profile-form-label" for="lastname">
    //           Last Name
    //         </label>
    //         <input
    //           type="text"
    //           class="profile-form-input"
    //           required
    //           placeholder="lastname"
    //         />
    //       </div>

    //       <div class="profile-form-group ">
    //         <label class="profile-form-label" for="lastname">
    //           address
    //         </label>
    //         <input
    //           type="text"
    //           class="profile-form-input"
    //           required
    //           placeholder="address"
    //         />
    //       </div>

    //       <div class="profile-form-group ">
    //         <label class="profile-form-label" for="lastname">
    //           state
    //         </label>
    //         <input
    //           type="text"
    //           class="profile-form-input"
    //           required
    //           placeholder="state"
    //         />
    //       </div>
    //       <div class="profile-form-group ">
    //         <label class="profile-form-label" for="lastname">
    //           zipcode
    //         </label>
    //         <input
    //           type="text"
    //           class="profile-form-input"
    //           required
    //           placeholder="zipcode"
    //         />
    //       </div>

    //       <div class="profile-form-group ">
    //         <label class="profile-form-label" for="lastname">
    //           city
    //         </label>
    //         <input
    //           type="text"
    //           class="profile-form-input"
    //           required
    //           placeholder="city"
    //         />
    //       </div>

    //       <div className="profile-button-container">
    //         <button className="profile-button">submit</button>
    //       </div>
    //     </form>
    //   </div>
    // </section>
  );
}

export default Profile;
