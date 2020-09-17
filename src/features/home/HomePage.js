import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// @material-ui/core components
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

// sections for this page
import SectionPools from "features/vault/sections/SectionPools.js";
// style for this page
// resource file
// hooks

export default function HomePage() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);
  
  return (
    <>
      <SnackbarContent
        message={
            <span onClick={() => window.open(t('Home-SnackBarUrl'))} style={{fontWeight: "bold"}}>
              {t('Home-SnackBarText')}
            </span>
        }
        close
        color="warning"
        icon={Warning}
      />
      <SectionPools />
    </>
  );
}