import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { IUser } from '../../../models/user'
import api from '../../../services/api'
import { Button } from '../../../components/Button'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

interface EditUserModalProps {
  isEdit: boolean
  handleClose: () => void
  id?: string
  open: boolean
}
export function EditModal({
  isEdit,
  handleClose,
  id,
  open,
}: EditUserModalProps) {
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

  useEffect(() => {
    const handleGetUserData = async () => {
      try {
        const response = await api.get(`/api/users/${id}`)
        if (response.status === 200) {
          const responseData = response.data.user
          const dateBirthFormated = responseData.birth.split('-')
          const user = {
            name: responseData.name,
            email: responseData.email,
            phone: responseData.phone,
            address: responseData.address,
            password: responseData.password,
            birth:
              dateBirthFormated[0] +
              '-' +
              dateBirthFormated[1] +
              '-' +
              dateBirthFormated[2],
          }
          setUserData(user)
        }
      } catch (err: any) {
        console.log(err?.response)
      }
    }

    if (id) {
      handleGetUserData()
    }
  }, [id])

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault()
      const data: IUser = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        birth: userData.birth,
        password: 'senha123',
      }

      try {
        const response = await api.put(`/api/users/${id}`, data)
        if (response.status === 201) {
          handleClose()
        }
      } catch (err: any) {
        console.log(err?.response)
      }
    },
    [
      handleClose,
      id,
      userData.address,
      userData.birth,
      userData.email,
      userData.name,
      userData.phone,
    ],
  )
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        {isEdit ? 'Editar Usuário' : 'Visualizar Usuário'}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container marginBottom={2} marginTop={2}>
            <Grid item xs>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Nome</FormLabel>
                <TextField
                  required
                  placeholder="Seu nome"
                  disabled={!isEdit}
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
                  disabled={!isEdit}
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
                  placeholder="Insira o seu endereço"
                  disabled={!isEdit}
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
                  disabled={!isEdit}
                  value={userData.phone}
                  onChange={(e) =>
                    handleChangeUserData('phone', e.target.value)
                  }
                ></TextField>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container marginBottom={2} spacing={3}>
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
                  disabled={!isEdit}
                  slotProps={{
                    textField: {
                      disabled: !isEdit,
                      required: true,
                      size: 'small',
                      placeholder: 'Insira sua data de nascimento',
                    },
                  }}
                ></DatePicker>
              </FormControl>
            </Grid>
          </Grid>

          <Grid
            container
            marginBottom={2}
            spacing={3}
            display={'flex'}
            justifyContent={'end'}
          >
            <Grid item xs>
              <Button variant="contained" fullWidth onClick={handleClose}>
                {isEdit ? 'Cancelar' : 'Fechar'}
              </Button>
            </Grid>
            {isEdit && (
              <Grid item xs>
                <Button variant="contained" fullWidth type="submit">
                  {isEdit ? 'Salvar' : 'Cadastrar'}
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  )
}
