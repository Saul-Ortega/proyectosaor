import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShieldIcon from '@mui/icons-material/Shield';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from "react-router";
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

function MenuAppBar() {
  const userData = useSelector( (state: RootState) => state.authentication );
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const listNavigation = ['/home', '/reports', '/MANUAL_DE_USUARIO.pdf', "/"]
  const listIcons = [<HomeIcon />, <BookIcon />, <HelpIcon />, <ExitToAppIcon />]
  const listText = ['Inicio', 'Informes', 'Ayuda', 'Salir'];
  const listTooltip = ["Navegar a página de Inicio", "Navegar a página de Informes", 
    "Descargar Manual de usuario", "Salir de la aplicación"];

  const isLoggedin = userData.isAutenticated
  
  useEffect(() => {
    if (!isLoggedin) {
      navigate('/')
    }
  }, [isLoggedin])

  return (
    <Box sx={{ flexGrow: 1, position: 'sticky', top: 0, marginBottom: '60px' }}>
      <AppBar>
        <Toolbar>
          <Tooltip title="Menú Desplegable" placement='bottom' arrow>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />

            </IconButton>
          </Tooltip>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
              <List>
                  {listText.map((text, index) => (
                    userData.userRole !== 'admin' && text === 'Informes' ?
                    <></>
                  : 
                    <Link to={listNavigation[index]} key={text} target={text === "Ayuda" ? "_blank" : ""} 
                    style={{textDecoration:'none', color:'black'}}>
                        <ListItem key={text} disablePadding>
                          <Tooltip title={listTooltip[index]} placement='right' arrow>
                            <ListItemButton>
                              <ListItemIcon>
                                {listIcons[index]}
                              </ListItemIcon>
                              <ListItemText primary={text} />
                            </ListItemButton>
                          </Tooltip>
                        </ListItem>
                    </Link>
                  ))}
              </List>
            </Box>
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userData.userName}
          </Typography>
          {userData.isAutenticated && (
            <div>
              <Tooltip title="Rol de usuario" placement='bottom' arrow>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  {userData.userRole === 'admin' ? <ShieldIcon /> : <AccountCircle />}
                </IconButton>
              </Tooltip>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MenuAppBar