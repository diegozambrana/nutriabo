import { IconButton, InputBase, Typography, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components';
import { ChemicalAnalysisItem } from './components/ChemicalAnalysisItem';
import { Dialog } from '../../components/Dialog';

export function ChemicalAnalysisList() {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [current, setCurrent] = useState({ title: '' });
  const navigate = useNavigate();

  const handleOnEdit = (item) => {
    navigate(`/chemical-analysis/${item.id}/edit`);
  };
  const handleOnReview = (item) => {
    navigate(`/chemical-analysis/${item.id}`);
  };
  const handleOnRemove = (item) => {
    setCurrent(item);
    setShowRemoveDialog(true);
  };

  const onCreate = () => navigate(`/chemical-analysis/create`);

  return (
    <Card>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h5" component="h2">
            Análisis Químico{' '}
          </Typography>
        </Box>
        <Box mr={2}>
          <Button variant="contained" onClick={onCreate}>
            Nuevo
          </Button>
        </Box>
        <Box>
          <InputBase placeholder="Buscar" />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      <Box mt={2} mb={2}>
        <ChemicalAnalysisItem
          item={{ title: 'Test', id: 'test' }}
          onEdit={handleOnEdit}
          onReview={handleOnReview}
          onRemove={handleOnRemove}
        />
        <ChemicalAnalysisItem
          item={{ title: 'Test 1', id: 'test-2' }}
          onEdit={handleOnEdit}
          onReview={handleOnReview}
          onRemove={handleOnRemove}
        />
        <ChemicalAnalysisItem
          item={{ title: 'Test 2', id: 'test-3' }}
          onEdit={handleOnEdit}
          onReview={handleOnReview}
          onRemove={handleOnRemove}
        />
      </Box>

      <Dialog
        open={showRemoveDialog}
        handleClose={() => setShowRemoveDialog(false)}
        title="Eliminar Analisis Químico?"
        onAccept={() => {}}
        onCancel={() => setShowRemoveDialog(false)}
        contentText={`Esta seguro que desea eliminar permanentemente el analisis quimico ${current.title}?`}
      />
    </Card>
  );
}
