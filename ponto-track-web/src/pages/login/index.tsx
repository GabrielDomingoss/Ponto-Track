import {
  CardContent,
  FormControl,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material'
import { Button } from '../../components/Button'
import { StyledContainer, StyledPaper } from './styles'
import PontoTrackLogo from '../../../public/ponto-track-nav.png'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../layout/authProvider'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault()
      const data = { email, password }
      try {
        const response = await api.post('/api/login', data)
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', response.data.user.name)
          setAuthenticated(true)
          navigate('/users')
        }
      } catch (err) {
        console.log(err)
      }
    },
    [email, navigate, password, setAuthenticated],
  )
  return (
    <StyledContainer>
      <StyledPaper elevation={0}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item marginTop={'auto'} marginBottom={'auto'}>
              <img
                src={PontoTrackLogo}
                alt="Ponto Track Logo"
                width={140}
                height={70}
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardContent>
          <Grid container>
            <Grid item xs>
              <h3>Entrar na Plataforma</h3>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item marginTop={'auto'} marginBottom={'auto'}>
              <p>Não tem uma conta ?</p>
            </Grid>

            <Grid item>
              <Button variant="text" onClick={() => navigate('/register')}>
                Cadastre-se gratuitamente
              </Button>
            </Grid>
          </Grid>

          <form onSubmit={handleSubmit}>
            <Grid container marginBottom={2} marginTop={2}>
              <Grid item xs>
                <FormControl fullWidth variant="outlined">
                  <FormLabel>Email</FormLabel>
                  <TextField
                    placeholder="Seu email"
                    type="email"
                    required
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></TextField>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container marginBottom={2}>
              <Grid item xs>
                <FormControl fullWidth variant="outlined">
                  <FormLabel>password</FormLabel>
                  <TextField
                    placeholder="Sua password"
                    size="small"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></TextField>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs>
                <Button variant="contained" fullWidth type="submit">
                  Entrar na plataforma
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </StyledPaper>
    </StyledContainer>
  )
}
