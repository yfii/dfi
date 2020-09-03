import {
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
  grayColor
} from "assets/jss/material-kit-pro-react.js";

const typographyStyle = {
  defaultFontStyle: {
    ...defaultFont,
    fontSize: "14px"
  },
  defaultHeaderMargins: {
    marginTop: "20px",
    marginBottom: "10px"
  },
  quote: {
    padding: "10px 20px",
    margin: "0 0 20px",
    fontSize: "1.25rem",
    borderLeft: "5px solid " + grayColor[2]
  },
  quoteText: {
    margin: "0 0 10px",
    fontStyle: "italic"
  },
  quoteAuthor: {
    display: "block",
    fontSize: "80%",
    lineHeight: "1.42857143",
    color: grayColor[10]
  },
  mutedText: {
    "&, & *": {
      color: grayColor[7],
      display: "inline-block"
    }
  },
  primaryText: {
    "&, & *": {
      color: primaryColor[0],
      display: "inline-block"
    }
  },
  infoText: {
    "&, & *": {
      color: infoColor[0],
      display: "inline-block"
    }
  },
  successText: {
    "&, & *": {
      color: successColor[0],
      display: "inline-block"
    }
  },
  warningText: {
    "&, & *": {
      color: warningColor[0],
      display: "inline-block"
    }
  },
  dangerText: {
    "&, & *": {
      color: dangerColor[0],
      display: "inline-block"
    }
  },
  roseText: {
    "&, & *": {
      color: roseColor[0],
      display: "inline-block"
    }
  },
  smallText: {
    fontSize: "65%",
    fontWeight: "400",
    lineHeight: "1",
    color: grayColor[10]
  }
};

export default typographyStyle;
