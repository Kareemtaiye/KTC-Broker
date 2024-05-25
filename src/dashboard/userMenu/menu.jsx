import React from 'react'

const menu = () => {
  return (

    <div className="user-dashboard-body">
      <div className="user-dashboard-left-container">
        <div className="user-dashboard-left-body">
          <div className="user-dashboard-left-body-logo">
            <img src={citadelLogo} alt="citadelLogo" />
          </div>
          <div className="user-dashboard-acct-balance-container">
            <h1
              style={{
                fontSize: "1.2rem",
              }}
            >
              {" "}
              Account Balance
            </h1>
            <div className="user-dashboard-deposit-wallet-container">
              <div className="user-dashboard-deposit-wallet-wrapper">
                <p>General Balance</p>
                <div className="user-dashboard-deposit-wallet-amount">
                  <h3>{initAccBalance}.00 USD</h3>
                </div>
              </div>
            </div>

            <div className="user-dashboard-deposit-wallet-container">
              <div className="user-dashboard-deposit-wallet-wrapper">
                <p>Deposit Wallet</p>
                <div className="user-dashboard-deposit-wallet-amount">
                  <h3>
                    {walletDetails.deposit}.00 <span>USD</span>
                  </h3>
                </div>
              </div>
            </div>
            <div className="user-dashboard-deposit-wallet-container">
              <div className="user-dashboard-deposit-wallet-wrapper">
                <p>Interest Wallet</p>
                <div className="user-dashboard-deposit-wallet-amount">
                  <h3>
                    {walletDetails.interest}.00 <span>USD</span>
                  </h3>
                </div>
              </div>
            </div>
            <div className="user-dashboard-deposit-wallet-container">
              <div className="user-dashboard-deposit-wallet-wrapper">
                <p>Referral Wallet</p>
                <div className="user-dashboard-deposit-wallet-amount">
                  <h3>
                    {walletDetails.referal}.00 <span>USD</span>
                  </h3>
                </div>
              </div>
            </div>
            <div className="user-dashboard-deposit-withdraw-btn-wrapper">
              <button
                onClick={() => {
                  navigate("/userDashboard/deposit");
                }}
              >
                Deposit
              </button>
              <button
                onClick={() => {
                  navigate("/userDashboard/withdraw");
                }}
              >
                Withdraw
              </button>
            </div>
          </div>
          <div className="user-dashboard-left-body-menu">
            <div
              className={
                dashboard
                  ? "user-dashboard-left-menu-dashboard-active"
                  : "user-dashboard-left-menu-dashboard"
              }
              onClick={() => {
                navigate("/userDashboard/dashboard");
              }}
            >
              <div className="user-dashboard-menu-dashboard-container">
                <div className="user-dashboard-menu-dashboard-container-icon">
                  <MdOutlineDashboard
                    className={
                      dashboard
                        ? "user-dashboard-menu-icon-active"
                        : "user-dashboard-menu-icon"
                    }
                  />
                </div>
                <div className="user-dashboard-menu-dashboard-container-title">
                  <p
                    className={
                      dashboard
                        ? "-active"
                        : "user-dashboard-menu-dashboard-container-titleP"
                    }
                  >
                    Dashboard
                  </p>
                </div>
              </div>
            </div>
            <div
              className={
                investment
                  ? "user-dashboard-left-menu-investment-active"
                  : "user-dashboard-left-menu-investment"
              }
              onClick={() => {
                navigate("/userDashboard/investment");
              }}
            >
              <div className="user-dashboard-menu-investment-container">
                <div className="user-dashboard-menu-investment-container-icon">
                  <CgMenuBoxed
                    className={
                      investment
                        ? "user-dashboard-menu-investment-icon-active"
                        : "user-dashboard-menu-investment-icon"
                    }
                  />
                </div>
                <div className="user-dashboard-menu-investment-container-title">
                  <p
                    className={
                      investment
                        ? "user-dashboard-menu-investment-container-titleP-active"
                        : "user-dashboard-menu-investment-container-titleP"
                    }
                  >
                    Investment
                  </p>
                </div>
              </div>
            </div>
           
            <div
              className={
                deposit
                  ? "user-dashboard-left-menu-deposit-active"
                  : "user-dashboard-left-menu-deposit"
              }
              onClick={() => {
                navigate("/userDashboard/deposit");
              }}
            >
              <div className="user-dashboard-menu-deposit-container">
                <div className="user-dashboard-menu-deposit-container-icon">
                  <IoAlertCircleOutline
                    className={
                      deposit
                        ? "user-dashboard-menu-deposit-icon-active"
                        : "user-dashboard-menu-deposit-icon"
                    }
                  />
                </div>
                <div className="user-dashboard-menu-deposit-container-title">
                  <p
                    className={
                      deposit
                        ? "user-dashboard-menu-deposit-container-titleP-active"
                        : "user-dashboard-menu-deposit-container-titleP"
                    }
                  >
                    Deposit
                  </p>
                </div>
              </div>
            </div>
            <div
              className={
                withdraw
                  ? "user-dashboard-left-menu-withdraw-active"
                  : "user-dashboard-left-menu-withdraw"
              }
              onClick={() => {
                navigate("/userDashboard/withdraw");
              }}
            >
              <div className="user-dashboard-menu-withdraw-container">
                <div className="user-dashboard-menu-withdraw-container-icon">
                  <BiMoneyWithdraw
                    className={
                      withdraw
                        ? "user-dashboard-menu-withdraw-icon-active"
                        : "user-dashboard-menu-withdraw-icon"
                    }
                  />
                </div>
                <div className="user-dashboard-menu-withdraw-container-title">
                  <p
                    className={
                      withdraw
                        ? "user-dashboard-menu-withdraw-container-titleP-active"
                        : "user-dashboard-menu-withdraw-container-titleP"
                    }
                  >
                    Withdraw
                  </p>
                </div>
              </div>
            </div>
            <div
              className={
                transaction
                  ? "user-dashboard-left-menu-transaction-active"
                  : "user-dashboard-left-menu-transaction"
              }
              onClick={() => {
                navigate("/userDashboard/transaction");
              }}
            >
              <div className="user-dashboard-menu-transaction-container">
                <div className="user-dashboard-menu-transaction-container-icon">
                  <GrTransaction
                    className={
                      transaction
                        ? "user-dashboard-menu-transaction-icon-active"
                        : "user-dashboard-menu-transaction-icon"
                    }
                  />
                </div>
                <div className="user-dashboard-menu-transaction-container-title">
                  <p
                    className={
                      transaction
                        ? "user-dashboard-menu-transaction-container-titleP-active"
                        : "user-dashboard-menu-transaction-container-titleP"
                    }
                  >
                    Transactions
                  </p>
                </div>
              </div>
            </div>
            <div
              className={
                referral
                  ? "user-dashboard-left-menu-referral-active"
                  : "user-dashboard-left-menu-referral"
              }
              onClick={() => {
                navigate("/userDashboard/referral");
              }}
            >
              <div className="user-dashboard-menu-referral-container">
                <div className="user-dashboard-menu-referral-container-icon">
                  <FaUsers
                    className={
                      referral
                        ? "user-dashboard-menu-referral-icon-active"
                        : "user-dashboard-menu-referral-icon"
                    }
                  />
                </div>
                <div className="user-dashboard-menu-referral-container-title">
                  <p
                    className={
                      referral
                        ? "user-dashboard-menu-referral-container-titleP-active"
                        : "user-dashboard-menu-referral-container-titleP"
                    }
                  >
                    Referrals
                  </p>
                </div>
              </div>
            </div>
          
            <div
              className={
                twoFA
                  ? "user-dashboard-left-menu-twoFA-active"
                  : "user-dashboard-left-menu-twoFA"
              }
              onClick={() => {
                navigate("/userDashboard/twoFA");
              }}
            >
              <div className="user-dashboard-menu-twoFA-container">
                <div className="user-dashboard-menu-twoFA-container-icon">
                  <GrShieldSecurity
                    className={
                      twoFA
                        ? "user-dashboard-menu-twoFA-icon-active"
                        : "user-dashboard-menu-twoFA-icon"
                    }
                  />
                </div>
                <div className="user-dashboard-menu-twoFA-container-title">
                  <p
                    className={
                      twoFA
                        ? "user-dashboard-menu-twoFA-container-titleP-active"
                        : "user-dashboard-menu-twoFA-container-titleP"
                    }
                  >
                    2FA Security
                  </p>
                </div>
              </div>
            </div>
            <div
              className={
                changePassword
                  ? "user-dashboard-left-menu-changePassword-active"
                  : "user-dashboard-left-menu-changePassword"
              }
              onClick={() => {
                navigate("/userDashboard/change_password");
              }}
            >
              <div className="user-dashboard-menu-changePassword-container">
                <div className="user-dashboard-menu-changePassword-container-icon">
                  <RiLockPasswordLine
                    className={
                      changePassword
                        ? "user-dashboard-menu-changePassword-icon-active"
                        : "user-dashboard-menu-changePassword-icon"
                    }
                  />
                </div>
                <div className="user-dashboard-menu-changePassword-container-title">
                  <p
                    className={
                      changePassword
                        ? "user-dashboard-menu-changePassword-container-titleP-active"
                        : "user-dashboard-menu-changePassword-container-titleP"
                    }
                  >
                    Change Password
                  </p>
                </div>
              </div>
            </div>
            {AdminUser.isAdmin ? (
              <>
                <div
                  className={
                    assign
                      ? "user-dashboard-left-menu-changePassword-active"
                      : "user-dashboard-left-menu-changePassword"
                  }
                  onClick={() => {
                    navigate("/userDashboard/assign-money");
                  }}
                >
                  <div className="user-dashboard-menu-changePassword-container">
                    <div className="user-dashboard-menu-changePassword-container-icon">
                      <GiMoneyStack
                        className={
                          assign
                            ? "user-dashboard-menu-changePassword-icon-active"
                            : "user-dashboard-menu-changePassword-icon"
                        }
                      />
                    </div>
                    <div className="user-dashboard-menu-changePassword-container-title">
                      <p
                        className={
                          assign
                            ? "user-dashboard-menu-changePassword-container-titleP-active"
                            : "user-dashboard-menu-changePassword-container-titleP"
                        }
                      >
                        Assign Deposit
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    assignProfit
                      ? "user-dashboard-left-menu-changePassword-active"
                      : "user-dashboard-left-menu-changePassword"
                  }
                  onClick={() => {
                    navigate("/assign-profit");
                  }}
                >
                  <div className="user-dashboard-menu-changePassword-container">
                    <div className="user-dashboard-menu-changePassword-container-icon">
                      <GiMoneyStack
                        className={
                          assignProfit
                            ? "user-dashboard-menu-changePassword-icon-active"
                            : "user-dashboard-menu-changePassword-icon"
                        }
                      />
                    </div>
                    <div className="user-dashboard-menu-changePassword-container-title">
                      <p
                        className={
                          assignProfit
                            ? "user-dashboard-menu-changePassword-container-titleP-active"
                            : "user-dashboard-menu-changePassword-container-titleP"
                        }
                      >
                        Assign Intrest
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    userDetails
                      ? "user-dashboard-left-menu-changePassword-active"
                      : "user-dashboard-left-menu-changePassword"
                  }
                  onClick={() => {
                    navigate("/user-details");
                  }}
                >
                  <div className="user-dashboard-menu-changePassword-container">
                    <div className="user-dashboard-menu-changePassword-container-icon">
                      <FaUser
                        className={
                          userDetails
                            ? "user-dashboard-menu-changePassword-icon-active"
                            : "user-dashboard-menu-changePassword-icon"
                        }
                      />
                    </div>
                    <div className="user-dashboard-menu-changePassword-container-title">
                      <p
                        className={
                          userDetails
                            ? "user-dashboard-menu-changePassword-container-titleP-active"
                            : "user-dashboard-menu-changePassword-container-titleP"
                        }
                      >
                        User Details
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    deleteUser
                      ? "user-dashboard-left-menu-changePassword-active"
                      : "user-dashboard-left-menu-changePassword"
                  }
                  onClick={() => {
                    navigate("/userDashboard/delete-user");
                  }}
                >
                  <div className="user-dashboard-menu-changePassword-container">
                    <div className="user-dashboard-menu-changePassword-container-icon">
                      <MdDelete
                        className={
                          deleteUser
                            ? "user-dashboard-menu-changePassword-icon-active"
                            : "user-dashboard-menu-changePassword-icon"
                        }
                      />
                    </div>
                    <div className="user-dashboard-menu-changePassword-container-title">
                      <p
                        className={
                          deleteUser
                            ? "user-dashboard-menu-changePassword-container-titleP-active"
                            : "user-dashboard-menu-changePassword-container-titleP"
                        }
                      >
                        Del/Deactivate User Acc
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    pendingKyc
                      ? "user-dashboard-left-menu-changePassword-active"
                      : "user-dashboard-left-menu-changePassword"
                  }
                  onClick={() => {
                    navigate("/userDashboard/pending-kyc");
                  }}
                >
                  <div className="user-dashboard-menu-changePassword-container">
                    <div className="user-dashboard-menu-changePassword-container-icon">
                      <MdDelete
                        className={
                          pendingKyc
                            ? "user-dashboard-menu-changePassword-icon-active"
                            : "user-dashboard-menu-changePassword-icon"
                        }
                      />
                    </div>
                    <div className="user-dashboard-menu-changePassword-container-title">
                      <p
                        className={
                          pendingKyc
                            ? "user-dashboard-menu-changePassword-container-titleP-active"
                            : "user-dashboard-menu-changePassword-container-titleP"
                        }
                      >
                        Pending KYC
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            <div className="user-dashboard-left-menu-logout">
              <button
                className="user-dashboard-logout-btn"
                onClick={LogoutUser}
              >
                {loading ? <ClipLoader color="white" size={21} /> : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="user-left-container-media">
        <div className="dashboard-hamburger-wrapper">
          <RxHamburgerMenu
            className="dashboard-hamburger-menu"
            onClick={() => {
              setMenu(true);
            }}
          />
        </div>
      </div>

      {menu ? (
        <div
          className="user-left-menu-wrapper-media"
          style={{
            backgroundColor: "#07122D",
            color: "orangered",
            padding: "0 3%",
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div className="user-left-menu-logo-wrapper-media">
            <div className="user-left-menu-logo-container-media">
              <img src={citadelLogo} alt="citadelLogo" />
            </div>
            <IoMdClose
              style={{
                fontSize: "1.2rem",
                color: "orangered",
              }}
              onClick={() => {
                setMenu(false);
              }}
            />
          </div>

          <div className="user-dashboard-acct-balance-container">
            <h1 style={{ color: "orangered" }}>Account Balance</h1>

            <div
              className="user-dashboard-deposit-wallet-container"
              style={{
                height: "100%",
                backgroundColor: "#999",
                maxWidth: "99%",

                marginBottom: "5px",
                borderRadius: "5px",
              }}
            >
              <div className="user-dashboard-deposit-wallet-wrapper">
                <p
                  style={{
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  General Balance
                </p>
                <div className="user-dashboard-deposit-wallet-amount">
                  <h3>
                    {accountBalance && `${accountBalance}.00`} <span>USD</span>
                  </h3>
                </div>
              </div>
            </div>

            <div
              className="user-dashboard-deposit-wallet-container"
              style={{
                height: "100%",
                backgroundColor: "#999",
                maxWidth: "99%",

                marginBottom: "5px",
                borderRadius: "5px",
              }}
            >
              <div className="user-dashboard-deposit-wallet-wrapper">
                <p
                  style={{
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  Deposit Wallet
                </p>
                <div className="user-dashboard-deposit-wallet-amount">
                  <h3>
                    {AdminUser.depositWallet}.00 <span>USD</span>
                  </h3>
                </div>
              </div>
            </div>
            <div
              className="user-dashboard-deposit-wallet-container"
              style={{
                height: "100%",
                backgroundColor: "#999",
                maxWidth: "99%",

                marginBottom: "5px",
                borderRadius: "5px",
              }}
            >
              <div className="user-dashboard-deposit-wallet-wrapper">
                <p
                  style={{
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  Interest Wallet
                </p>
                <div className="user-dashboard-deposit-wallet-amount">
                  <h3>
                    {AdminUser.intrestWallet}.00 <span>USD</span>
                  </h3>
                </div>
              </div>
            </div>
            <div
              className="user-dashboard-deposit-wallet-container"
              style={{
                height: "100%",
                backgroundColor: "#999",
                maxWidth: "99%",
                padding: "0.2rem",
                marginBottom: "5px",
                borderRadius: "5px",
              }}
            >
              <div className="user-dashboard-deposit-wallet-wrapper">
                <p
                  style={{
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  Referral Wallet
                </p>
                <div className="user-dashboard-deposit-wallet-amount">
                  <h3>
                    {AdminUser.referalWallet}.00 <span>USD</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div
            className="user-dashboard-left-body-menu-media"
            style={{
              overflowY: "scroll",
              height: "30rem",
            }}
          >
            <div className="user-dashboard-left-body-menu">
              <div
                className={
                  dashboard
                    ? "user-dashboard-left-menu-dashboard-active"
                    : "user-dashboard-left-menu-dashboard"
                }
                onClick={() => {
                  navigate("/userDashboard/dashboard");
                  setMenu(false);
                }}
              >
                <div className="user-dashboard-menu-dashboard-container">
                  <div className="user-dashboard-menu-dashboard-container-icon">
                    <MdOutlineDashboard
                      className={
                        dashboard
                          ? "user-dashboard-menu-icon-active"
                          : "user-dashboard-menu-icon"
                      }
                    />
                  </div>
                  <div className="user-dashboard-menu-dashboard-container-title">
                    <p
                      className={
                        dashboard
                          ? "user-dashboard-menu-dashboard-container-titleP-active"
                          : "user-dashboard-menu-dashboard-container-titleP"
                      }
                    >
                      Dashboard
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={
                  investment
                    ? "user-dashboard-left-menu-investment-active"
                    : "user-dashboard-left-menu-investment"
                }
                onClick={() => {
                  navigate("/userDashboard/investment");
                  setMenu(false);
                }}
              >
                <div className="user-dashboard-menu-investment-container">
                  <div className="user-dashboard-menu-investment-container-icon">
                    <CgMenuBoxed
                      className={
                        investment
                          ? "user-dashboard-menu-investment-icon-active"
                          : "user-dashboard-menu-investment-icon"
                      }
                    />
                  </div>
                  <div className="user-dashboard-menu-investment-container-title">
                    <p
                      className={
                        investment
                          ? "user-dashboard-menu-investment-container-titleP-active"
                          : "user-dashboard-menu-investment-container-titleP"
                      }
                    >
                      Investment
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={
                  deposit
                    ? "user-dashboard-left-menu-deposit-active"
                    : "user-dashboard-left-menu-deposit"
                }
                onClick={() => {
                  navigate("/userDashboard/deposit");
                  setMenu(false);
                }}
              >
                <div className="user-dashboard-menu-deposit-container">
                  <div className="user-dashboard-menu-deposit-container-icon">
                    <IoAlertCircleOutline
                      className={
                        deposit
                          ? "user-dashboard-menu-deposit-icon-active"
                          : "user-dashboard-menu-deposit-icon"
                      }
                    />
                  </div>
                  <div className="user-dashboard-menu-deposit-container-title">
                    <p
                      className={
                        deposit
                          ? "user-dashboard-menu-deposit-container-titleP-active"
                          : "user-dashboard-menu-deposit-container-titleP"
                      }
                    >
                      Deposit
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={
                  withdraw
                    ? "user-dashboard-left-menu-withdraw-active"
                    : "user-dashboard-left-menu-withdraw"
                }
                onClick={() => {
                  navigate("/userDashboard/withdraw");
                  setMenu(false);
                }}
              >
                <div className="user-dashboard-menu-withdraw-container">
                  <div className="user-dashboard-menu-withdraw-container-icon">
                    <BiMoneyWithdraw
                      className={
                        withdraw
                          ? "user-dashboard-menu-withdraw-icon-active"
                          : "user-dashboard-menu-withdraw-icon"
                      }
                    />
                  </div>
                  <div className="user-dashboard-menu-withdraw-container-title">
                    <p
                      className={
                        withdraw
                          ? "user-dashboard-menu-withdraw-container-titleP-active"
                          : "user-dashboard-menu-withdraw-container-titleP"
                      }
                    >
                      Withdraw
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={
                  transaction
                    ? "user-dashboard-left-menu-transaction-active"
                    : "user-dashboard-left-menu-transaction"
                }
                onClick={() => {
                  navigate("/userDashboard/transaction");
                  setMenu(false);
                }}
              >
                <div className="user-dashboard-menu-transaction-container">
                  <div className="user-dashboard-menu-transaction-container-icon">
                    <RiLockPasswordLine
                      className={
                        transaction
                          ? "user-dashboard-menu-transaction-icon-active"
                          : "user-dashboard-menu-transaction-icon"
                      }
                    />
                  </div>
                  <div className="user-dashboard-menu-transaction-container-title">
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: "500",
                      }}
                      className={
                        transaction
                          ? "user-dashboard-menu-transaction-container-titleP-active"
                          : "user-dashboard-menu-transaction-container-titleP"
                      }
                    >
                      Transaction
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={
                  changePassword
                    ? "user-dashboard-left-menu-changePassword-active"
                    : "user-dashboard-left-menu-changePassword"
                }
                onClick={() => {
                  navigate("/userDashboard/change_password");
                  setMenu(false);
                }}
              >
                <div className="user-dashboard-menu-changePassword-container">
                  <div className="user-dashboard-menu-changePassword-container-icon">
                    <RiLockPasswordLine
                      className={
                        changePassword
                          ? "user-dashboard-menu-changePassword-icon-active"
                          : "user-dashboard-menu-changePassword-icon"
                      }
                    />
                  </div>
                  <div className="user-dashboard-menu-changePassword-container-title">
                    <p
                      className={
                        changePassword
                          ? "user-dashboard-menu-changePassword-container-titleP-active"
                          : "user-dashboard-menu-changePassword-container-titleP"
                      }
                    >
                      Change Password
                    </p>
                  </div>
                </div>
              </div>

              {AdminUser.isAdmin ? (
                <>
                  <div
                    className={
                      assign
                        ? "user-dashboard-left-menu-changePassword-active"
                        : "user-dashboard-left-menu-changePassword"
                    }
                    onClick={() => {
                      navigate("/userDashboard/assign-money");
                      setMenu(false);
                    }}
                  >
                    <div className="user-dashboard-menu-changePassword-container">
                      <div className="user-dashboard-menu-changePassword-container-icon">
                        <GiMoneyStack
                          className={
                            assign
                              ? "user-dashboard-menu-changePassword-icon-active"
                              : "user-dashboard-menu-changePassword-icon"
                          }
                        />
                      </div>
                      <div className="user-dashboard-menu-changePassword-container-title">
                        <p
                          className={
                            assign
                              ? "user-dashboard-menu-changePassword-container-titleP-active"
                              : "user-dashboard-menu-changePassword-container-titleP"
                          }
                        >
                          Assign Deposit
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      assignProfit
                        ? "user-dashboard-left-menu-changePassword-active"
                        : "user-dashboard-left-menu-changePassword"
                    }
                    onClick={() => {
                      navigate("/userDashboard/assign-profit");
                      setMenu(false);
                    }}
                  >
                    <div className="user-dashboard-menu-changePassword-container">
                      <div className="user-dashboard-menu-changePassword-container-icon">
                        <GiMoneyStack
                          className={
                            assignProfit
                              ? "user-dashboard-menu-changePassword-icon-active"
                              : "user-dashboard-menu-changePassword-icon"
                          }
                        />
                      </div>
                      <div className="user-dashboard-menu-changePassword-container-title">
                        <p
                          className={
                            assignProfit
                              ? "user-dashboard-menu-changePassword-container-titleP-active"
                              : "user-dashboard-menu-changePassword-container-titleP"
                          }
                        >
                          Assign Intrest
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      userDetails
                        ? "user-dashboard-left-menu-changePassword-active"
                        : "user-dashboard-left-menu-changePassword"
                    }
                    onClick={() => {
                      navigate("/userDashboard/user-details");
                      setMenu(false);
                    }}
                  >
                    <div className="user-dashboard-menu-changePassword-container">
                      <div className="user-dashboard-menu-changePassword-container-icon">
                        <FaUser
                          className={
                            userDetails
                              ? "user-dashboard-menu-changePassword-icon-active"
                              : "user-dashboard-menu-changePassword-icon"
                          }
                        />
                      </div>
                      <div className="user-dashboard-menu-changePassword-container-title">
                        <p
                          className={
                            userDetails
                              ? "user-dashboard-menu-changePassword-container-titleP-active"
                              : "user-dashboard-menu-changePassword-container-titleP"
                          }
                        >
                          User Details
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      deleteUser
                        ? "user-dashboard-left-menu-changePassword-active"
                        : "user-dashboard-left-menu-changePassword"
                    }
                    onClick={() => {
                      navigate("/userDashboard/delete-user");
                      setMenu(false);
                    }}
                  >
                    <div className="user-dashboard-menu-changePassword-container">
                      <div className="user-dashboard-menu-changePassword-container-icon">
                        <MdDelete
                          className={
                            deleteUser
                              ? "user-dashboard-menu-changePassword-icon-active"
                              : "user-dashboard-menu-changePassword-icon"
                          }
                        />
                      </div>
                      <div className="user-dashboard-menu-changePassword-container-title">
                        <p
                          className={
                            deleteUser
                              ? "user-dashboard-menu-changePassword-container-titleP-active"
                              : "user-dashboard-menu-changePassword-container-titleP"
                          }
                        >
                          Delete User
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      pendingKyc
                        ? "user-dashboard-left-menu-changePassword-active"
                        : "user-dashboard-left-menu-changePassword"
                    }
                    onClick={() => {
                      navigate("/userDashboard/pending-kyc");
                      setMenu(false);
                    }}
                  >
                    <div className="user-dashboard-menu-changePassword-container">
                      <div className="user-dashboard-menu-changePassword-container-icon">
                        <MdDelete
                          className={
                            pendingKyc
                              ? "user-dashboard-menu-changePassword-icon-active"
                              : "user-dashboard-menu-changePassword-icon"
                          }
                        />
                      </div>
                      <div className="user-dashboard-menu-changePassword-container-title">
                        <p
                          className={
                            pendingKyc
                              ? "user-dashboard-menu-changePassword-container-titleP-active"
                              : "user-dashboard-menu-changePassword-container-titleP"
                          }
                        >
                          Pending KYC
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
              <div className="user-dashboard-left-menu-logout">
                <button
                  className="user-dashboard-logout-btn"
                  onClick={LogoutUser}
                >
                  {loading ? <ClipLoader color="white" size={21} /> : "Logout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="user-dashboard-right-container">
        <div className="user-dashboard-profile-container">
          <script
            defer
            src="https://www.livecoinwatch.com/static/lcw-widget.js"
          ></script>{" "}
          <div
            className="livecoinwatch-widget-5"
            lcw-base="USD"
            lcw-color-tx="#999999"
            lcw-marquee-1="coins"
            lcw-marquee-2="movers"
            lcw-marquee-items="10"
          ></div>
        </div>
        <div className="user-dashboard-profile-wrapper">
          <Profile user={AdminUser} />
        </div>

        <div className="user-dashboard-menu-content-container">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/investment" element={<Investments />} />
            <Route
              path="/scheduleInvestment"
              element={<ScheduleInvestment />}
            />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/supportTicket" element={<SupportTicket />} />
            <Route path="/pending-kyc" element={<PendingKyc />} />
            <Route path="/pending-tickets" element={<PendingTickets />} />
            <Route path="/twoFA" element={<TwoFA />} />
            <Route path="/change_password" element={<ChangePassword />} />
            <Route path="/delete-user" element={<DeleteUser />} />
            <Route path="/assign-money" element={<AssignMoney />} />
            <Route path="/assign-profit" element={<AssignProfit />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user-details" element={<UserDetails />} />
            <Route
              path="/profile-setting"
              element={<ProfileSettingPage user={AdminUser} />}
            />
            <Route path="/kyc" element={<Kyc />} />
          </Routes>
        </div>
      </div>
    </div>

  )
}

export default menu
