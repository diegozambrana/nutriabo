import { Box, Button, ListItem } from '@mui/material';
/* eslint-disable react/jsx-props-no-spreading */
export function NavItem(props) {
  const { href, icon, title, ...others } = props;

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
      <Box passHref>
        <Button component="a" startIcon={icon} disableRipple>
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </Box>
    </ListItem>
  );
}
