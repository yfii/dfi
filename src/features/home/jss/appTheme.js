import { createMuiTheme } from '@material-ui/core/styles';

const createTheme = (isNightMode) => createMuiTheme({
  palette: {
    type: isNightMode ? 'dark' : 'light',
    background: {
      default: isNightMode ? '#242332' : '#fbf9f6',
      paper: isNightMode ? '#606077' : '#fff',
      primary: isNightMode ? '#505067' : '#FBF6F0',
      secondary: isNightMode ? '#3B3A4D' : '#F8F2EC',
      dark: isNightMode ? '#2B2A3D' : '#999',
      paused: isNightMode ? '#2B2A5A' : '#FCE57E',
      retired: isNightMode ? '#d32f2f' : '#e57373',
      hover: isNightMode ? '#2B2A3D' : '#EFE6DC',
      border: isNightMode ? '#2B2A3D' : '#DED9D5',
    },
    primary: {
      main: isNightMode ? '#fff' : '#000',
    },
    secondary: {
      main: isNightMode ? '#fff' : '#F8F2EC',
    },
    text: {
      primary: isNightMode ? '#fff' : '#000',
      secondary: isNightMode ? '#B0B0DD' : '#00000066',
    },
  },
  overrides: {
    MuiButton: {
      label: {
        color: isNightMode ? '#fff' : '#000',
      },
    },
    // for dropdown menu items
    MuiButtonBase: {
      root: {
        color: isNightMode ? '#fff' : '#000',
      },
    },
    MuiCheckbox: {
      colorPrimary: {
        color: isNightMode ? '#fff' : '#000',
      },
      colorSecondary: {
        color: isNightMode ? '#fff' : '#000',
      },
    },
  },
});

export default createTheme;
