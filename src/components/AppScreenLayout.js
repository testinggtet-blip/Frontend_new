import MenuIcon from '@mui/icons-material/Menu';
import { Button, Grid, Hidden } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';

const AppScreenLayout = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Grid
      container
      sx={{
        height: '100vh',
        width: '100vw',
      }}
    >
      {/* Sidebar for mobile */}
      <Hidden mdUp>
        <Grid
          item
          xs={12}
          sx={{
            display: open ? 'block' : 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1200,
            backgroundColor: 'white',
          }}
        >
          <AppSidebar toggleSidebar={toggleSidebar} isOpen={open} />
        </Grid>
      </Hidden>

      {/* Sidebar for desktop */}
      <Hidden mdDown>
        <Grid item md={2} lg={2}>
          <AppSidebar />
        </Grid>
      </Hidden>

      {/* Main Content */}
      <Grid
        item
        xs={12}
        md={10}
        lg={10}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <Button
          sx={{
            position: 'absolute',
            top: 10,
            right: 22,
            zIndex: 10,
            display: { sx: 'block', md: 'none' },
          }}
          onClick={toggleSidebar}
        >
          <MenuIcon sx={{ fontSize: '2rem' }} />
        </Button>
        <Outlet />
      </Grid>
    </Grid>
  );
};
export default AppScreenLayout;
