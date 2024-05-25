import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userRes: [],

  user: {
    name: "",
    email: "",
    id: "",
    token: "",
    login: false,
    admin: false,
  },

  gateWay: "",
  amount: 0,

  accountBalance: 0,

  wallets: {
    deposit: 0,
    interest: 0,
    referal: 0,
  },
  referalLink: "",
  expToken: false,
  depositAmount: "",
  openTickets: [],
  dashboardVer: {
    kyc: false,
    twoFactor: false,
  },
};

export const investMentReducer = createSlice({
  name: "CryptoSite",
  initialState,
  reducers: {
    getAccountBalance: (state, { payload }) => {
      state.accountBalance = payload;
    },
    userStoreData: (state, { payload }) => {
      state.user = payload;
    },
    userResData: (state, { payload }) => {
      state.userRes = payload;
    },
    userGateway: (state, { payload }) => {
      state.gateWay = payload;
    },
    userAmount: (state, { payload }) => {
      state.amount = payload;
    },
    userDeposit: (state, { payload }) => {
      state.depositAmount = payload;
    },
    getWalletDetails: (state, { payload }) => {
      state.wallets = payload;
    },
    getReferal: (state, { payload }) => {
      state.referalLink = payload;
    },
    expireSession: (state, { payload }) => {
      state.expToken = payload;
    },
    getAllTickets: (state, { payload }) => {
      state.openTickets = payload;
    },
    checkVerification: (state, { payload }) => {
      state.dashboardVer = payload;
    },
  },
});
export const {
  userStoreData,
  userResData,
  userAmount,
  userGateway,
  getWalletDetails,
  checkVerification,
  userBalance,
  getReferal,
  expireSession,
  getAllTickets,
  userDeposit,
  getAccountBalance,
} = investMentReducer.actions;
export default investMentReducer.reducer;
