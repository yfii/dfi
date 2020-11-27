import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Clearfix from "components/Clearfix/Clearfix.js";

import style from "assets/jss/material-kit-pro-react/modalStyle.js";
// sections for this page
import SectionPools from "features/vault/sections/SectionPools.js";
import StakePage from 'features/stake/sections/StakePools.js';
import FarmPools from 'features/farm/sections/FarmPools';
import LiquidityPage from 'features/liquidity/LiquidityPage.js'
// style for this page
// resource file
// hooks

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(style);

export default function HomePage() {
  const [liveDemo, setLiveDemo] = React.useState(true);
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);
  
  return (
    <>
      {/* <LiquidityPage/> */}
      <SnackbarContent
        message={
            <span onClick={() => window.open(t('Home-SnackBarUrl'))} style={{fontWeight: "bold"}}>
              {t('Home-SnackBarText')}
            </span>
        }
        close
        color="success"
      />
      {/* <FarmPools fromPage='home'/> */}
      <StakePage fromPage='home'/>
      <SectionPools fromPage='home'/>
      {/* <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal
        }}
        open={liveDemo}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setLiveDemo(false)}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          {
            (i18n.language=== 'zh' || i18n.language === 'zh-CN')?(
              <p>YFII机枪池已升级到2.0版本并增添了iToken机制，目前旧机枪池中除了yCrv和cCrv以外，都已不再产生收益。我们建议您尽快将资金从旧池中取出并存入新池。旧系统入口：<a href="https://v1.dfi.money/" target="_blank">https://v1.dfi.money/</a></p>
            ):(
              <p>YFII Vault has been upgraded to version 2.0 which features the new iToken mechanism. The old vaults do not generate yield anymore except for yCrv and cCrv. You are encouraged to take your funds out of the old vaults and deposit them into the new ones. Entrance for old vaults:<a href="https://v1.dfi.money/" target="_blank">https://v1.dfi.money/</a></p>
          )}
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button onClick={() => setLiveDemo(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
}