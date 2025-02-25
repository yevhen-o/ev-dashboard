import { useAppTranslation } from "src/shared/hooks";

export function EvViewPage() {
  const { t } = useAppTranslation();
  return <>{t("evPageSingleEV")}</>;
}
