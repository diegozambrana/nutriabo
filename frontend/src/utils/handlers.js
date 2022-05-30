const DECIMAL_VALUES = [
  'calcio',
  'ceniza',
  'choTotal',
  'energia',
  'fibraCruda',
  'fosforo',
  'grasa',
  'hierro',
  'humedad',
  'niacina',
  'proteina',
  'riboflav',
  'tiamina',
  'vintaminaC',
  'vitaminaA',
]

export const copy = (data) => JSON.parse(JSON.stringify(data));

export const handlerAlimentData = (data) => {
  const newData = {};
  Object.keys(data).map(key => {
    if(DECIMAL_VALUES.includes(key)){
      newData[key] = parseFloat(data[key]);
    }else{
      newData[key] = data[key];
    }
  })
  return newData
}

export const calculateMolecularCalc = (data, activityFactor, injuryFactor) => {
  let RCB;
  if (data.genre === 'M') {
    RCB = 66 + 13.7 * data.weight + 5 * data.size - 6.8 * data.age;
  } else {
    RCB = 655 + 9.7 * data.weight + 1.8 * data.size - 4.7 * data.age;
  }
  let RCT = RCB;
  console.log(`activityFactor,${activityFactor}, injuryFactor, ${injuryFactor}`)
  console.log(injuryFactor)
  if(activityFactor && injuryFactor){
    RCT = RCB * activityFactor * injuryFactor.value;
  }
  return {...data, RCB, RCT};
}

export const calculateMolecularDistribution = (data, RCT) => {
  let newData = copy(data);
  newData.total.percent = newData.protein.percent + newData.lipids.percent + newData.carbohydrates.percent;
  newData.protein.KCAL = (newData.protein.percent * RCT) / newData.total.percent;
  newData.lipids.KCAL = (newData.lipids.percent * RCT) / newData.total.percent;
  newData.carbohydrates.KCAL = (newData.carbohydrates.percent * RCT) / newData.total.percent;
  newData.protein.GR = newData.protein.KCAL / 4;
  newData.lipids.GR = newData.lipids.KCAL / 9;
  newData.carbohydrates.GR = newData.carbohydrates.KCAL / 4;
  newData.total.KCAL = newData.protein.KCAL + newData.lipids.KCAL + newData.carbohydrates.KCAL;
  newData.total.GR = newData.protein.GR + newData.lipids.GR + newData.carbohydrates.GR;
  return newData;
}

export const calculateAdequacy = (total, molecularDistribution) => {
  return {
    energia: (total.energia * molecularDistribution.total.percent) / molecularDistribution.total.KCAL,
    grasa: (total.proteina * molecularDistribution.total.percent) / molecularDistribution.lipids.GR,
    proteina: (total.proteina * molecularDistribution.total.percent) / molecularDistribution.protein.GR,
    choTotal: (total.choTotal * molecularDistribution.total.percent) / molecularDistribution.carbohydrates.GR,
  }
}