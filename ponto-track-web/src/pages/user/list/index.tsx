import { CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { IUser } from '../../../models/user'
import api from '../../../services/api';

export function UsersList() {
const [users, setUsers] = useState<IUser[]>([]);

  useEffect(()=> {
    const getUsers = async ()=> {
      await api.get('/api/users').then(res=> {
        setUsers(res.data.users)
      })
    }

    getUsers()
  },[])
 
  return (
    <Paper elevation={0}>
      <CardContent>
        <Grid container marginBottom={2}>
          <Grid item xs>
            <h2>Usuários</h2>
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
                  {users.map(user=>( 
                    <TableRow>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  )
}
