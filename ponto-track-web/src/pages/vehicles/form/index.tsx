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
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import { IVehicle } from '../../../models/vehicle'

export function VehicleForm() {
  const navigate = useNavigate()
  const [vehicleData, setVehicleData] = useState<IVehicle>({
    board: '',
    model: '',
    brand: '',
    year: 0,
    color: '',
  })

  const handleChangevehicleData = useCallback(
    (property: string, value: string) => {
      setVehicleData({ ...vehicleData, [property]: value })
    },
    [vehicleData],
  )

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
        const response = await api.post('/api/vehicles', data)
        if (response.status === 200) {
          navigate('/vehicles')
        }
      } catch (err: any) {
        console.log(err?.response)
      }
    },
    [vehicleData, navigate],
  )

  return (
    <Paper elevation={0}>
      <CardContent>
        <Grid container marginBottom={2}>
          <Grid item xs>
            <h2>Cadastro de Veículo</h2>
          </Grid>
        </Grid>

        <form onSubmit={handleSubmit}>
          <Grid container marginBottom={2} marginTop={2}>
            <Grid item xs>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Placa</FormLabel>
                <TextField
                  required
                  placeholder="Placa do veículo"
                  size="small"
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
                  size="small"
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
                  placeholder="Insira a marca do seu veículo"
                  size="small"
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
                  placeholder="Insira o ano do veículo"
                  size="small"
                  value={vehicleData.year}
                  onChange={(e) =>
                    handleChangevehicleData('year', e.target.value)
                  }
                ></TextField>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container marginBottom={2} spacing={3}>
            <Grid item xs>
              <FormControl fullWidth variant="outlined">
                <FormLabel>Cor</FormLabel>
                <TextField
                  required
                  placeholder="Insira a cor do veículo"
                  size="small"
                  value={vehicleData.color}
                  onChange={(e) =>
                    handleChangevehicleData('color', e.target.value)
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
