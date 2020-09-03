import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionActions'
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Avatar from '@material-ui/core/Avatar';
// sections for this section
//  hooks

const useStyles = makeStyles();

export default function SectionPool(props) {
  const classes = useStyles();
  return (
    <Accordion
      key={props.index}
      // expanded={Boolean(openedCardList.includes(index))}
      // onChange={() => openCard(index)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.details}
      >
        <GridItem xs={12}>
          <GridContainer>
            <GridItem xs={12} sm={4} style={{
              display: "flex",
              justifyContent : "space-around",
              alignItems : "center",
              alignContent: "space-around",
            }}>
              <GridItem xs={3}>
                <Avatar 
                  // alt={pool.token}
                  // src={require(`../../../images/${pool.token}-logo.png`)}
                  style={{}}
                />
              </GridItem>
              <GridItem xs={6} style={{display: "flex",alignItems : "center"}}>
                <h2 style={{fontSize: "1.5rem", margin: 0, fontWeight: "300"}}>YFII</h2>
              </GridItem>
              <GridItem xs={3}>
                <h5>11</h5>
                <h6>Balance</h6>
              </GridItem>
            </GridItem>
          </GridContainer>
        </GridItem>
      </AccordionSummary>
      <AccordionDetails>
        <GridItem xs={12}>
          <GridContainer style={{alignItems:"flex-start"}}>
            <GridItem xs={6} sm={6}>
              <Card>
                <CardBody>
                  <h4>asdasdasda</h4>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
      </AccordionDetails>
    </Accordion>
  )
}
