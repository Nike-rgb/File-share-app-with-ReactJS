import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import { useState } from "react";

const breakpoints = {
  sm: 600,
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#9a30b5",
      button: "#365dcc",
    },
    secondary: {
      main: "#1466ce",
      paper: "#fff",
      card: "#fff",
      text: "#808080",
      downloadText: "#b340a5",
      title: "#000",
      subtitle: "#808080",
      success: "#249237",
      error: "#d02b1e",
      online: "#41b9b1",
    },
    breakpoints,
  },
});

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#0a090a",
      button: "#000",
    },
    secondary: {
      main: "#30353c",
      paper: "#30353c",
      card: "#242527",
      text: "#fff",
      downloadText: "#3f84da",
      title: "#fff",
      subtitle: "rgb(210, 210, 210)",
      success: "#282429",
      error: "#0b0c1f",
      online: "#282429",
    },
    breakpoints,
  },
});

const localDb = window.localStorage;

export default function Container(props) {
  const themeObj = JSON.parse(localDb.getItem("theme"));
  const [dark, setDark] = useState(themeObj ? themeObj.dark : false);
  const changeTheme = () => {
    localDb.setItem("theme", JSON.stringify({ dark: !dark }));
    setDark((prevValue) => !prevValue);
  };
  return (
    <ThemeProvider theme={dark ? darkTheme : theme}>
      <App dark={dark} changeTheme={changeTheme} />
    </ThemeProvider>
  );
}
