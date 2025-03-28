import css from "./FriendsItem.module.css";

const FriendsItem = ({ friend }) => {
  const currentDayIndex = (new Date().getDay() + 6) % 7;

  const todayIsOpen =
    friend.workDays && friend.workDays.length !== 0
      ? friend.workDays[currentDayIndex]?.isOpen
      : "";

  const todayFrom =
    friend.workDays && friend.workDays.length !== 0
      ? friend.workDays[currentDayIndex]?.from
      : "";

  const todayTo =
    friend.workDays && friend.workDays.length !== 0
      ? friend.workDays[currentDayIndex]?.to
      : "";

  return (
    <div className={css.friendsItem}>
      <a
        className={css.friendLogoLink}
        href={`${friend.url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className={css.friendLogoImg}
          src={`${friend.imageUrl}`}
          alt="Logo"
        />
      </a>
      <div className={css.friendContent}>
        {todayIsOpen === true && (
          <div className={css.friendDate}>
            {todayFrom} - {todayTo}
          </div>
        )}
        {todayIsOpen === false && <div className={css.friendDate}>Closed</div>}
        {todayIsOpen === "" && <div className={css.friendDate}>Not found</div>}
        <h3 className={css.friendTitle}>{friend.title}</h3>
        <div className={css.friendContacts}>
          <div className={css.friendContact}>
            <span className={css.friendSpan}>Email: </span>
            {friend.email && (
              <a
                className={css.friendLink}
                href={`mailto:${friend.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {friend.email}
              </a>
            )}
            {!friend.email && (
              <span className={css.friendLinkDis}>Not specified</span>
            )}
          </div>
          <div className={css.friendContact}>
            <span className={css.friendSpan}>Address: </span>
            {friend.address && (
              <a
                className={css.friendLink}
                href={`${friend.addressUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {friend.address}
              </a>
            )}
            {!friend.address && (
              <span className={css.friendLinkDis}>Not specified</span>
            )}
          </div>
          <div className={css.friendContact}>
            <span className={css.friendSpan}>Phone: </span>
            {friend.phone && (
              <a className={css.friendLink} href={`tel:${friend.phone}`}>
                {friend.phone}
              </a>
            )}
            {!friend.phone && (
              <span className={css.friendLinkDis}>Not specified</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsItem;
