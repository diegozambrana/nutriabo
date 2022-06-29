/* eslint-disable no-undef */
import {
  handlerAlimentData,
  calculateMolecularCalc,
  calculateMolecularDistribution,
  calculateAdequacy,
  DECIMAL_VALUES,
} from './handlers';

const ALIMENT_DATA = {
  codigo: 'A2',
  nombre: 'Arroz var. carolina',
  categoria: {
    codigo: 'A',
    grupoCategoria: 'Cereales y derivados',
  },
  energia: '347.00',
  humedad: '13.10',
  proteina: '7.21',
  grasa: '0.42',
  choTotal: '78.55',
  fibraCruda: '0.60',
  ceniza: '0.72',
  calcio: '10.00',
  fosforo: '117.00',
  hierro: '1.56',
  vitaminaA: '0.00',
  tiamina: '0.06',
  riboflav: '0.03',
  niacina: '2.06',
  vintaminaC: '0.00',
};

test('Handle Aliment Data', () => {
  const newDataAliment = handlerAlimentData(ALIMENT_DATA);
  DECIMAL_VALUES.forEach((value) => {
    expect(typeof newDataAliment[value]).toBe('number');
  });
});

test('Molecular Calc', () => {
  // calculate RCB and RCT
  const mData1 = { genre: 'M', weight: '80', size: '170', age: '32' };
  const mc1 = calculateMolecularCalc(mData1, 1.2, {
    value: 1,
    code: 'default',
  });
  expect(mc1.RCB.toFixed(2)).toBe((1794.4).toFixed(2));
  expect(mc1.RCT.toFixed(2)).toBe((2153.28).toFixed(2));

  const mData2 = { genre: 'F', weight: '80', size: '170', age: '32' };
  const mc2 = calculateMolecularCalc(mData2, 1.2, {
    value: 1,
    code: 'default',
  });
  expect(mc2.RCB.toFixed(2)).toBe((1586.6).toFixed(2));
  expect(mc2.RCT.toFixed(2)).toBe((1903.92).toFixed(2));

  const mData3 = { genre: 'M', weight: '60', size: '160 ', age: '29' };
  const mc3 = calculateMolecularCalc(mData3, 1.2, { value: 1.2, code: 'cmay' });
  expect(mc3.RCB.toFixed(2)).toBe((1490.8).toFixed(2));
  expect(mc3.RCT.toFixed(2)).toBe((2146.752).toFixed(2));

  const mData4 = { genre: 'F', weight: '60', size: '160 ', age: '29' };
  const mc4 = calculateMolecularCalc(mData4, 1.2, { value: 1.2, code: 'cmay' });
  expect(mc4.RCB.toFixed(2)).toBe((1388.7).toFixed(2));
  expect(mc4.RCT.toFixed(2)).toBe((1999.728).toFixed(2));

  const mData5 = { genre: 'M', weight: '63', size: '167 ', age: '21' };
  const mc5 = calculateMolecularCalc(mData5, 1.3, { value: 1.35, code: 'te' });
  expect(mc5.RCB.toFixed(2)).toBe((1621.3).toFixed(2));
  expect(mc5.RCT.toFixed(2)).toBe((2845.3815).toFixed(2));

  const mData6 = { genre: 'F', weight: '63', size: '167 ', age: '21' };
  const mc6 = calculateMolecularCalc(mData6, 1.3, { value: 1.35, code: 'te' });
  expect(mc6.RCB.toFixed(2)).toBe((1468).toFixed(2));
  expect(mc6.RCT.toFixed(2)).toBe((2576.34).toFixed(2));

  const mData7 = { genre: 'M', weight: '50', size: '155 ', age: '40' };
  const mc7 = calculateMolecularCalc(mData7, 1.3, {
    value: 1.95,
    code: 'q100',
  });
  expect(mc7.RCB.toFixed(2)).toBe((1254).toFixed(2));
  expect(mc7.RCT.toFixed(2)).toBe((3178.89).toFixed(2));

  const mData8 = { genre: 'F', weight: '50', size: '155 ', age: '40' };
  const mc8 = calculateMolecularCalc(mData8, 1.3, {
    value: 1.95,
    code: 'q100',
  });
  expect(mc8.RCB.toFixed(2)).toBe((1231).toFixed(2));
  expect(mc8.RCT.toFixed(2)).toBe((3120.585).toFixed(2));
});

test('Molecular Distribution', () => {
  const data = {
    protein: { percent: 15 },
    lipid: { percent: 30 },
    carbohydrates: { percent: 55 },
    total: { percent: 0 },
  };
  const md1 = calculateMolecularDistribution(data, 1800);
  expect(md1.protein.KCAL).toBe(270);
  expect(md1.protein.GR).toBe(67.5);
  expect(md1.lipid.KCAL).toBe(540);
  expect(md1.lipid.GR).toBe(60);
  expect(md1.carbohydrates.KCAL).toBe(990);
  expect(md1.carbohydrates.GR).toBe(247.5);
  expect(md1.total.percent).toBe(100);
  expect(md1.total.KCAL).toBe(1800);
  expect(md1.total.GR).toBe(375);
});

test('Adequacy', () => {
  const data = {
    protein: { percent: 15 },
    lipid: { percent: 30 },
    carbohydrates: { percent: 55 },
    total: { percent: 0 },
  };
  const molecularDistribution = calculateMolecularDistribution(data, 1800);
  const total = {
    energia: 1770.24,
    grasa: 59.93,
    proteina: 66.49,
    choTotal: 239.59,
  };
  const adequacy = calculateAdequacy(total, molecularDistribution);
  expect(adequacy.energia.toFixed(2)).toBe((98.35).toFixed(2));
  expect(adequacy.proteina.toFixed(2)).toBe((98.5).toFixed(2));
  expect(adequacy.grasa.toFixed(2)).toBe((99.88).toFixed(2));
  expect(adequacy.choTotal.toFixed(2)).toBe((96.8).toFixed(2));
});
