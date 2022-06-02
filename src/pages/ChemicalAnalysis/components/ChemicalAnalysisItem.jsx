import { IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

const ContainerItem = styled(Box)`
  padding: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  :last-child {
    border-bottom: none;
  }
`;

export function ChemicalAnalysisItem({ item, onEdit, onReview, onRemove }) {
  return (
    <ContainerItem>
      <Box flexGrow={1}>{item.title}</Box>
      <Box>
        <Tooltip title="Editar">
          <IconButton onClick={() => onEdit(item)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        <Tooltip title="Revisar">
          <IconButton onClick={() => onReview(item)}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        <Tooltip title="Eliminar">
          <IconButton onClick={() => onRemove(item)}>
            <RemoveCircleIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </ContainerItem>
  );
}
