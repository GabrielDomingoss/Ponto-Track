import {
  CardContent,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { IUser } from '../../../models/user'
import api from '../../../services/api'
import { Article, Delete, Edit } from '@mui/icons-material'
import { EditModal } from '../editModal'
import { Button } from '../../../components/Button'
import { useNavigate } from 'react-router-dom'

export function UsersList() {
  const [users, setUsers] = useState<IUser[]>([])
  const [id, setId] = useState<string | undefined>('')
  const [isEdit, setIsEdit] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  useEffect(() => {
    const getUsers = async () => {
      await api.get('/api/users').then((res) => {
        setUsers(res.data.users)
      })
    }

    getUsers()
  }, [])

  const getUsers = async () => {
    await api.get('/api/users').then((res) => {
      setUsers(res.data.users)
    })
  }

  const handleDelete = useCallback(
    async (e: { preventDefault: () => void }, idUser?: string) => {
      e.preventDefault()

      if (idUser) {
        await api.delete(`/api/users/${idUser}`).then(() => {
          getUsers()
        })
      } else {
        throw new Error('there is no id to delete')
      }
    },
    [],
  )

  const handleEdit = (row: IUser, isEdit: boolean) => {
    setId(row.id)
    setOpenDetailModal(true)
    setIsEdit(isEdit)
  }

  const handleClose = () => {
    setId('')
    setOpenDetailModal(false)
    setIsEdit(false)
    getUsers()
  }

  const navigate = useNavigate()
  return (
    <Paper elevation={0}>
      <CardContent>
        <Grid container marginBottom={2}>
          <Grid item xs>
            <h2>Usuários</h2>
          </Grid>
        </Grid>

        <Grid container marginBottom={2}>
          <Grid item xs display={'flex'} justifyContent={'end'}>
            <Button
              onClick={() => navigate('/users/form')}
              size="small"
              variant="contained"
            >
              Cadastrar usuário
            </Button>
          </Grid>
        </Grid>

        <Grid container marginTop={5}>
          <Grid item xs>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Telefone</TableCell>
                  <TableCell>Ações</TableCell>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(user, true)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={(e) => handleDelete(e, user.id)}>
                          <Delete />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(user, false)}>
                          <Article />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
      <EditModal
        open={openDetailModal}
        handleClose={handleClose}
        isEdit={isEdit}
        id={id}
      ></EditModal>
    </Paper>
  )
}
