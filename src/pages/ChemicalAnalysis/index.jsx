import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Box } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useNavigate } from 'react-router-dom';
import {
  addFoodTime,
  updateTitle,
  updateDescription,
  updateAdequacy,
  updateId,
} from '../../redux/slices/diet';
import {
  CardFood,
  EditBlockText,
  TotalTable,
  EditText,
} from '../../components';
import { getAliments } from '../../redux/slices/aliments';
import { UpdateMolecular } from './components/UpdateMolecular';
import { calculateAdequacy } from '../../utils/handlers';
import {
  CREATE_CHEMICAL_ANALYSIS,
  UPDATE_CHEMICAL_ANALYSIS,
} from '../../graphql/chemicalAnalysis/mutation';
import { useChemicalAnalysisData } from '../../hooks/useChecmicalAnalysisData';
import { Dialog } from '../../components/Dialog';

export function ChemicalAnalysis() {
  const { getCreateChemicalAnalysisVars } = useChemicalAnalysisData();
  const [openedMD, setOpenedMD] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [CreateChemicalAnalysis, { loading }] = useMutation(
    CREATE_CHEMICAL_ANALYSIS,
  );
  const [UpdateChemicalAnalysis, { loading: loadingUpdate }] = useMutation(
    UPDATE_CHEMICAL_ANALYSIS,
  );
  const {
    id,
    foodTimes,
    titleDiet,
    descriptionDiet,
    total,
    adequacy,
    molecularDistribution,
  } = useSelector((s) => s.diet);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setOpenedMD(true);
    }
  }, [id]);

  useEffect(() => {
    dispatch(getAliments());
  }, []);

  useEffect(() => {
    dispatch(updateAdequacy(calculateAdequacy(total, molecularDistribution)));
  }, [total, molecularDistribution]);

  const handleSave = () => {
    if (id) {
      UpdateChemicalAnalysis({ variables: getCreateChemicalAnalysisVars() })
        .then(() => {
          setShowSaveDialog(true);
        })
        .catch((err) => {
          console.error(`err:`, err.message);
        });
    } else {
      CreateChemicalAnalysis({ variables: getCreateChemicalAnalysisVars() })
        .then((response) => {
          dispatch(
            updateId(response.data.CreateChemicalAnalysis.chemicalAnalysis.id),
          );
          setShowSaveDialog(true);
        })
        .catch((err) => {
          console.error(`err:`, err.message);
        });
    }
  };

  const handleExport = () => {
    // TODO: update export button
  };

  const controlBar = (
    <Box display="flex" justifyContent="flex-end">
      <Box>
        <Button
          onClick={() => setOpenedMD(true)}
          variant="contained"
          size="small"
        >
          Valor Molecular
        </Button>
      </Box>
      <Box ml={1}>
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={<SaveIcon />}
          size="small"
          disabled={loading || loadingUpdate}
        >
          {loading || loadingUpdate ? 'Guardando' : 'Guardar'}
        </Button>
      </Box>
      <Box ml={1}>
        <Button
          onClick={handleExport}
          startIcon={<FileDownloadIcon />}
          size="small"
          variant="outlined"
        >
          Export
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box>
      {controlBar}
      <Box>
        <Box mb={1}>
          <EditText
            value={titleDiet}
            variant="h5"
            onComplete={(text) => {
              dispatch(updateTitle(text));
            }}
          />
        </Box>
        <Box mb={1}>
          <EditBlockText
            value={descriptionDiet}
            onComplete={(text) => {
              dispatch(updateDescription(text));
            }}
          />
        </Box>
      </Box>

      {foodTimes.map((foodTime, index) => (
        <CardFood
          foodTimeData={foodTime}
          index={index}
          key={`food__time__${foodTime.name}`}
        />
      ))}
      <Button
        onClick={() => dispatch(addFoodTime())}
        variant="contained"
        size="small"
        startIcon={<AddIcon />}
      >
        Nuevo Tiempo de comida
      </Button>

      <TotalTable totalData={total} adequacyData={adequacy} />

      <UpdateMolecular
        open={openedMD}
        handleClose={() => setOpenedMD(false)}
        onAccept={() => setOpenedMD(false)}
      />
      {controlBar}

      <Dialog
        open={showSaveDialog}
        handleClose={() => setShowSaveDialog(false)}
        title="Analisis Químico Guardado"
        onAccept={() => {
          navigate('/chemical-analysis');
        }}
        onCancel={() => setShowSaveDialog(false)}
        contentText="Desea Volver a atras?"
        acceptText="Volver"
        cancelText="Continuar Editando"
      />
    </Box>
  );
}
