import CardTodo from './TodoCard';
import './App.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { DataContextProvider } from "./context/context";
const theme = createTheme({
  typography: {
    fontFamily: ["Alex"],
    fontWeightRegular: 100,
  },

  palette: {
    primary: {
      main: "#8e24aa",
    },
    secondary: {
      main: "#fff",
    },
  },
});



function App() {

  
  return (
    <div className="App">
      <header className="App-header">
        <DataContextProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
              <CardTodo />
            </SnackbarProvider>
          </ThemeProvider>
        </DataContextProvider>
      </header>
    </div>
  );
}

export default App;
