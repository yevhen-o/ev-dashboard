import { getUrl, IDENTIFIERS, Link } from "src/services/urlsHelper";
import { useAppTranslation } from "src/hooks";

export function NotFoundPage() {
  const { t } = useAppTranslation();
  return (
    <div className="">
      <h2>{t("notFoundPageText")}</h2>
      <Link to={getUrl(IDENTIFIERS.HOME)}>{t("commonGotoDashboard")}</Link>
    </div>
  );
}
