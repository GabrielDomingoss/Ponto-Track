import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider } from '@emotion/react'
import theme from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import 'dayjs/locale/pt-br'
import { AuthProvider } from './layout/authProvider'
function App() {
  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
          <GlobalStyle />
        </ThemeProvider>
      </LocalizationProvider>
    </AuthProvider>
  )
}

export default App
