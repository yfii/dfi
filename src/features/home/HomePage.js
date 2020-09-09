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
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";

import style from "assets/jss/material-kit-pro-react/modalStyle.js";
// sections for this page
import SectionPools from "features/vault/sections/SectionPools.js";
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
      <SectionPools />
      <Dialog
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
              <p>YFII2.0升级了iToken协议，除了yCrv cCrv以外，其他代币都需要大家从之前系统中手动取出代币存入新系统，旧系统入口：<a href="https://v1.dfi.money/" target="_blank">https://v1.dfi.money/</a></p>
            ):(
              <p>YFII Vault 2.0 has released with iToken implemented. Except for yCrv cCrv, all other tokens need to be manually removed from the old vault and deposited into the new vault. The entrance to the old vault: <a href="https://v1.dfi.money/" target="_blank">https://v1.dfi.money/</a></p>
          )}
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button onClick={() => setLiveDemo(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}