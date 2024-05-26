import {
  CardContent,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  TextField,
} from '@mui/material'
import { Button } from '../../../components/Button'
import { useCallback, useState } from 'react'
import { IUser } from '../../../models/user'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'

export function UserForm() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<IUser>({
    name: '',
    email: '',
    phone: '',
    address: '',
    birth: '',
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
      const data: IUser = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        birth: userData.birth,
        password: userData.password,
      }

      try {
        const response = await api.post('/api/register', data)
        if (response.status === 200) {
          navigate('/pets')
        }
      } catch (err: any) {
        console.log(err?.response?.statusText)
      }
    },
    [userData, navigate],
  )

  return (
    <Paper elevation={0}>
      <CardContent>
        <Grid container marginBottom={2}>
          <Grid item xs>
            <h2>Cadastro de usuário</h2>
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
                  onChange={(e) =>
                    handleChangeUserData('email', e.target.value)
                  }
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
                  placeholder="Insira o seu CPF"
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
                  onChange={(e) =>
                    handleChangeUserData('phone', e.target.value)
                  }
                ></TextField>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container marginBottom={2}>
            <Grid item xs>
              <Button variant="contained" fullWidth type="submit">
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Paper>
  )
}
