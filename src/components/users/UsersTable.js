import * as React from 'react';
import './Users.css'
import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



Row.propTypes = {
    row: PropTypes.shape({
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                marathonname: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton
                        disabled={row.marathonname.length === 0}
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="left">{`${row.firstname} ${row.lastname}`}</TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.marathonname.length}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align='center' style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" sx={{ color: "#D8412f", fontWeight: "bold" }} gutterBottom component="div">
                                Призначені марафоны
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Назва марафону</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.marathonname.map((historyRow) => (
                                        <TableRow key={historyRow}>
                                            <TableCell component="th" scope="row">
                                                {historyRow}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const UsersTable = (props) => {
    const users = props.users;

    return <TableContainer sx={{ width: "98%", margin: "auto", borderLeft: "15px solid #d8412f" }} component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
                <TableRow sx={{ backgroundColor: "#fbecea" }}>
                    <StyledTableCell />
                    <StyledTableCell>І'мя / Прізвище </StyledTableCell>
                    <StyledTableCell align="center">e-mail</StyledTableCell>
                    <StyledTableCell align="center">Кількість марафонів</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <Row key={user.username} row={user} />
                ))}
            </TableBody>
        </Table>
    </TableContainer>

}

export default UsersTable;