import { fade } from '@material-ui/core';

export default theme => ({
  box: {
    backgroundColor:
      theme.palette.type === 'dark' ? fade('#fff', 0.05) : theme.palette.background.extra,
    marginBottom: 24,
    padding: '0 9px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    [theme.breakpoints.up('lg')]: {
      flexWrap: 'nowrap',
    },
  },
  feature: {
    padding: '24px 15px 0 15px',
    color: theme.palette.text.primary,
    fontWeight: 700,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      flexBasis: 'auto',
      flexGrow: 1,
      flexShrink: 1,
    },
    [theme.breakpoints.up('lg')]: {
      padding: '24px 15px',
      flexBasis: 'auto',
      flexShrink: 0,
      width: 'auto',
    },
  },
  featureFirst: {
    width: 'calc(100% - 80px)',
    [theme.breakpoints.up('sm')]: {
      flexBasis: 'calc(100% - 80px)',
    },
    [theme.breakpoints.up('lg')]: {
      flexBasis: '20%',
      flexShrink: 0,
      flexGrow: 3,
    },
  },
  featureLast: {
    paddingBottom: 24,
  },
  featureLabel: {
    textTransform: 'uppercase',
  },
  logoFeature: {
    padding: '24px 24px 0 24px',
    alignSelf: 'stretch',
    width: 'auto',
    [theme.breakpoints.up('lg')]: {
      padding: '0 24px',
      flexBasis: '155px',
      flexShrink: 0,
      flexGrow: 0,
    },
    '@media (min-width: 1380px)': {
      flexBasis: '255px',
    },
  },
  logoHolder: {
    position: 'relative',
    margin: '0 auto',
    [theme.breakpoints.up('lg')]: {
      height: '100%',
    },
  },
  logo: {
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: ' 100%',
      objectFit: 'cover',
    },
  },
});
