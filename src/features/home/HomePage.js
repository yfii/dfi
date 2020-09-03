import React, { useEffect } from 'react';
// @material-ui/core components
// core components
// sections for this page
import SectionPools from "features/vault/sections/SectionPools.js";
// style for this page
// resource file
// hooks

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);
  
  return (
    <>
      <SectionPools />
    </>
  );
}