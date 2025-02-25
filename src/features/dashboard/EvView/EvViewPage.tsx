import { useAppTranslation } from "src/hooks";

export function EvViewPage() {
  const { t } = useAppTranslation();
  return <>{t("evPageSingleEV")}</>;
}
