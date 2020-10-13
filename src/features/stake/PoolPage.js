import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// @material-ui/core components
// @material-ui/icons
// import Close from "@material-ui/icons/Close";
// core components
// sections for this page
import { StakePool }  from './sections'
// hooks

export default function PoolPage(props) {
  const history = useHistory();
  const [ index ] = useState(Number(props.match.params.index) - 1);

  useEffect(() => {
    if(index != 3 && index != 4) return history.push('/stake')
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, [index]);
  return (
    <>
      <StakePool {...props}/>
    </>
  );
}