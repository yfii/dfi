// import _ from 'lodash';
import React from "react";
// import PropTypes from 'prop-types';
// import ClassNames from 'classnames';
import { makeStyles } from "@material-ui/core/styles";
import Slider from "react-slick";
import ElementResizeDetector from "element-resize-detector";

import ImgWePiggy from "assets/img/carousel/wepiggy.jpg";
import ImgSFinance from "assets/img/carousel/sfinance.jpg";
import ImgSakeSwap from "assets/img/carousel/sakeswap.jpg";
import ImgQian from "assets/img/carousel/qian.png";
import ImgUnisave from "assets/img/carousel/unisave.png";

import styles from "assets/jss/material-kit-pro-react/components/customCarouselStyle.js";

const useStyles = makeStyles(styles);

function useResize() {
  const reSizer = React.useRef(
    ElementResizeDetector({
      strategy: "scroll", // <- For ultra performance.
    })
  );

  const refDom = React.useRef(null);

  const [rect, setRect] = React.useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  React.useEffect(
    () => () => {
      if (reSizer.current && reSizer.current.uninstall && refDom.current) {
        reSizer.current.uninstall(refDom.current);
      }

      refDom.current = undefined;
      reSizer.current = undefined;
    },
    []
  );

  const ref = React.useCallback((dom) => {
    if (reSizer.current && reSizer.current.listenTo && !refDom.current && dom) {
      refDom.current = dom;
      reSizer.current.listenTo(refDom.current, (element) =>
        setRect(element.getBoundingClientRect())
      );
    }
  }, []);

  return [ref, rect];
}

function CustomCarousel(props) {
  // const {  } = props;

  const classes = useStyles();

  const [ref, rect] = useResize();

  const { width } = rect;
  const height = width / (1200 / 300);

  const sliderProps = {
    accessibility: true,
    adaptiveHeight: true,
    // afterChange: ,
    // appendDots: ,
    arrows: false,
    // asNavFor: ,
    autoplaySpeed: 3000,
    autoplay: true,
    // beforeChange: ,
    // centerMode: true,
    // centerPadding: "50px",
    // customPaging: ,
    dotsClass: `slick-dots ${classes.dots}`,
    dots: true,
    draggable: true,
    easing: "linear",
    fade: false,
    focusOnSelect: false,
    infinite: true,
    initialSlide: 0,
    lazyLoad: true,
    // onEdge: ,
    // onInit: ,
    // onLazyLoad: ,
    // onReInit: ,
    // onSwipe: ,
    // pauseOnDotsHover: ,
    // pauseOnFocus: ,
    // pauseOnHover: ,
    // responsive: ,
    rows: 1,
    rtl: false,
    slide: "div",
    slidesPerRow: 1,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
    swipeToSlide: false,
    swipe: true,
    touchMove: true,
    touchThreshold: 5,
    useCSS: true,
    useTransform: true,
    variableWidth: false,
    vertical: false,
  };

  return (
    <div ref={ref} className={classes.container}>
      <Slider className={classes.slider} {...sliderProps}>
        <div>
          <a
            className={classes.link}
            href="https://unisave.exchange/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <img src={ImgUnisave} alt="slider" width={width} height={height} />
          </a>
        </div>        
        <div>
          <a
            className={classes.link}
            href="https://wepiggy.com/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <img src={ImgWePiggy} alt="slider" width={width} height={height} />
          </a>
        </div>
        <div>
          <a
            className={classes.link}
            href="https://sakeswap.finance/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <img src={ImgSakeSwap} alt="slider" width={width} height={height} />
          </a>
        </div>
        <div>
          <a
            className={classes.link}
            href="https://s.finance/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <img src={ImgSFinance} alt="slider" width={width} height={height} />
          </a>
        </div>
        <div>
          <a
            className={classes.link}
            href="https://qian.finance/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <img src={ImgQian} alt="slider" width={width} height={height} />
          </a>
        </div>
      </Slider>
    </div>
  );
}

export default React.memo(CustomCarousel);
