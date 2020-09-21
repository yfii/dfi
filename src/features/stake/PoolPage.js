import React, { useEffect } from 'react';
// @material-ui/core components
// @material-ui/icons
// import Close from "@material-ui/icons/Close";
// core components
// sections for this page
import { StakePool }  from './sections'
// hooks

export default function StakePage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);
  return (
    <>
      <StakePool {...props}/>
    </>
  );
}