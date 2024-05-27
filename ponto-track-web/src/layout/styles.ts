import { Box, styled } from "@mui/material";

export const StyledBox = styled(Box)`
    display: flex;
`

export const Main = styled('main',  { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
    drawerWidth?: number;
  }>(({ theme, open, drawerWidth }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
}));