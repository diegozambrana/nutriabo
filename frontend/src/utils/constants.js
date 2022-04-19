export const API_DOMAIN = process.env.REACT_APP_API_DOMAIN

export const FOOD_COLUMNS = [
  {Header: 'Nombre',accessor: 'nombre', minWidth: 250,},
  {Header: 'Cantidad',accessor: 'cantidad'},
  {Header: 'Energía',accessor: 'energia', minWidth: 50, align: 'right',},
  {Header: 'Proteina',accessor: 'proteina', minWidth: 50, align: 'right',},
  {Header: 'Grasa',accessor: 'grasa', minWidth: 50, align: 'right',},
  {Header: 'CHO Total',accessor: 'cho_total', minWidth: 110, align: 'right',},
  {Header: 'F.Cruda',accessor: 'fibra_cruda', minWidth: 50, align: 'right',},
  {Header: 'Ceniza',accessor: 'ceniza', minWidth: 50, align: 'right',},
  {Header: 'Ca',accessor: 'calcio', minWidth: 50, align: 'right',},
  {Header: 'P',accessor: 'fosforo', minWidth: 50, align: 'right',},
  {Header: 'Fe',accessor: 'hierro', minWidth: 50, align: 'right',},
  {Header: 'Vit. A',accessor: 'vitamina_A', minWidth: 70, align: 'right',},
  {Header: 'Tiamina',accessor: 'tiamina', minWidth: 50, align: 'right',},
  {Header: 'RIBOFLAV',accessor: 'riboflav', minWidth: 50, align: 'right',},
  {Header: 'Niacina',accessor: 'niacina', minWidth: 50, align: 'right',},
  {Header: 'Vit. C',accessor: 'vintamina_C', minWidth: 70, align: 'right',},
  {Header: '',accessor: 'actions'}
]

export const NEW_ROW = {
  nombre: '',
  cantidad: 0,
  energia: 0,
  humedad: 0,
  proteina: 0,
  grasa: 0,
  cho_total: 0,
  fibra_cruda: 0,
  ceniza: 0,
  calcio: 0,
  fosforo: 0,
  hierro: 0,
  vitamina_A: 0,
  tiamina: 0,
  riboflav: 0,
  niacina: 0,
  vintamina_C: 0,
}