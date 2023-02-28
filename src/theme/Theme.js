import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#f2c94c'
        },
        secondary: {
            main: '#3b3e46'
        },
        background: {
            main: '#2d2f36',
            dark: '#1c1d1f',
            light: '#3f414b'
        },
        text: {
            main: '#ededed'
        }
    },
});

export default theme;