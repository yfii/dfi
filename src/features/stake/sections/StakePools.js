import React,{ useState, useEffect } from 'react';
import classNames from "classnames";
import { useTranslation } from 'react-i18next';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CustomButtons from "components/CustomButtons/Button.js";
import Avatar from '@material-ui/core/Avatar';
import { isEmpty } from 'features/helpers/utils';
import stakePoolsStyle from "../jss/sections/stakePoolsStyle";
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';

import { useFetchPoolsInfo } from '../redux/hooks';

const fontDefaultStyle = {
  color: '#fff',
  fontFamily: 'Helvetica',
  fontSize: '18px',
  letterSpacing: '0',
  lineHeight: '18px',
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    ...fontDefaultStyle,
    backgroundColor: '#635AFF',
    height:'48px',
    borderColor:'rgb(40,42,55,0.5)',
    padding:'0 40px',
    '&:first-child':{
      borderTopLeftRadius:'12px',
    },
    '&:last-child':{
      borderTopRightRadius:'12px',
    },
  },
  body: {
    ...fontDefaultStyle,
    padding:'20px 40px',
    backgroundColor: '#2C3040',
    borderColor:'rgb(40,42,55,0.5)',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    
  },
}))(TableRow);

const useStyles = makeStyles(stakePoolsStyle);

export default function StakePools() {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { pools, poolsInfo, fetchPoolsInfo } = useFetchPoolsInfo();

  useEffect(() => {
    fetchPoolsInfo();
  }, [fetchPoolsInfo]);
  
  return (
    <GridContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >{t('Stake-Table-Pool')}</StyledTableCell>
            <StyledTableCell >{t('Stake-Table-Staked')}</StyledTableCell>
            <StyledTableCell >{t('Stake-Table-Total')}</StyledTableCell>
            <StyledTableCell >{t('Stake-Table-Pay')}</StyledTableCell>
            <StyledTableCell ></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody classes={{
          root:classes.tableBodyRoot
        }}>
          {pools.map((pool, index) => (
            <StyledTableRow key={pool.name}>
              <StyledTableCell component="th">
                <div className={classes.firstCell}>
                  <div className={classes.avatarContainer}>
                    <Avatar 
                      alt={pool.name}
                      src={require(`../../../images/${pool.name}-logo.png`)}
                      className={classNames({
                        [classes.avatar]:true,
                      })}
                      />
                  </div>
                  <div className={classes.firstCellContent}>
                    <div>{pool.name}</div>
                    <div>{pool.token}</div>
                  </div>
                </div>
              </StyledTableCell>
              {/* <StyledTableCell >$40,027,383.88</StyledTableCell> */}
              <StyledTableCell >{poolsInfo[index].staked}</StyledTableCell>
              <StyledTableCell >{poolsInfo[index].tvl}</StyledTableCell>
              <StyledTableCell >{poolsInfo[index].pay}</StyledTableCell>
              <StyledTableCell component="th" >
                <CustomButtons
                  href={`/#/stake/pool/${index}`}
                  className={classes.stakeButton}
                >
                  {t('Stake-Button-Stake')}
                </CustomButtons>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </GridContainer>
  )
}
