import ExploreIcon from '@material-ui/icons/Explore';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MoreIcon from '@mui/icons-material/MoreVert';
import AppBar from '@mui/material/AppBar';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authstore } from '../context/AuthContext';
import instagram_icon from '../images/insta.jpg';

const useStyles = makeStyles({
  appb: {
    background: 'white'
  },
  homeicon: {
    marginRight: '2rem',
    cursor: "pointer"
  },
  exploreicon: {
    marginRight: '1.4rem',
    cursor: "pointer"
  }
})



export default function Navbar({ UserData }) {
  const history = useNavigate();
  const { logout } = useContext(Authstore);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const classes = useStyles()

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleexplore = () => {
    let win = window.open('https://watch-it-drop.netlify.app/', '_blank')
    win.focus();
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handlelogout = async () => {
    await logout();
    history('/login')
  }
  const handlebannerclick = () => {
    history('/')
  }
  const handleprofile = () => {
    history(`/profile/${UserData.userId}`)
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleprofile}><AccountCircleIcon /><p>&nbsp;&nbsp;</p>Profile</MenuItem>
      <MenuItem onClick={handlelogout}><ExitToAppIcon /><p>&nbsp;&nbsp;</p>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleprofile}><AccountCircleIcon /><p>&nbsp;&nbsp;</p>Profile</MenuItem>
      <MenuItem onClick={handlelogout}><ExitToAppIcon /><p>&nbsp;&nbsp;</p>Logout</MenuItem>

    </Menu>
  );

  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ background: 'white' }}>
        <Toolbar>
          <div className='insta-icon1'>
            <img src={instagram_icon} onClick={handlebannerclick} />
          </div>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, color: 'black', alignItems: 'center', marginRight: '3rem' }}>

            <HomeIcon onClick={handlebannerclick} className={classes.homeicon} />
            <ExploreIcon onClick={handleexplore} className={classes.exploreicon} />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >


              <Avatar src={UserData?.profileUrl} sx={{ height: '2rem', width: '2rem' }} />

            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
