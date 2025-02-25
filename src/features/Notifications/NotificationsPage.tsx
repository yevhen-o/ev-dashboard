import { useEffect } from "react";
import {
  useActions,
  useAppTranslation,
  useTypedSelector,
} from "src/shared/hooks";
import "./NotificationPage.scss";
import classNames from "classnames";
import { getUrl, IDENTIFIERS, Link } from "src/services/urlsHelper";

const formatDate = (date: Date | string) =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Australia/Sydney",
  }).format(new Date(date));

export function NotificationsPage() {
  const { setLastSeen } = useActions();
  const { t } = useAppTranslation();
  const notifications = useTypedSelector(
    (state) => state.notifications.notifications
  );

  useEffect(() => {
    setLastSeen();
  }, [setLastSeen]);

  return (
    <>
      <h1>{t("notificationPageTitle")}</h1>
      {notifications.map(
        ({ isCritical, isWarning, message, win, from, to }) => (
          <Link
            to={getUrl(IDENTIFIERS.HOME, { search: win })}
            key={`${win}__${message}`}
            className={classNames("notification", {
              "notification--warning": isWarning,
              "notification--critical": isCritical,
            })}
          >
            {from && formatDate(from)} {to && `to ${formatDate(to)}`} EV win [
            {win}] -- {message}
          </Link>
        )
      )}
    </>
  );
}
