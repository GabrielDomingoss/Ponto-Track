import { Drawer, DrawerProps, styled } from "@mui/material";

interface DrawerCustomProps extends DrawerProps {
    drawerWidth?: number;
    open: boolean;
}

export const StyledDrawer = styled(Drawer)<DrawerCustomProps>(({drawerWidth, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    },
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));