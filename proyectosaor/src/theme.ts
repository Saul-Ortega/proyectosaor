import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7e22fe',
    },
    secondary: {
      main: '#2d8e0e',
    },
    background: {
      default: '#121212',
    },
  },
  typography: {
    fontFamily: 'Momo Trust Display',
  },
});

export default theme