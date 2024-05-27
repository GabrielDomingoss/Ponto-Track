import { DrawerHeader, StyledDrawer } from './styles'
import { Header } from '../header'
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  CarRentalOutlined,
  ChevronLeft,
  ChevronRight,
  Person,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

interface CustomDrawerProps {
  open: boolean
  handleDrawerOpen: () => void
  handleDrawerClose: () => void
  theme: any
  drawerWidth: number
}

export function Drawer({
  open,
  handleDrawerOpen,
  handleDrawerClose,
  theme,
  drawerWidth,
}: CustomDrawerProps) {
  const navigate = useNavigate()
  return (
    <div>
      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        drawerWidth={drawerWidth}
      />
      <StyledDrawer
        drawerWidth={drawerWidth}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme?.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Usuário', 'Veículos'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  index % 2 === 0 ? navigate('/users') : navigate('/vehicles')
                }}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <Person /> : <CarRentalOutlined />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </StyledDrawer>
    </div>
  )
}
