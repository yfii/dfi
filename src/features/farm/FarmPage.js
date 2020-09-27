import React, { useEffect } from 'react';
// @material-ui/core components
// @material-ui/icons
// import Close from "@material-ui/icons/Close";
// core components
// sections for this page
import FarmPools from './sections/FarmPools'
// hooks

export default function FarmPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);
  return (
    <>
      <FarmPools />
    </>
  );
}