export const DECIMAL_VALUES = [
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
];

export const copy = (data) => JSON.parse(JSON.stringify(data));

export const handlerAlimentData = (data) => {
  const newData = {};
  Object.keys(data).forEach((key) => {
    if (DECIMAL_VALUES.includes(key)) {
      newData[key] = parseFloat(data[key]);
    } else {
      newData[key] = data[key];
    }
  });
  return newData;
};

export const calculateMolecularCalc = (data, activityFactor, injuryFactor) => {
  let RCB;
  if (data.genre === 'M') {
    RCB = 66 + 13.7 * data.weight + 5 * data.size - 6.8 * data.age;
  } else {
    RCB = 655 + 9.7 * data.weight + 1.8 * data.size - 4.7 * data.age;
  }
  let RCT = RCB;
  if (activityFactor && injuryFactor) {
    RCT = RCB * activityFactor * injuryFactor.value;
  }
  return { ...data, RCB, RCT };
};

export const calculateMolecularDistribution = (data, RCT) => {
  const newData = copy(data);
  newData.total.percent =
    newData.protein.percent +
    newData.lipid.percent +
    newData.carbohydrates.percent;
  newData.protein.KCAL =
    (newData.protein.percent * RCT) / newData.total.percent;
  newData.lipid.KCAL = (newData.lipid.percent * RCT) / newData.total.percent;
  newData.carbohydrates.KCAL =
    (newData.carbohydrates.percent * RCT) / newData.total.percent;
  newData.protein.GR = newData.protein.KCAL / 4;
  newData.lipid.GR = newData.lipid.KCAL / 9;
  newData.carbohydrates.GR = newData.carbohydrates.KCAL / 4;
  newData.total.KCAL =
    newData.protein.KCAL + newData.lipid.KCAL + newData.carbohydrates.KCAL;
  newData.total.GR =
    newData.protein.GR + newData.lipid.GR + newData.carbohydrates.GR;
  return newData;
};

export const calculateAdequacy = (total, molecularDistribution) => ({
  energia:
    (total.energia * molecularDistribution.total.percent) /
    molecularDistribution.total.KCAL,
  grasa:
    (total.grasa * molecularDistribution.total.percent) /
    molecularDistribution.lipid.GR,
  proteina:
    (total.proteina * molecularDistribution.total.percent) /
    molecularDistribution.protein.GR,
  choTotal:
    (total.choTotal * molecularDistribution.total.percent) /
    molecularDistribution.carbohydrates.GR,
});
