import styled from '@emotion/styled';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

/* eslint-disable react/jsx-props-no-spreading */
export function Header(props) {
  const { onSidebarOpen, ...other } = props;

  return (
    <NavbarRoot
      sx={{
        left: {
          lg: 280,
        },
        width: {
          lg: 'calc(100% - 280px)',
        },
      }}
      {...other}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}
      >
        <IconButton
          onClick={onSidebarOpen}
          sx={{
            display: {
              xs: 'inline-flex',
              lg: 'none',
            },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
      </Toolbar>
    </NavbarRoot>
  );
}
