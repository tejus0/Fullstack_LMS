import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function createData(name, value) {
    return { name, value };
}



const MaterialTable = ({ rows,caption,bgColor="purple",hoverColorHex="#c084fc7d" }) => {
    return (
        <div className={`p-2 rounded-md bg-purple-opacity  flex flex-col gap-2 w-full h-full`} style={{backgroundColor:bgColor!="purple" ? bgColor:""}}>
           {caption && <p className='text-base text-white'>{caption}</p>}
            <TableContainer component={Paper} sx={{height:"100%"}}>
                <Table sx={{ minWidth: 99, width: "100%" , minHeight:"100%" }} aria-label="simple table">

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } , "&:hover": {backgroundColor:hoverColorHex}  , cursor:"pointer"}}
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