import React from 'react';
import { Paper, Box } from '@mui/material';

export function Card({ children }) {
  return (
    <Paper style={{ margin: '16px 0' }}>
      <Box p={2}>{children}</Box>
    </Paper>
  );
}
