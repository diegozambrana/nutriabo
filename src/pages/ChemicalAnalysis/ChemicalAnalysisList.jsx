import { useState } from 'react';
import {
  IconButton,
  InputBase,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components';
import { Dialog } from '../../components/Dialog';
import { GET_CHEMICAL_ANALYSIS_LIST } from '../../graphql/chemicalAnalysis/query';
import { DELETE_CHEMICAL_ANALYSIS } from '../../graphql/chemicalAnalysis/mutation';
import { ChemicalAnalysisItem } from './components/ChemicalAnalysisItem';

export function ChemicalAnalysisList() {
  const [current, setCurrent] = useState({ title: '' });
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const { data, loading, refetch } = useQuery(GET_CHEMICAL_ANALYSIS_LIST);
  const [DeleteChemicalAnalysis, { loading: loadingDelete }] = useMutation(
    DELETE_CHEMICAL_ANALYSIS,
  );
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

  const onDelete = () => {
    if (loadingDelete) return;
    DeleteChemicalAnalysis({ variables: { id: current.id } }).then(() => {
      setShowRemoveDialog(false);
      refetch();
    });
  };

  const onCreate = () => navigate(`/chemical-analysis/create`);

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

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
        {data?.getChemicalAnalysisList?.length === 0 && (
          <Box color="gray" textAlign="center" pb={3} pt={4}>
            No tienes ningun Analisis Químico.
            <br />
            Puedes crear uno haciendo clic en el botón <strong>Nuevo</strong>
          </Box>
        )}
        {data?.getChemicalAnalysisList?.map((element) => (
          <ChemicalAnalysisItem
            key={element.id}
            item={element}
            onEdit={handleOnEdit}
            onReview={handleOnReview}
            onRemove={handleOnRemove}
          />
        ))}
      </Box>

      <Dialog
        open={showRemoveDialog}
        handleClose={() => setShowRemoveDialog(false)}
        title="Eliminar Analisis Químico?"
        onAccept={() => onDelete()}
        onCancel={() => setShowRemoveDialog(false)}
        contentText={`Esta seguro que desea eliminar permanentemente el analisis quimico ${current.title}?`}
      />
    </Card>
  );
}
