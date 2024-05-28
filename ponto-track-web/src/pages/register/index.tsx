import { FormControl, FormLabel, Grid, TextField } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useCallback, useState } from 'react'
import dayjs from 'dayjs'
import { Button } from '../../components/Button'
import api from '../../services/api'
import { StyledContainer } from './styles'
import { DatePicker } from '@mui/x-date-pickers'

export default function Register() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    birth: dayjs(),
    password: '',
  })

  const handleChangeUserData = useCallback(
    (property: string, value: string) => {
      setUserData({ ...userData, [property]: value })
    },
    [userData],
  )

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault()
      const data = {
        name: userData.name,
        email: userData.email,
        address: userData.address,
        phone: userData.phone,
        password: userData.password,
      }

      try {
        const response = await api.post('/api/users', data)
        if (response.status === 200) {
          navigate('/login')
        }
      } catch (err: any) {
        console.log(err?.response?.statusText)
      }
    },
    [userData, navigate],
  )

  return (
    <StyledContainer maxWidth={'md'}>
      <Grid container marginBottom={2}>
        <Grid item xs>
          <Button
            variant="text"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/login')}
          >
            Voltar
          </Button>
        </Grid>
      </Grid>

      <Grid container marginBottom={2}>
        <Grid item xs>
          <h2>Cadastre-se</h2>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item marginTop={'auto'} marginBottom={'auto'}>
          <p>Já possui uma conta?</p>
        </Grid>

        <Grid item>
          <Button variant="text" onClick={() => navigate('/login')}>
            Entrar na plataforma
          </Button>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit}>
        <Grid container marginBottom={2} marginTop={2}>
          <Grid item xs>
            <FormControl fullWidth variant="outlined">
              <FormLabel>Nome</FormLabel>
              <TextField
                required
                placeholder="Seu nome"
                size="small"
                value={userData.name}
                onChange={(e) => handleChangeUserData('name', e.target.value)}
              ></TextField>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container marginBottom={2}>
          <Grid item xs>
            <FormControl fullWidth variant="outlined">
              <FormLabel>E-mail</FormLabel>
              <TextField
                required
                placeholder="Insira o seu e-mail"
                size="small"
                value={userData.email}
                onChange={(e) => handleChangeUserData('email', e.target.value)}
              ></TextField>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container marginBottom={2} spacing={3}>
          <Grid item xs>
            <FormControl fullWidth variant="outlined">
              <FormLabel>Endereço</FormLabel>
              <TextField
                required
                placeholder="Insira o seu endereço"
                size="small"
                value={userData.address}
                onChange={(e) =>
                  handleChangeUserData('address', e.target.value)
                }
              ></TextField>
            </FormControl>
          </Grid>

          <Grid item xs>
            <FormControl fullWidth variant="outlined">
              <FormLabel>Telefone</FormLabel>
              <TextField
                required
                placeholder="Insira o seu telefone"
                size="small"
                value={userData.phone}
                onChange={(e) => handleChangeUserData('phone', e.target.value)}
              ></TextField>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container marginBottom={1} spacing={3}>
          <Grid item xs>
            <FormControl fullWidth variant="outlined">
              <FormLabel>Data de Nascimento</FormLabel>
              <DatePicker
                value={dayjs(userData.birth)}
                onChange={(newValue) =>
                  handleChangeUserData(
                    'birth',
                    dayjs(newValue).format('YYYY-MM-DD'),
                  )
                }
                slotProps={{
                  textField: {
                    required: true,
                    size: 'small',
                    placeholder: 'Insira sua data de nascimento',
                  },
                }}
              ></DatePicker>
            </FormControl>
          </Grid>
          <Grid item xs>
            <FormControl fullWidth variant="outlined">
              <FormLabel>Senha</FormLabel>
              <TextField
                required
                placeholder="Crie uma senha"
                size="small"
                type="password"
                value={userData.password}
                onChange={(e) =>
                  handleChangeUserData('password', e.target.value)
                }
              ></TextField>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container marginBottom={2}>
          <Grid item xs>
            <Button variant="contained" fullWidth type="submit">
              Criar conta
            </Button>
          </Grid>
        </Grid>
      </form>
    </StyledContainer>
  )
}
