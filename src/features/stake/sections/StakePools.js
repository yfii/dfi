import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CustomButtons from 'components/CustomButtons/Button.js';
import Avatar from '@material-ui/core/Avatar';
import { StyledTableCell, StyledTableRow, stakePoolsStyle } from '../jss/sections/stakePoolsStyle';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { useFetchPoolsInfo } from '../redux/hooks';

const useStyles = makeStyles(stakePoolsStyle);

export default function StakePools(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { pools, poolsInfo, fetchPoolsInfo } = useFetchPoolsInfo();

  useEffect(() => {
    fetchPoolsInfo();
  }, [fetchPoolsInfo]);

  return (
    <Grid container style={{ paddingTop: '4px' }}>
      <Grid item xs={12}>
        <div className={classes.mainTitle}>{t('Stake-Main-Title')}</div>
        <h3 className={classes.secondTitle}>{t('Stake-Second-Title')}</h3>
      </Grid>
      <Hidden xsDown>
        <GridItem>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell className={classes.tableCell}>{t('Stake-Table-Pool')}</StyledTableCell>
                <StyledTableCell className={classes.tableCell}>{t('Stake-Table-Staked')}</StyledTableCell>
                <StyledTableCell className={classes.tableCell}>{t('Stake-Table-Total')}</StyledTableCell>
                <StyledTableCell className={classes.tableCell}>{t('Stake-Table-Apy')}</StyledTableCell>
                <StyledTableCell className={classes.tableCell}></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody
              classes={{
                root: classes.tableBodyRoot,
              }}
            >
              {pools.map((pool, index) => (
                <StyledTableRow key={pool.name}>
                  <StyledTableCell component="th">
                    <div className={classes.firstCell}>
                      <div className={classes.avatarContainer}>
                        <Avatar
                          alt={pool.name}
                          src={require(`../../../images/${pool.name}-logo.png`)}
                          className={classNames({
                            [classes.avatar]: true,
                          })}
                        />
                      </div>
                      <div className={classes.firstCellContent}>
                        <div>{pool.name}</div>
                        <div>{pool.token}</div>
                      </div>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>{poolsInfo[index].staked}</StyledTableCell>
                  <StyledTableCell>{poolsInfo[index].tvl}</StyledTableCell>
                  <StyledTableCell>{poolsInfo[index].apy}</StyledTableCell>
                  <StyledTableCell component="th">
                    <CustomButtons href={`/#/stake/pool/${index + 1}`} className={classes.stakeButton}>
                      {t('Stake-Button-Stake')}
                    </CustomButtons>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </GridItem>
      </Hidden>
      <Hidden smUp>
        <GridItem>
          {pools.map((pool, index) => (
            <div key={`mobile-${index}`} className={classes.mobileContainer}>
              <div className={classes.avatarContainer} style={{ width: '80px', height: '80px', borderRadius: '40px' }}>
                <Avatar
                  alt={pool.name}
                  src={require(`../../../images/${pool.name}-logo.png`)}
                  style={{ width: '54px', height: '54px' }}
                />
              </div>
              <div className={classes.mobileHead}>
                <div style={{ fontSize: '26px', lineHeight: '18px', fontWeight: '600', marginBottom: '14px' }}>
                  {pool.name}
                </div>
                <div style={{ fontSize: '18px', lineHeight: '14px', fontWeight: '500' }}>{pool.token}</div>
              </div>
              <div className={classes.mobileDetail}>
                <div style={{ marginBottom: '10px' }}>{t('Stake-Table-Apy') + ': ' + poolsInfo[index].apy}</div>
                <div style={{ marginBottom: '10px' }}>{t('Stake-Table-Staked') + ': ' + poolsInfo[index].staked}</div>
                <div style={{ marginBottom: '12px' }}>{t('Stake-Table-Total') + ': ' + poolsInfo[index].tvl}</div>
              </div>
              <CustomButtons
                href={`/#/stake/pool/${index + 1}`}
                className={classes.stakeButton}
                style={{ width: '180px', height: '44px' }}
              >
                {t('Stake-Button-Stake')}
              </CustomButtons>
            </div>
          ))}
        </GridItem>
      </Hidden>
    </Grid>
  );
}

StakePools.defaultProps = {
  fromPage: 'page',
};
