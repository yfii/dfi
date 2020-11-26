import React, { memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

const SummaryActions = ({ helpUrl, toggleCard, isOpen }) => {
  const classes = useStyles();

  return (
    <Grid item>
      <Grid item container justify="flex-end" alignItems="center" spacing={2}>
        <Hidden mdDown>
          <Grid item>
            <IconButton
              classes={{
                root: classes.iconContainerSecond,
              }}
              style={{
                visibility: Boolean(helpUrl) ? 'visible' : 'hidden',
              }}
              onClick={event => {
                event.stopPropagation();
                window.open(helpUrl);
              }}
            >
              <i className={'far fa-question-circle'} />
            </IconButton>
          </Grid>
        </Hidden>
        <Grid item>
          <IconButton
            className={classes.iconContainerPrimary}
            onClick={event => {
              event.stopPropagation();
              toggleCard();
            }}
          >
            {isOpen ? (
              <i className={'far fa-arrow-alt-circle-up'} />
            ) : (
              <i className={'far fa-arrow-alt-circle-down'} />
            )}
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(SummaryActions);
