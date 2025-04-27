import { useLocation } from "react-router-dom";

export const formatDate = (isoString) => {
  const location = useLocation();

  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let result = `${day}/${month}/${year}`;

  if (location.pathname === "/notices" || location.pathname === "/profile") {
    result = `${day}.${month}.${year}`;
  }

  return result;
};
