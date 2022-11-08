import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

// const PRIMARY = {
//   lighter: "#FFD07F",
//   light: "#FDA65D",
//   main: "#FF8243",
//   dark: "#E26A2C",
//   darker: "#cc571f",
//   contrastText: "#FFF",
// };
// const SECONDARY = {
//   lighter: "#D6E4FF",
//   light: "#84A9FF",
//   main: "#3366FF",
//   dark: "#1939B7",
//   darker: "#091A7A",
//   contrastText: "#FFF",
// };
// const SUCCESS = {
//   lighter: "#E9FCD4",
//   light: "#AAF27F",
//   main: "#54D62C",
//   dark: "#229A16",
//   darker: "#08660D",
//   contrastText: "#FFF",
// };

function ThemeProvider({ children }) {
  const themeOptions = {
    typography: {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
    shape: { borderRadius: 8 },
    palette: {
      mode: "dark",
    },
  };

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
