import { useSelector } from "react-redux";

import {
  Delivery,
  Light,
  LightFilled,
  InformationSquare,
} from "src/components/Icons";
import { useAppTranslation } from "src/hooks";
import { Button } from "src/components/Button";
import { useActions } from "src/hooks/useActions";
import { getUrl, IDENTIFIERS, Link } from "src/services/urlsHelper";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { hasUnseenNotifications } from "src/features/Notifications/NotificationsSlice";
import "./Header.scss";

export function Header() {
  const { toggleTheme } = useActions();
  const { t, i18n } = useAppTranslation();
  const theme = useTypedSelector((store) => store.layout.theme);
  const hasNewNotifications = useSelector(hasUnseenNotifications);

  const handleChangeLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "de" : "en");
  };

  return (
    <div className="header__wrapper">
      <div className="header__content">
        <Link to={getUrl(IDENTIFIERS.HOME)} className="header__logo">
          <Delivery size={24} />
          {t("headerDashboardTitle")}
        </Link>
        <div className="header__actions">
          <Link
            className="header__notification"
            to={getUrl(IDENTIFIERS.NOTIFICATIONS)}
          >
            {hasNewNotifications && (
              <span className="header__notification-bullet"></span>
            )}
            <Button
              title={t("headerDashboardNotification")}
              className="header__notification-button"
              isRounded
              isTransparent
            >
              <InformationSquare size={20} />
            </Button>
          </Link>
          <Button
            title={t("headerChangeThemeTitle", {
              theme: theme === "light" ? "dark" : "light",
            })}
            onClick={() => toggleTheme()}
            className="header__theme-toggle"
            isRounded
            isTransparent
          >
            {theme === "light" ? (
              <LightFilled size={20} />
            ) : (
              <Light size={20} />
            )}
          </Button>
          <Button
            isRounded
            isTransparent
            onClick={handleChangeLanguage}
            title={t("headerChangeLanguageTitle")}
          >
            {i18n.language === "en" ? "DE" : "EN"}
          </Button>
        </div>
      </div>
    </div>
  );
}
