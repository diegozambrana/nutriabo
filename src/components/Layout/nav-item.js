import { Box, Button, ListItem } from '@mui/material';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';

/* eslint-disable react/jsx-props-no-spreading */
export function NavItem(props) {
  const { href, icon, title, ...others } = props;
  const resolved = useResolvedPath(href);
  const active = useMatch({ path: resolved.pathname, end: true });

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <Box width="100%">
        <Button
          component={NavLink}
          to={href}
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && 'rgba(255,255,255, 0.08)',
            borderRadius: 1,
            color: active
              ? 'secondary.main'
              : 'rgba(255,255,255,0.8) !important',
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100% !important',
            '& .MuiButton-startIcon': {
              color: active
                ? 'secondary.main'
                : 'rgba(255,255,255,0.8) !important',
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)',
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </Box>
    </ListItem>
  );
}
