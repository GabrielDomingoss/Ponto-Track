import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import { Button } from '../Button'
import { KeyboardArrowDown, Logout } from '@mui/icons-material'
import { StyledAvatar } from './styles'
import { useEffect, useState } from 'react'
import { useAuth } from '../../layout/authProvider'

export function UserMenu() {
  const [initialUsername, setInitialUsername] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { logout } = useAuth()

  useEffect(() => {
    const username = localStorage.getItem('username')
    if (username) {
      setInitialUsername(username[0].toUpperCase())
    }
  }, [])
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleClose()
  }

  return (
    <div>
      <Button
        size="small"
        variant="text"
        className="menuAvatarButton"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        endIcon={<KeyboardArrowDown />}
      >
        <StyledAvatar>{initialUsername}</StyledAvatar>
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}
