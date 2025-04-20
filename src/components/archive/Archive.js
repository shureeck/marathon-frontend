import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../Api';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {getTranslation} from '../../Utils'

const StyledTable = styled(Table)(({ theme }) => ({
    "& .MuiTableBody-root": {
        backgroundColor: `rgba(252, 253, 254, 0.8);`,
    },
    '&:last-child td, &:last-child th': { border: 0 },
    "& .MuiTableCell-root:hover": {
        color: "blue",
        textDecoration: "underline"
    },
    width: `calc(100% - 2em)`,
    marginLeft: `1em`,
    marginRight: `1em`,
    borderLeft: `15px solid #d8412f`,
    borderRight: `15px solid rgba(252, 253, 254, 0.8)`,
    borderRadius: `15px`,
    borderCollapse: `unset`,

    "@media only screen and (max-width: 600px)": {
        marginLeft: `5px`,
        marginRight: `5px`,
        width: `calc(100% - 10px)`,
    }
}));



const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: `rgba(255, 255, 255, 0.1)`,
    "&:hover": {
        backgroundColor: `rgba(254, 122, 71, 0.5) !important`,
    }
}));

const Archive = (props) => {
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        api().get('/marathon_list')
            .then(response => {
                setList(response.data);
                marathonList.push();
            })
            .catch(error => {
                console.error(error);
                const status = error.response.status;
                if (status === 401) {
                    navigate('/login');
                }
            });
    }, []);
    const rowClickHandler = (link) => {
        localStorage.setItem('selected', link.split('=')[1]);
        navigate(link);
    }
    const marathonList = list.map((item) => {
        return <StyledTableRow onClick={() => { rowClickHandler(`/?id=${item.id}`) }} href={`/?id=${item.id}`} hover key={item.id} >
            <TableCell component="th" scope="row"> {item.name}</TableCell>
            <TableCell align="right">{item.created}</TableCell>
        </StyledTableRow>
    });

    return <div >
        <h2>{getTranslation({name:"Архів", pl:"Archiwa", en:"Archive"})}</h2>

        <StyledTable aria-label="simple table">
            <TableBody >
                {marathonList}
            </TableBody>
        </StyledTable>

    </div>
}

export default Archive;