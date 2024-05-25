import { useEffect, useState } from "react";
import "./Dashboard.css";
import "./DashboardMedia.css";
import {
  CryptoCurrencyMarket,
  EconomicCalendar,
  StockMarket,
  SymbolOverview,
} from "react-ts-tradingview-widget";
import CheckVerifications from "./CheckVerifications";
import { FaCoins, FaWallet } from "react-icons/fa6";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { expireSession } from "../../Redux/State";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);
  const [lastestTransaction, setlastestTransaction] = useState({});
  const { id } = useSelector((state) => state.BTC.user);

  async function getTotalDeposit() {
    try {
      const response = await axios.get(
        `https://citadel-inv.onrender.com/getTotalDeposit/${id}`
      );
      console.log(response);
      setTotalDeposit(response?.data?.totalDeposit);
    } catch (err) {
      console.log(err);
      if (err?.message === " Network Error") {
        toast.error("Bad Internet Connection");
      } else if (err?.response?.data?.message === "jwt expired") {
        nav("/login");
        dispatch(expireSession(true));
      } else {
        toast.error(err?.response?.data?.message);
      }
    }
  }

  async function getTotalWithdrawal() {
    try {
      const response = await axios.get(
        `https://citadel-inv.onrender.com/getTotalWithdraw/${id}`
      );
      console.log(response);
      setTotalWithdrawal(response?.data?.totalWithdraw);
    } catch (err) {
      console.log(err);
      if (err?.message === " Network Error") {
        toast.error("Bad Internet Connection");
      } else if (err?.response?.data?.message === "jwt expired") {
        nav("/login");
        dispatch(expireSession(true));
      } else {
        toast.error(err?.response?.data?.message);
      }
    }
  }

  async function getLatestTransaction() {
    try {
      const response = await axios.get(
        `https://citadel-inv.onrender.com/getLatestTransaction/${id}`
      );
      console.log(response);
      setlastestTransaction(response.data?.data);
      console.log(lastestTransaction);
    } catch (err) {
      console.log(err);
      if (err?.message === " Network Error") {
        toast.error("Bad Internet Connection");
      } else if (err?.response?.data?.message === "jwt expired") {
        nav("/login");
        dispatch(expireSession(true));
      } else {
        toast.error(err?.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.livecoinwatch.com/static/lcw-widget.js";
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Run only once on component mount

  useEffect(() => {
    getTotalDeposit();
    getTotalWithdrawal();
    getLatestTransaction();
  }, []);

  return (
    <div className="dashboard-content-container">
      <div className="dashboard-content-body">
        <CheckVerifications />
        <>
          <div className="dashboard-coin-card-container">
            <div className="dashboard-coin-card-body">
              <div className="dashboard-coin-card-holder">
                <div className="dashboard-coin-card-holder-up">
                  <div className="dashboard-coin-card-up-left">
                    <div
                      className="livecoinwatch-widget-1"
                      lcw-coin="BTC"
                      lcw-base="USD"
                      lcw-secondary="BTC"
                      lcw-period="d"
                      lcw-color-tx="#ffffff"
                      lcw-color-pr="#58c7c5"
                      lcw-color-bg="#1f2434"
                      lcw-border-w="0"
                    ></div>
                  </div>
                  <div className="dashboard-coin-card-up-right">
                    <script
                      defer
                      src="https://www.livecoinwatch.com/static/lcw-widget.js"
                    ></script>
                    <div
                      className="livecoinwatch-widget-1"
                      lcw-coin="ETH"
                      lcw-base="USD"
                      lcw-secondary="BTC"
                      lcw-period="d"
                      lcw-color-tx="#ffffff"
                      lcw-color-pr="#58c7c5"
                      lcw-color-bg="#1f2434"
                      lcw-border-w="0"
                    ></div>
                  </div>
                </div>
                <div className="dashboard-coin-card-holder-down">
                  <div className="dashboard-coin-card-down-left">
                    <script
                      defer
                      src="https://www.livecoinwatch.com/static/lcw-widget.js"
                    ></script>
                    <div
                      className="livecoinwatch-widget-1"
                      lcw-coin="USDT"
                      lcw-base="USD"
                      lcw-secondary="BTC"
                      lcw-period="d"
                      lcw-color-tx="#ffffff"
                      lcw-color-pr="#58c7c5"
                      lcw-color-bg="#1f2434"
                      lcw-border-w="0"
                    ></div>
                  </div>
                  <div className="dashboard-coin-card-down-right">
                    <script
                      defer
                      src="https://www.livecoinwatch.com/static/lcw-widget.js"
                    ></script>
                    <div
                      className="livecoinwatch-widget-1"
                      lcw-coin="SOL"
                      lcw-base="USD"
                      lcw-secondary="BTC"
                      lcw-period="d"
                      lcw-color-tx="#ffffff"
                      lcw-color-pr="#58c7c5"
                      lcw-color-bg="#1f2434"
                      lcw-border-w="0"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-coin-balance-body">
              <SymbolOverview width="100%" colorTheme="dark" />
            </div>
          </div>
          <div className="dashboard-balance-and-profit-holder">
            <div className="dashboard-coin-balance-card-up">
              <div className="dashboard-total-deposit-wrapper">
                <div className="dashboard-total-deposit-wrapper-up-wrapper">
                  <span className="dashboard-total-deposit-wrapper-up-wrapper-icon-holder">
                    <FaWallet className="dashboard-total-deposit-wrapper-up-wrapper-icon" />
                  </span>
                  <div className="dashboard-total-deposit-wrapper-up-wrapper-title">
                    <h3 className="dashboard-total-deposit-wrapper-up-wrapper-title-h3">
                      Total Deposit Balance
                    </h3>
                    <h2 className="dashboard-total-deposit-wrapper-up-wrapper-title-amount">
                      {totalDeposit || "N/A"} USD
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-coin-balance-card-down">
              <div className="dashboard-total-deposit-wrapper">
                <div className="dashboard-total-deposit-wrapper-down-wrapper">
                  <span className="dashboard-total-deposit-wrapper-down-wrapper-icon-holder">
                    <FaCoins className="dashboard-total-deposit-wrapper-down-wrapper-icon" />
                  </span>
                  <div className="dashboard-total-deposit-wrapper-down-wrapper-title">
                    <h3 className="dashboard-total-deposit-wrapper-down-wrapper-title-h3">
                      Total Withdraw
                    </h3>
                    <h2 className="dashboard-total-deposit-wrapper-down-wrapper-title-amount">
                      {totalWithdrawal || "N/A"} USD
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profit-calculator-container">
            <div className="profit-calculator-body">
              <div className="profit-calculator-left-card">
                <div className="profit-calculator-select-container">
                  <label htmlFor="plans" className="select-investment-label">
                    Select Investment
                  </label>
                  <div
                    className="select-wrapper"
                    style={{
                      backgroundColor: "darkblue",
                      color: "white",
                      cursor: "pointer",
                      // padding: "0.5rem",
                    }}
                  >
                    <div
                      name=""
                      id=""
                      className="select-investment-plan-select"
                      multiple
                    >
                      <p value="starter-plan">
                        <a href="#userDashboard/investment">Basic plan</a>
                      </p>
                      <p value="silver-plan">
                        <a href="#userDashboard/investment">Pro Plan</a>
                      </p>
                      <p value="gold-plan">
                        <a href="#userDashboard/investment">Premium Plan</a>
                      </p>
                      <p value="vip-plan">
                        <a href="#userDashboard/investment">Retirement Plan</a>
                      </p>

                      {/* <option value="vip-platnium-plan">
                        VIP Platinum Plan
                      </option> */}
                    </div>
                  </div>
                  <br />
                  <br />
                  {/* <button className="profit-calculator-btn">
                    Calculate Profits
                  </button> */}
                </div>
              </div>
              {/* <div className="profit-calculator-right-card">
                <div className="profit-calculator-right-body">
                  <span className="profit-calculator-right-body-span">
                    Your profit will display here
                  </span>
                </div>
              </div> */}
            </div>
          </div>
          <div className="dashboard-recent-transaction-investment-container">
            {/* <div className="dashboard-recent-transaction-card">
              <div className="dashboard-recent-transaction-body">
                <h5 className="dashboard-recent-transaction-card-title">
                  Recent Transactions
                </h5>
                <div className="recent-transaction-ul-wrapper">
                  {lastestTransaction.length === 0}
                  <span
                    style={{ fontSize: "30px" }}
                    className="recent-transaction-ul-span"
                  >
                    Transactions
                  </span>
                  

                  <ul></ul>
                </div>
              </div>
            </div> */}
            <div className="dashboard-recent-investment">
              <div className="dashboard-recent-investment-body">
                <h5 className="dashboard-recent-investment-card-title">
                  Latest Transaction
                </h5>
              </div>

              {!loading ? (
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <span>Please wait...</span>
                  <BounceLoader size={120} color="orangered" />
                </div>
              ) : lastestTransaction?.length === null ? (
                <p
                  style={{
                    color: "orangered",
                    fontSize: "1.2rem",
                    textAlign: "center",
                  }}
                >
                  No transaction yet
                </p>
              ) : (
                <div className="table-container">
                  <table className="transaction-table">
                    <thead className="transaction-table-head">
                      <tr className="transaction-table-row">
                        <th className="transaction-table-th">Id</th>
                        <th className="transaction-table-th">Amount</th>
                        <th className="transaction-table-th">Date</th>
                        <th className="transaction-table-th">Type</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="transaction-table-row">
                        <td className="transaction-table-data">
                          {lastestTransaction?.ID
                            ? lastestTransaction.ID
                            : "N/A"}
                        </td>
                        <td className="transaction-table-data">
                          {lastestTransaction?.amount}
                        </td>
                        <td className="transaction-table-data">
                          {new Date(
                            lastestTransaction?.timestamp
                          ).toLocaleDateString()}
                        </td>
                        <td className="transaction-table-data">
                          {lastestTransaction?.type}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          <div className="dashboard-stock-market-widget-wrapper">
            <div className="dashboard-stock-market-widget-div">
              <StockMarket width="100%" colorTheme="dark" />
            </div>
            <div className="dashboard-stock-market-widget-div">
              <EconomicCalendar width="100%" colorTheme="dark" />
            </div>
            <div className="dashboard-stock-market-widget-div">
              <CryptoCurrencyMarket width="100%" colorTheme="dark" />
            </div>
          </div>
        </>
        {/*  }  */}
      </div>
    </div>
  );
};

export default Dashboard;
