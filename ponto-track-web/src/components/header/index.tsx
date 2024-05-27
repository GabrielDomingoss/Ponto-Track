import { Menu } from "@mui/icons-material";
import { AppBarProps, Grid, IconButton, Toolbar } from "@mui/material";
import { AppBar } from "./styles";
import PontoTrackNav from '/ponto-track-nav.png'
import { Link } from "react-router-dom";

interface HeaderProps extends AppBarProps{
    open: boolean;
    handleDrawerOpen: () => void;
    drawerWidth?: number;
}

export function Header({open, handleDrawerOpen, drawerWidth=240, ...props}: HeaderProps) {
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

                <Grid container>
                    <Grid item padding={1} marginTop={"auto"} marginBottom={"auto"}>
                        <Link to={'/'}>
                            <img src={PontoTrackNav} width={90} height={50} alt="Navbar logo" />
                        </Link>
                    </Grid>
                </Grid>
                {/* <Typography variant="h6" noWrap component="div">
                    Persistent drawer
                </Typography> */}
            </Toolbar>
        </AppBar>
    )
}