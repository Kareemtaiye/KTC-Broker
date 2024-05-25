import React, { useEffect, useState } from "react";
import "./Investments.css";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import MyInv from "./MyInv";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { expireSession } from "../../Redux/State";

function Investments() {
  const [confirmInvest, setConfirmInvest] = useState(false);
  const [myInv, setMyInv] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [amount, setAmount] = useState();
  const [scheduleType, setScheduleType] = useState("now");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [scheduleTime, setscheduleTime] = useState("");
  const [wallet, setWallet] = useState("accountBalance");
  const userToken = localStorage.getItem("token");
  const parsedToken = JSON.parse(userToken);
  const loginInfo = localStorage.getItem("loginInfo");
  const parsedInfo = JSON.parse(loginInfo);
  const [investType, setInvestType] = useState("");
  const [loading, setLoading] = useState(false);
  const [calProfit, setCalProfit] = useState(false);

  const plans = [
    {
      plan: "Basic",
      param: "basicPlan",
      minAmount: "2,000.00",
      maxAmount: "9,999.00",
      return: "25.00",
      days: 30,
    },
    {
      plan: "Pro",
      param: "proPlan",
      minAmount: "10,000.00",
      maxAmount: "49,999.00",
      return: "35.00",
      days: 30,
    },
    {
      plan: "Premium",
      param: "premiumPlan",
      minAmount: "50,000.00",
      maxAmount: "99,999.00",
      return: "50.00",
      days: 30,
    },
    {
      plan: "Retirement",
      param: "retirementPlan",
      minAmount: "100000.00",
      maxAmount: "unlimited",
      return: "50.00",
      days: 100,
    },
  ];
  function PreInvestFunction(type) {
    setConfirmInvest(true);
    setInvestType(type);
  }
  const selectedPlan = plans.filter((plan) => plan.param === investType)[0];

  const config = {
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
  };
  console.log(selectedPlan);
  async function proceedInvest() {
    setLoading(true);
    // e.preventDefault();
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("scheduleType", scheduleType);
    formData.append("wallet", wallet);
    const data = {
      amount,
      scheduleType,
      scheduleTime: `${date}T${time}`,
      wallet,
    };

    console.log(data);
    try {
      console.log(parsedInfo._id);

      const response = await axios.post(
        ` https://citadel-inv.onrender.com/${investType}/${parsedInfo._id}`,
        data,
        config
      );
      // toast("good");
      console.log(response);
      // setLoading(false);
      toast.success(response?.data?.message);
      setConfirmInvest(false);
    } catch (err) {
      console.log("good");
      // toast(`${err.message}`);
      console.log("toast no day work");
      setLoading(false);
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
    if (!amount) {
      setCalProfit(false);
    } else {
      setCalProfit(true);
    }
  }, [amount]);

  console.log(investType);
  return (
    <>
      {myInv ? (
        <MyInv />
      ) : (
        <div className="Investment_Page">
          <div className="Header_Tab"></div>
          <div className="Investment_Stats">
            <span onClick={() => setMyInv(true)}>My investments</span>
          </div>
          <section className="InvestmentsCard_Wrapper">
            {plans.map((plans) => (
              <div key={plans.plan} className="Investment_Card">
                <div className="TopInvestment_Card">
                  <h1>
                    {plans.return} <span>%</span>
                  </h1>

                  <h1>{plans.plan} Plan</h1>
                </div>

                <div className="investment-card-wrapper-details">
                  <div className="investment-card-sub-details">
                    <p>Min: ${plans.minAmount}</p>
                    <p>
                      Max: {plans.maxAmount === "unlimited" ? "" : "$"}
                      {plans.maxAmount}
                    </p>
                  </div>
                  <div className="BotInvestment_Card">
                    <div>
                      <span>Return {plans.return} %</span>
                    </div>
                    <div>
                      <span>Duration: {plans.days} Days</span>
                    </div>
                    <div>
                      <span>Total: {+plans.return * plans.days} %</span>
                    </div>

                    <article>
                      <button onClick={() => PreInvestFunction(plans.param)}>
                        Invest Now
                      </button>
                    </article>
                  </div>
                </div>
              </div>
            ))}
          </section>
          {confirmInvest ? (
            <div className="ConfirmInvestment_CardBody">
              <section className="ConfirmInvestment_Card">
                <div className="Confirm_Header">
                  <span>
                    Investmet Confirmation for{" "}
                    <span style={{ color: "Gold" }}>
                      {selectedPlan?.plan} Plan
                    </span>
                  </span>
                </div>
                <div className="ConfirmInv_Info">
                  <p>
                    Invest: ${selectedPlan.minAmount} - $
                    {selectedPlan.maxAmount}
                  </p>
                  <span>Interest: {selectedPlan.return}%</span>
                  <span>Per day: {selectedPlan.days} times</span>
                  {calProfit ? (
                    <p>Total Profit: ${amount * selectedPlan.return} </p>
                  ) : null}
                </div>
                <div
                  className={
                    scheduleType === "later"
                      ? "ConfirmInv_Inputs_Later"
                      : "ConfirmInv_Inputs"
                  }
                  // className="ConfirmInv_Inputs"
                >
                  <section
                    className={
                      scheduleType === "later"
                        ? "Confirm_Input_Later"
                        : "Confirm_Input"
                    }
                  >
                    <span>Pay Via</span>
                    <select className="">
                      <option value="">Select one</option>
                      <option value="BTC">BTC</option>
                      <option value="ETHERIEUM">ETHERIEUM</option>
                    </select>
                    {calProfit ? <p>Rate: 1 USD = 1 $</p> : null}
                  </section>
                  <section
                    className={
                      scheduleType === "later"
                        ? "Confirm_Input_Later"
                        : "Confirm_Input"
                    }
                  >
                    <span>Invest Amount</span>
                    <input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className=""
                      type="text"
                    />
                    {calProfit ? (
                      <p>Charge: 0.00. Total amount: {amount} USD</p>
                    ) : null}
                  </section>
                  <section
                    className={
                      scheduleType === "later"
                        ? "Confirm_Input_Later"
                        : "Confirm_Input"
                    }
                  >
                    <span>Auto Schedule invest</span>
                    <select
                      value={scheduleType}
                      onChange={(e) => setScheduleType(e.target.value)}
                      className=""
                    >
                      <option value="now">Invest now</option>
                      {/* <option value="later">Invest later</option> */}
                    </select>
                  </section>
                  <section
                    className={
                      scheduleType === "later"
                        ? "Confirm_Input_Later"
                        : "Confirm_Input"
                    }
                  >
                    <span>Investment Type</span>
                    <select
                      value={wallet}
                      onChange={(e) => setWallet(e.target.value)}
                      className=""
                    >
                      <option value="accountBalance">Account Balance</option>
                      {/* <option value="depositWallet">Deposit Wallet</option>
                      <option value="intrestWallet">Intrest Wallet</option>
                      <option value="referalWallet">Referal Wallet</option> */}
                    </select>
                  </section>
                  {scheduleType === "later" ? (
                    <>
                      <section
                        className={
                          scheduleType === "later"
                            ? "Confirm_Input_Later"
                            : "Confirm_Input"
                        }
                      >
                        <span>Schedule Date</span>
                        <input
                          value={date}
                          type="date"
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </section>
                      <section
                        className={
                          scheduleType === "later"
                            ? "Confirm_Input_Later"
                            : "Confirm_Input"
                        }
                      >
                        <span>Schedule Time</span>
                        <input
                          value={time}
                          type="time"
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </section>
                    </>
                  ) : null}
                </div>
                <div
                  className={
                    scheduleType === "later"
                      ? "ConfirmInv_ActionBtn_Later"
                      : "ConfirmInv_ActionBtn"
                  }
                >
                  <button
                    className={
                      scheduleType === "later"
                        ? "ConfirmClose_Btn_Later"
                        : "ConfirmClose_Btn"
                    }
                    onClick={() => {
                      setConfirmInvest(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className={
                      scheduleType === "later"
                        ? "ConfirmSubmit_Btn_Later"
                        : "ConfirmSubmit_Btn"
                    }
                    onClick={proceedInvest}
                  >
                    {loading ? (
                      <ClipLoader color="white" size={30} />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </section>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default Investments;
