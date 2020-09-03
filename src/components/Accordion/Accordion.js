import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

// @material-ui/icons
import ExpandMore from "@material-ui/icons/ExpandMore";

import styles from "assets/jss/material-kit-pro-react/components/accordionStyle.js";

const useStyles = makeStyles(styles);

export default function Accordion(props) {
  const [active, setActive] = React.useState(
    props.active.length === undefined ? [props.active] : props.active
  );
  const [single] = React.useState(
    props.active.length === undefined ? true : false
  );
  const handleChange = panel => () => {
    let newArray;

    if (single) {
      if (active[0] === panel) {
        newArray = [];
      } else {
        newArray = [panel];
      }
    } else {
      if (active.indexOf(panel) === -1) {
        newArray = [...active, panel];
      } else {
        newArray = [...active];
        newArray.splice(active.indexOf(panel), 1);
      }
    }
    setActive(newArray);
  };
  const { collapses, activeColor } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {collapses.map((prop, key) => {
        return (
          <ExpansionPanel
            expanded={active === key || active.indexOf(key) !== -1}
            onChange={handleChange(key)}
            key={key}
            classes={{
              root: classes.expansionPanel,
              expanded: classes.expansionPanelExpanded
            }}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMore />}
              classes={{
                root: `${classes.expansionPanelSummary} ${
                  classes[activeColor + "ExpansionPanelSummary"]
                }`,
                expanded: `${classes.expansionPanelSummaryExpaned} ${
                  classes[activeColor + "ExpansionPanelSummaryExpaned"]
                }`,
                content: classes.expansionPanelSummaryContent,
                expandIcon: classes.expansionPanelSummaryExpandIcon
              }}
            >
              <h4 className={classes.title}>{prop.title}</h4>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
              {prop.content}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
}

Accordion.defaultProps = {
  active: -1,
  activeColor: "primary"
};

Accordion.propTypes = {
  // index of the default active collapse
  active: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  collapses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.node
    })
  ).isRequired,
  activeColor: PropTypes.oneOf([
    "primary",
    "secondary",
    "warning",
    "danger",
    "success",
    "info",
    "rose"
  ])
};
