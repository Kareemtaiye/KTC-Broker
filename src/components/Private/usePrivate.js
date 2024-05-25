import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const usePrivateStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const { login } = useSelector((state) => {
    console.log("Login status:", state.BTC.user.login);
    return state.BTC.user;
  });

  useEffect(() => {
    if (login) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [login]);

  useEffect(() => {
    console.log("loggedIn:", loggedIn);
  }, [loggedIn]);

  return { loggedIn };
};
