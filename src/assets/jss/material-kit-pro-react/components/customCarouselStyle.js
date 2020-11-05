const customCarouselStyle = {
  container: {
    borderRadius: "6px",
    overflow: "hidden",
    backgroundColor: "#42475A",
    marginBottom: "30px",
  },
  slider: {
    width: "100%",
    height: "100%",
    lineHeight: "0",
    // "& img": {
    //   borderRadius: "6px",
    //   overflow: "hidden",
    // },
    // "& .slick-list": {
    //   borderRadius: "6px",
    //   overflow: "hidden",
    // },
  },
  dots: {
    textAlign: "right",
    bottom: "20px",
    paddingRight: "30px",
    margin: "0",
    "& li": {
      width: "8px",
      height: "8px",
      borderRadius: "8px",
      overflow: "hidden",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      margin: "0 4px",
    },
    "& li.slick-active": {
      width: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
    },
    "& li button": {
      // visibility: "hidden",
      opacity: "0",
      padding: "0",
      width: "8px",
      height: "8px",
      // backgroundColor: "transparent",
    },
  },
};

export default customCarouselStyle;
