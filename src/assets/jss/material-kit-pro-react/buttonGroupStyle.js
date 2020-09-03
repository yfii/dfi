const buttonGroupStyle = {
  buttonGroup: {
    position: "relative",
    margin: "10px 1px",
    display: "inline-block",
    verticalAlign: "middle"
  },
  firstButton: {
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
    margin: "0",
    position: "relative",
    float: "left",
    "&:hover": {
      zIndex: "2"
    }
  },
  middleButton: {
    borderRadius: "0",
    margin: "0",
    position: "relative",
    float: "left",
    "&:hover": {
      zIndex: "2"
    }
  },
  lastButton: {
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    margin: "0",
    "&:hover": {
      zIndex: "2"
    }
  }
};

export default buttonGroupStyle;
