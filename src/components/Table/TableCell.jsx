import { TableCell as TableCellBase } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TableCell = styled(TableCellBase)(({ theme }) => ({
  padding: theme.spacing(1),
}));
