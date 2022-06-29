import { useSelector } from 'react-redux';

export const useChemicalAnalysisData = () => {
  const diet = useSelector((s) => s.diet);
  const getCreateChemicalAnalysisVars = () => {
    const data = {
      title: diet.titleDiet,
      description: diet.descriptionDiet,
      genre: diet.molecularCalc.genre,
      weight: diet.molecularCalc.weight,
      size: diet.molecularCalc.size,
      age: diet.molecularCalc.age,
      RCB: diet.molecularCalc.RCB,
      RCT: diet.molecularCalc.RCT,
      activityFactor: diet.activityFactor,
      injuryFactor: diet.injuryFactor.value,
      injuryFactorCode: diet.injuryFactor.code,
      molecularDistribution: diet.molecularDistribution,
      foodTimesJSON: JSON.stringify(diet.foodTimes),
      total: diet.total,
      adequacy: diet.adequacy,
    };
    if (diet.id) data.id = diet.id;
    return data;
  };
  return { getCreateChemicalAnalysisVars };
};
