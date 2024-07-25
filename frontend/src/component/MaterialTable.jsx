import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function createData(name, value) {
    return { name, value };
}



const MaterialTable = ({ rows,caption,bgColor="orange" }) => {
    return (
        <div className={`p-2 rounded-md bg-${bgColor}-400  flex flex-col gap-2 w-full`}>
           {caption && <p className='text-base text-white'>{caption}</p>}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 99, width: 400 }} aria-label="simple table">

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default MaterialTable;