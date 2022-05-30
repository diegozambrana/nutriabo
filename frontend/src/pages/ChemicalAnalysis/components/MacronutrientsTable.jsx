import {
  Input,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { MACRONUTRIENTS_COLUMNS, formatNumber } from '../../../utils';
import { TableCell } from '../../../components/Table/TableCell';
import { styled } from '@mui/material/styles';

const InputStyled = styled(Input)`
  max-width: 90px;
  & input{
    text-align: right;
  }
`;

export const MacronutrientsTable = ({
  molecularDistribution,
  onUpdateDistribution,
}) => {
    const columns = [...MACRONUTRIENTS_COLUMNS];
    const rows = [
      {id: 'protein', label: 'PROTEINA'},
      {id: 'lipids', label: 'LIPIDO'},
      {id: 'carbohydrates', label: 'CARBOHIDRATOS'},
      {id: 'total', label: 'TOTAL'},
    ];
    
    const handleOnChange = (rowId, accessor, value) => {
      onUpdateDistribution({
        ...molecularDistribution,
        [rowId]: {
          ...molecularDistribution[rowId],
          [accessor]: parseInt(value)
        }
      })
    };

    return (
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>MACRONUTRIENTES</TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.accessor}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.Header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => <TableRow>
              <TableCell style={{fontWeight: 'bold'}}>{row.label}</TableCell>
              {columns.map((column, index) => (
                <TableCell key={`${column.id}_${index}_`} align={column.align}>
                  {column.accessor === 'percent' && row.id !== 'total'
                    ? <InputStyled
                        type="number"
                        value={molecularDistribution[row.id][column.accessor]}
                        onChange={(e) => handleOnChange(row.id, column.accessor, e.target.value)}
                      />
                    : formatNumber(molecularDistribution[row.id][column.accessor], 'number')
                  }
                </TableCell>
              ))}
            </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    )
}