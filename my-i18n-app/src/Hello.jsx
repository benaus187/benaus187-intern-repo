import React from "react";  
import { useTranslation } from "react-i18next";

export default function Hello({ name = "Friend", count = 1 }) {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t("greeting", { name })}</h2>
      <p>{t("intro")}</p>
      <p>{t("items", { count })}</p>
    </div>
  );
}
