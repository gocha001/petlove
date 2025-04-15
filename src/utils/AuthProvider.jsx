// src/providers/AuthProvider.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../redux/auth/authOperations.js";
import { selectToken } from "../redux/auth/authSelectors.js";
import { setAuthHeader } from "../redux/auth/authOperations.js";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      setAuthHeader(token);
      dispatch(currentUser());
    }
  }, [dispatch, token]);

  return children;
};

export default AuthProvider;
