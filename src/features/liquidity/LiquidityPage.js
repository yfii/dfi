import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
// @material-ui/core components
// @material-ui/icons
// import Close from "@material-ui/icons/Close";
// core components
// sections for this page
import { SectionTitle, SectionPools } from ".";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import CustomCarousel from "components/CustomCarousel/CustomCarousel.js";
// hooks

export default function LiquidityPage() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);
  return (
    <>
      <SnackbarContent
        message={
          <span
            onClick={() => window.open(t("Liquidity-SnackBarUrl"))}
            style={{ fontWeight: "bold" }}
          >
            {t("Liquidity-SnackBarText")}
          </span>
        }
        close
        color="success"
      />
      <CustomCarousel />
      {/* <SectionTitle /> */}
      <SectionPools />
    </>
  );
}
