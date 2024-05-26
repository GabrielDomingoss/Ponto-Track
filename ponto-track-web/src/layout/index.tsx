import { Outlet } from "react-router-dom";
import { Drawer } from "../components/drawer";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { Main, StyledBox } from "./styles";
import { DrawerHeader } from "../components/drawer/styles";
import { Container, CssBaseline, Grid } from "@mui/material";
const drawerWidth = 240;

export function DefaultLayout() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    return (
        <StyledBox>
            <CssBaseline />
            <Drawer 
                open={open} 
                theme={theme} 
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
                drawerWidth={drawerWidth}
            />
            <Main open={open} drawerWidth={drawerWidth}>
                <DrawerHeader />
                <Container>
                <Grid marginTop={3}>
                    <Outlet />
                </Grid>
                </Container>
            </Main>
        </StyledBox>
    )
}