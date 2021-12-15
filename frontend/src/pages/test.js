import React from 'react';
import { Table } from '../components';
import { DATA_TABLE } from '../data';
import { useTable } from 'react-table'

export const Test = () => {

    const data = React.useMemo(() => DATA_TABLE, [] )

    const columns = React.useMemo(
        () => [
          {Header: 'Código',accessor: 'codigo',},
          {Header: 'Nombre',accessor: 'nombre',},
          {Header: 'Energía',accessor: 'energia',},
          {Header: 'Proteina',accessor: 'proteina',},
          {Header: 'Grasa',accessor: 'grasa',},
          {Header: 'CHO Total',accessor: 'cho_total',},
          {Header: 'F.Cruda',accessor: 'fibra_cruda',},
          {Header: 'Ceniza',accessor: 'ceniza',},
          {Header: 'Ca',accessor: 'calcio',},
          {Header: 'P',accessor: 'fosforo',},
          {Header: 'Fe',accessor: 'hierro',},
          {Header: 'Vit. A',accessor: 'vitamina_A',},
          {Header: 'Tiamina',accessor: 'tiamina',},
          {Header: 'RIBOFLAV',accessor: 'riboflav',},
          {Header: 'Niacina',accessor: 'niacina',},
          {Header: 'Vit. C',accessor: 'vintamina_C',},
        ],
        []
      )

      const tableInstance = useTable({ columns, data })

      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = tableInstance

    return (
        <table {...getTableProps()}>
            <thead>
            {// Loop over the header rows
            headerGroups.map(headerGroup => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                {// Loop over the headers in each row
                headerGroup.headers.map(column => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                    {// Render the header
                    column.render('Header')}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
            {// Loop over the table rows
            rows.map(row => {
                // Prepare the row for display
                prepareRow(row)
                return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                    {// Loop over the rows cells
                    row.cells.map(cell => {
                    // Apply the cell props
                    return (
                        <td {...cell.getCellProps()}>
                        {// Render the cell contents
                        cell.render('Cell')}
                        </td>
                    )
                    })}
                </tr>
                )
            })}
            </tbody>
        </table>
    )
}