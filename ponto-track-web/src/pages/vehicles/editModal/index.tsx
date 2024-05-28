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
import { IVehicle } from '../../../models/vehicle'
import api from '../../../services/api'
import { Button } from '../../../components/Button'

interface EditVehicleModalProps {
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
}: EditVehicleModalProps) {
  const [vehicleData, setVehicleData] = useState<IVehicle>({
    board: '',
    model: '',
    brand: '',
    year: 1,
    color: '',
  })
  const handleChangevehicleData = useCallback(
    (property: string, value: string | number) => {
      console.log(typeof value)
      setVehicleData({ ...vehicleData, [property]: value })
    },
    [vehicleData],
  )

  useEffect(() => {
    const handleGetvehicleData = async () => {
      try {
        const response = await api.get(`/api/vehicles/${id}`)
        if (response.status === 200) {
          const responseData = response.data.vehicle
          const vehicle = {
            board: responseData.board,
            model: responseData.model,
            brand: responseData.brand,
            year: responseData.year,
            color: responseData.color,
          }
          setVehicleData(vehicle)
        }
      } catch (err: any) {
        console.log(err?.response)
      }
    }

    if (id) {
      handleGetvehicleData()
    }
  }, [id])

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault()
      const data: IVehicle = {
        board: vehicleData.board,
        model: vehicleData.model,
        brand: vehicleData.brand,
        year: vehicleData.year,
        color: vehicleData.color,
      }

      try {
        const response = await api.put(`/api/vehicles/${id}`, data)
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
      vehicleData.board,
      vehicleData.brand,
      vehicleData.color,
      vehicleData.model,
      vehicleData.year,
    ],
  )
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        {isEdit ? 'Editar Veículo' : 'Visualizar Veículo'}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container marginBottom={2} marginTop={2}>
            <Grid item xs>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Placa</FormLabel>
                <TextField
                  required
                  placeholder="Placa do Veículo"
                  disabled={!isEdit}
                  value={vehicleData.board}
                  onChange={(e) =>
                    handleChangevehicleData('board', e.target.value)
                  }
                ></TextField>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container marginBottom={2}>
            <Grid item xs>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Modelo</FormLabel>
                <TextField
                  required
                  placeholder="Insira o modelo do veículo"
                  disabled={!isEdit}
                  value={vehicleData.model}
                  onChange={(e) =>
                    handleChangevehicleData('model', e.target.value)
                  }
                ></TextField>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container marginBottom={2} spacing={3}>
            <Grid item xs>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Marca</FormLabel>
                <TextField
                  required
                  placeholder="Insira a marca do veículo"
                  disabled={!isEdit}
                  value={vehicleData.brand}
                  onChange={(e) =>
                    handleChangevehicleData('brand', e.target.value)
                  }
                ></TextField>
              </FormControl>
            </Grid>

            <Grid item xs>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Ano</FormLabel>
                <TextField
                  required
                  placeholder="Insira o ano do seu veículo"
                  disabled={!isEdit}
                  value={Number(vehicleData.year)}
                  onChange={(e) => {
                    handleChangevehicleData('year', Number(e.target.value))
                  }}
                ></TextField>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container marginBottom={2} spacing={3}>
            <Grid item xs>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Color</FormLabel>
                <TextField
                  required
                  placeholder="Insira a cor do seu veículo"
                  disabled={!isEdit}
                  value={vehicleData.color}
                  onChange={(e) =>
                    handleChangevehicleData('color', e.target.value)
                  }
                ></TextField>
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
