import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  addFoodTime,
  updateTitle,
  updateDescription,
  updateAdequacy,
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

export function ChemicalAnalysis() {
  const [openedMD, setOpenedMD] = useState(false);
  const {
    foodTimes,
    titleDiet,
    descriptionDiet,
    total,
    adequacy,
    molecularDistribution,
  } = useSelector((s) => s.diet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAliments());
  }, []);

  useEffect(() => {
    dispatch(updateAdequacy(calculateAdequacy(total, molecularDistribution)));
  }, [total, molecularDistribution]);

  const handleSave = () => {
    // TODO: update Save button
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
        >
          Guardar
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
    </Box>
  );
}
