import EditUserBtn from "../EditUserBtn/EditUserBtn";
import css from "./UserBlock.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSelectors";

const UserBlock = () => {
  const user = useSelector(selectUser);

  return <div>{!user.avatar && <EditUserBtn base={false} />}</div>;
};

export default UserBlock;
