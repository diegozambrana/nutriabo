import { useLazyQuery } from '@apollo/client';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ChemicalAnalysis } from '.';
import { GET_CHEMICAL_ANALYSIS_BY_ID } from '../../graphql/chemicalAnalysis/query';
import { loadChemicalAnalysis } from '../../redux/slices/diet';

export function ChemicalAnalysisEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [getChemicalAnalysis] = useLazyQuery(GET_CHEMICAL_ANALYSIS_BY_ID);
  useEffect(() => {
    if (id) {
      getChemicalAnalysis({ variables: { id } }).then((response) => {
        dispatch(loadChemicalAnalysis(response.data.getChemicalAnalysisById));
      });
    }
  }, [id]);
  return <Box>{id && <ChemicalAnalysis />}</Box>;
}
