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

function MenuAppBar() {
  const userData = useSelector( (state: RootState) => state.authentication );
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const listNavigation = ['/home', '/reports', '', "/"]
  const listIcons = [<HomeIcon />, <BookIcon />, <HelpIcon />, <ExitToAppIcon />]

  const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
              {['Inicio', 'Informes', 'Ayuda', 'Salir'].map((text, index) => (
            <Link to={listNavigation[index]} key={text} style={{textDecoration:'none', color:'black'}}>
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {listIcons[index]}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
            </Link>
              ))}
          </List>
      </Box>
  )

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
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userData.userName}
          </Typography>
          {userData.isAutenticated && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                {userData.userRole === 'admin' ? <ShieldIcon /> : <AccountCircle />}
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MenuAppBar