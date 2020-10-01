import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMediumM, faTelegramPlane, faDiscord, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

import styles from './style';

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <a href="https://twitter.com/beefyfinance" target="_blank">
        <FontAwesomeIcon className={classes.socialIcons} icon={faTwitter} />
      </a>
      <a href="https://t.me/beefyfinance" target="_blank">
        <FontAwesomeIcon className={classes.socialIcons} icon={faTelegramPlane} />
      </a>
      <a href="https://discord.gg/yq8wfHd" target="_blank">
        <FontAwesomeIcon className={classes.socialIcons} icon={faDiscord} />
      </a>
      <a href="https://medium.com/beefyfinance" target="_blank">
        <FontAwesomeIcon className={classes.socialIcons} icon={faMediumM} />
      </a>
      <a href="https://github.com/beefyfinance" target="_blank">
        <FontAwesomeIcon className={classes.socialIcons} icon={faGithub} />
      </a>
    </div>
  );
}
