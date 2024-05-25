import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Landing from "./home/Landing";
import Home from "./home/Home";
import Contact from "./contactUs/ContactUs";
import Terms from "./terms/Terms";
import UserMenu from "./dashboard/userMenu/UserMenu";
import About from "./about/About";
import Private from "./components/Private/Private";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// onboarding
import Investments from "./dashboard/Investments/Investments";
import Login from "./onboarding/login/Login";
import ForgetPassword from "./onboarding/forgetPassword/ForgetPassword";
import OneTimePassword from "./onboarding/OTP/One-Time-Password";
import ResetPassword from "./onboarding/resetPassword/ResetPassword";
import Register from "./onboarding/registeration/Register";

// dashboard part
import Dashboard from "./dashboard/userDashboard/Dashboard";
import Deposit from "./dashboard/Deposits/Deposit";
import Withdraw from "./dashboard/withdraw/Withdraw";
import ChangePassword from "./dashboard/changePassword/ChangePassword";
import AssignMoney from "./dashboard/AssignMoney/AssignMoney";
import AssignProfit from "./dashboard/AssignProfit/AssignProfit";
import ScheduleInvestment from "./dashboard/scheduleInvestments/ScheduleInvestment";
import Transaction from "./dashboard/transaction/Transaction";
import Referral from "./dashboard/referral/Referral";
import SupportTicket from "./dashboard/supportTicket/SupportTicket";
import TwoFA from "./dashboard/2FA/TwoFA";
import Profile from "./dashboard/profile/Profile";
import Kyc from "./KYC/Kyc";
import ProfileSettingPage from "./dashboard/profile/ProfileSettingPage";
import PendingKyc from "./dashboard/PendingKyc/PendingKyc";
import PendingTickets from "./dashboard/PendingTickets/PendingTickets";
import UserDetails from "./dashboard/UserDetails/UserDetails";
import DeleteUser from "./dashboard/DeleteUser/DeleteUser";

import ScrollToTop from "./ScrollToTop";

import thePrivate from "./components/thePrivate";

function App() {


  const AdminUser = useSelector((state) => state.BTC.userRes);
  return (
    <>
      <NextUIProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Landing />}>
              <Route path="/" element={<Home />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="/verify/:token" element={<OneTimePassword />} />
            <Route path="/forget_password" element={<ForgetPassword />} />
            
            
              {/* <Route path="/userDashboard/*" element={<Private />}></Route> */}
            <Route element={<thePrivate />}></Route>
            <Route element={<UserMenu />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/investment" element={<Investments />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/assignmoney" element={<AssignMoney />} />
              <Route path="/assignprofit" element={<AssignProfit />} />
              <Route path="/delete-user" element={<DeleteUser />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user-details" element={<UserDetails />} />
              <Route path="/profile-setting" element={<ProfileSettingPage user={AdminUser} />}/>
              <Route path="/kyc" element={<Kyc />} />
              <Route path="/twoFA" element={<TwoFA />} />
              <Route path="/pending-kyc" element={<PendingKyc />} />
              <Route path="/pending-tickets" element={<PendingTickets />} /> 
              <Route path="/referral" element={<Referral />} />
              <Route path="/supportTicket" element={<SupportTicket />} /> 
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/scheduleInvestment" element={<ScheduleInvestment />}/>
            </Route>


          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </NextUIProvider>
    </>
  );
}

export default App;
