import { BrowserRouter } from "react-router-dom"
import { Router } from "./router"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider } from "@emotion/react"
import theme from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <GlobalStyle/>
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default App
