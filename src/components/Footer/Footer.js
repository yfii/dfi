import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMediumM, faTelegramPlane, faDiscord, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

import styles from './style';

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <List className={classes.list}>
        <ListItem>
          <a className={classes.navLink} href="https://twitter.com/beefyfinance" target="_blank">
            <FontAwesomeIcon className={classes.socialIcons} icon={faTwitter} />
          </a>
        </ListItem>
        <ListItem>
          <a className={classes.navLink} href="https://t.me/beefyfinance" target="_blank">
            <FontAwesomeIcon className={classes.socialIcons} icon={faTelegramPlane} />
          </a>
        </ListItem>
        <ListItem>
          <a className={classes.navLink} href="https://discord.gg/yq8wfHd" target="_blank">
            <FontAwesomeIcon className={classes.socialIcons} icon={faDiscord} />
          </a>
        </ListItem>
        <ListItem>
          <a className={classes.navLink} href="https://medium.com/beefyfinance" target="_blank">
            <FontAwesomeIcon className={classes.socialIcons} icon={faMediumM} />
          </a>
        </ListItem>
        <ListItem>
          <a className={classes.navLink} href="https://github.com/beefyfinance" target="_blank">
            <FontAwesomeIcon className={classes.socialIcons} icon={faGithub} />
          </a>
        </ListItem>
      </List>
    </div>
  );
}
