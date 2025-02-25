import { useTranslation } from "react-i18next";
import type { TOptions } from "i18next";

export const useAppTranslation = () => {
  const { t, i18n } = useTranslation();

  const translate = (key: string, options?: TOptions) => {
    return t(key, options) || key;
  };

  return { t: translate, i18n };
};
