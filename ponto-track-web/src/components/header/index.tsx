import { Menu } from '@mui/icons-material'
import { AppBarProps, Grid, IconButton, Toolbar } from '@mui/material'
import { AppBar } from './styles'
import PontoTrackNav from '../../../public/ponto-track-nav.png'
import { Link } from 'react-router-dom'
import { UserMenu } from '../userMenu'

interface HeaderProps extends AppBarProps {
  open: boolean
  handleDrawerOpen: () => void
  drawerWidth?: number
}

export function Header({
  open,
  handleDrawerOpen,
  drawerWidth = 240,
  ...props
}: HeaderProps) {
  return (
    <AppBar position="fixed" drawerWidth={drawerWidth} open={open} {...props}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <Menu />
        </IconButton>

        <Grid container display="flex" justifyContent={'space-between'}>
          <Grid item padding={1} marginTop={'auto'} marginBottom={'auto'}>
            <Link to={'/'}>
              <img
                src={PontoTrackNav}
                width={90}
                height={50}
                alt="Navbar logo"
              />
            </Link>
          </Grid>
          <Grid item marginTop={'auto'} marginBottom={'auto'}>
            <UserMenu></UserMenu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
