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