import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import styles from './styles';

const useStyles = makeStyles(styles);

const StakingDialog = ({
  open,
  onClose,
  inputLabel,
  submitLabel,
  onSubmit,
  pool,
  availableAmount,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [value, setValue] = useState(0);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropProps={{
        className: classes.backdrop
      }}
      classes={{
        paper: classes.paper
      }}
    >
      <div className={classes.label}>
        <span>{inputLabel}</span>
        <span>{availableAmount} {pool && pool.symbol}</span>
      </div>
      <div className={classes.inputWrapper}>
        <input
          className={classes.input}
          value={value}
          onChange={(event) => { setValue(event.target.value); }}
        />
        <span className={classes.inputSymbol}>
          {pool && pool.symbol}
        </span>
        <Button
          classes={{
            root: classes.maxButton,
            label: classes.maxButtonLabel,
          }}
        >
          {t('Max')}
        </Button>
      </div>
      <div className={classes.buttons}>
        <Button
          classes={{
            root: classes.cancelButton,
            label: classes.cancelButtonLabel,
          }}
          variant="outlined"
          size="large"
          onClick={onClose}
        >
          {t('Cancel')}
        </Button>
        <Button
          classes={{
            root: classes.stakingButton,
            label: classes.stakingButtonLabel,
          }}
          variant="contained"
          size="large"
          onClick={() => { onSubmit(value); }}
        >
          {submitLabel}
        </Button>
      </div>
    </Dialog>
  );
};

export default StakingDialog;
