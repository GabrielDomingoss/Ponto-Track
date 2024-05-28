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
import api from '../../../services/api'
import { Article, Delete, Edit } from '@mui/icons-material'
import { EditModal } from '../editModal'
import { Button } from '../../../components/Button'
import { useNavigate } from 'react-router-dom'
import { IVehicle } from '../../../models/vehicle'

export function VehiclesList() {
  const [vehicles, setVehicles] = useState<IVehicle[]>([])
  const [id, setId] = useState<string | undefined>('')
  const [isEdit, setIsEdit] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  useEffect(() => {
    const getvehicles = async () => {
      await api.get('/api/vehicles').then((res) => {
        setVehicles(res.data.vehicles)
      })
    }

    getvehicles()
  }, [])

  const getvehicles = async () => {
    await api.get('/api/vehicles').then((res) => {
      setVehicles(res.data.vehicles)
    })
  }

  const handleDelete = useCallback(
    async (e: { preventDefault: () => void }, idUser?: string) => {
      e.preventDefault()

      if (idUser) {
        await api.delete(`/api/vehicles/${idUser}`).then(() => {
          getvehicles()
        })
      } else {
        throw new Error('there is no id to delete')
      }
    },
    [],
  )

  const handleEdit = (row: IVehicle, isEdit: boolean) => {
    setId(row.id)
    setOpenDetailModal(true)
    setIsEdit(isEdit)
  }

  const handleClose = () => {
    setId('')
    setOpenDetailModal(false)
    setIsEdit(false)
    getvehicles()
  }

  const navigate = useNavigate()
  return (
    <Paper elevation={0}>
      <CardContent>
        <Grid container marginBottom={2}>
          <Grid item xs>
            <h2>Veículos</h2>
          </Grid>
        </Grid>

        <Grid container marginBottom={2}>
          <Grid item xs display={'flex'} justifyContent={'end'}>
            <Button
              onClick={() => navigate('/vehicles/form')}
              size="small"
              variant="contained"
            >
              Cadastrar veículo
            </Button>
          </Grid>
        </Grid>

        <Grid container marginTop={5}>
          <Grid item xs>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>Placa</TableCell>
                  <TableCell>Modelo</TableCell>
                  <TableCell>Marca</TableCell>
                  <TableCell>Ano</TableCell>
                  <TableCell>Ações</TableCell>
                </TableHead>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell>{vehicle.board}</TableCell>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell>{vehicle.brand}</TableCell>
                      <TableCell>{vehicle.year}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(vehicle, true)}>
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={(e) => handleDelete(e, vehicle.id)}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(vehicle, false)}>
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
