import css from "./UserCard.module.css";
import EditUserBtn from "../EditUserBtn/EditUserBtn.jsx";
import UserBlock from "../UserBlock/UserBlock.jsx";
import PetsBlock from "../PetsBlock/PetsBlock.jsx";
import LogOutBtn from "../LogOutBtn/LogOutBtn.jsx";

const UserCard = () => {
  return (
    <div className={css.userCard}>
      <EditUserBtn base={true} />
      <UserBlock />
      <PetsBlock />
      <LogOutBtn common={false} />
    </div>
  );
};

export default UserCard;
