import { useSelector } from "react-redux";

import {
  Delivery,
  Light,
  LightFilled,
  InformationSquare,
} from "src/components/Icons";
import { useAppTranslation } from "src/shared/hooks";
import { Button } from "src/components/Button";
import { useActions } from "src/shared/hooks/useActions";
import { getUrl, IDENTIFIERS, Link } from "src/services/urlsHelper";
import { useTypedSelector } from "src/shared/hooks/useTypedSelector";
import { hasUnseenNotifications } from "src/features/Notifications/NotificationsSlice";
import "./Header.scss";

export function Header() {
  const { toggleTheme } = useActions();
  const { t, i18n } = useAppTranslation();
  const theme = useTypedSelector((store) => store.layout.theme);
  const hasNewNotifications = useSelector(hasUnseenNotifications);
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
            <Button className="header__theme-toggle" isRounded isTransparent>
              <InformationSquare size={20} />
            </Button>
          </Link>
          <Button
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
            onClick={() =>
              i18n.changeLanguage(i18n.language === "en" ? "de" : "en")
            }
            title={t("headerChangeLanguageTitle")}
          >
            {i18n.language === "en" ? "de" : "en"}
          </Button>
        </div>
      </div>
    </div>
  );
}
