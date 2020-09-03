import React from 'react';
// @material-ui/core components
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// sections for this section
import { SectionPool } from '.'
//  hooks

export default function StakePools() {
  const pools = [1]
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={10}>
        {pools.map((pool, index) => {
          return (
            <SectionPool pool={pool} index={index} />
          )
        })}
      </GridItem>
    </GridContainer>
  )
}
