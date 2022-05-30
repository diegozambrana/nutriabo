export const API_DOMAIN = process.env.REACT_APP_API_DOMAIN

export const FOOD_COLUMNS = [
  {Header: 'Nombre',accessor: 'nombre', minWidth: 250,},
  {Header: 'Cantidad',accessor: 'cantidad'},
  {Header: 'Energía',accessor: 'energia', minWidth: 50, align: 'right',},
  {Header: 'Proteina',accessor: 'proteina', minWidth: 50, align: 'right',},
  {Header: 'Grasa',accessor: 'grasa', minWidth: 50, align: 'right',},
  {Header: 'CHO Total',accessor: 'choTotal', minWidth: 110, align: 'right',},
  {Header: 'F.Cruda',accessor: 'fibraCruda', minWidth: 50, align: 'right',},
  {Header: 'Ceniza',accessor: 'ceniza', minWidth: 50, align: 'right',},
  {Header: 'Ca',accessor: 'calcio', minWidth: 50, align: 'right',},
  {Header: 'P',accessor: 'fosforo', minWidth: 50, align: 'right',},
  {Header: 'Fe',accessor: 'hierro', minWidth: 50, align: 'right',},
  {Header: 'Vit. A',accessor: 'vitaminaA', minWidth: 70, align: 'right',},
  {Header: 'Tiamina',accessor: 'tiamina', minWidth: 50, align: 'right',},
  {Header: 'RIBOFLAV',accessor: 'riboflav', minWidth: 50, align: 'right',},
  {Header: 'Niacina',accessor: 'niacina', minWidth: 50, align: 'right',},
  {Header: 'Vit. C',accessor: 'vintaminaC', minWidth: 70, align: 'right',},
  {Header: '',accessor: 'actions'}
]
export const MACRONUTRIENTS_COLUMNS = [
  {Header: '%', accessor: 'percent', align: 'right'},
  {Header: 'KCAL', accessor: 'KCAL', align: 'right'},
  {Header: 'GR', accessor: 'GR', align: 'right'},
]

export const NEW_ROW = {
  nombre: '',
  cantidad: 0,
  energia: 0,
  humedad: 0,
  proteina: 0,
  grasa: 0,
  choTotal: 0,
  fibraCruda: 0,
  ceniza: 0,
  calcio: 0,
  fosforo: 0,
  hierro: 0,
  vitaminaA: 0,
  tiamina: 0,
  riboflav: 0,
  niacina: 0,
  vintaminaC: 0,
}

export const TOTAL_INIT = {
  energia: 0,
  humedad: 0,
  proteina: 0,
  grasa: 0,
  choTotal: 0,
  fibraCruda: 0,
  ceniza: 0,
  calcio: 0,
  fosforo: 0,
  hierro: 0,
  vitaminaA: 0,
  tiamina: 0,
  riboflav: 0,
  niacina: 0,
  vintaminaC: 0,
}

export const ACTIVITY_FACTOR = [
  {value: 1.2, label: 'Resposo Absoluto'},
  {value: 1.3, label: 'Resposo Relativo'},
]

export const INJURY_VALUE = {
  'default': 1,
  'cmen': 1.1,
  'cmay': 1.2,
  'te': 1.35,
  'trc': 1.6,
  'tcpc': 1.35,
  'il': 1.2,
  'im': 1.4,
  'is': 1.5,
  'q40': 1.5,
  'q100': 1.95,
}

export const INJURY_FACTOR = [
  {value: 'default', label: 'Sin injuria o daño'},
  {value: 'cmen', label: 'Cirugía menor'},
  {value: 'cmay', label: 'Cirugía mayor'},
  {value: 'te', label: 'Trauma Esqueletico'},
  {value: 'trc', label: 'Traumatismo de cráneo'},
  {value: 'tcpc', label: 'Trauma con pérdida de conciencia'},
  {value: 'il', label: 'Infección leve'},
  {value: 'im', label: 'Infección moderada'},
  {value: 'is', label: 'Infección severa'},
  {value: 'q40', label: 'Quemadura 40% de la superficie corporal'},
  {value: 'q100', label: 'Quemadura 100% de la superficie corporal'},
]