import { useEffect, useState } from "react";
import "./Shared.css"
import Button from "../../../patterns/button/Button"
import { useNavigate } from 'react-router-dom';
import api from '../../../Api';
import InputLabel from '@mui/material/InputLabel';

import { Chip, MenuItem, Select } from "@mui/material";
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    bgcolor: 'background.paper',
    border: '1px solid #D8412F',
    p: 2,
};

const Shared = (props) => {
    let options = [];
    const navigate = useNavigate();
    const assined = [];
    const [sharedUsers, setSharedUsers] = useState(assined);
    const [users, setUsers] = useState(options);

    const handleDelete = (event) => {
        const id = event.currentTarget.parentElement.id;
        const label = event.currentTarget.parentElement.textContent;
        const arr = sharedUsers.filter(((p) => { return p.value !== id }));
        setSharedUsers(arr);
        setUsers([...users, { label: label, value: id }])
    };

    const selectChangeHandler = (event) => {
        const value = event.target.value;
        const selectedUser = users.filter((item) => { return item.value === value });
        setUsers(users.filter((item) => { return item.value !== value }));
        const tmp = [...sharedUsers]
        tmp.push(...selectedUser);
        setSharedUsers(tmp);
    }

    const shareComponent = sharedUsers.map((item) => {
        return <Chip sx={{ fontSize: "16px" }} size="large" variant="outlined"
            key={item.value} id={item.value} label={item.label} onDelete={handleDelete} />
    });

    const onShareClick = () => {
        const requesBody = {
            marathonId: props.marathonId,
            users: sharedUsers.map((p)=>{return p.value}),
        }
        console.log("Request to access:");
        console.log(requesBody);
        props.onCancelClick();

        api().post(`/share`, requesBody);
    }

    useEffect(() => {
        if (props.marathonId) {
            Promise.all([api().get(`/users?marathonID=${props.marathonId}`), api().get('/users')
            ]).then((arr) => {
                const sharedUsersResponse = arr[0].data;
                const allUsersResponse = arr[1].data;
                console.log(sharedUsersResponse);
                console.log(allUsersResponse);

                const sharedUsersArray = sharedUsersResponse.map((user) => {
                    return ({
                        value: user.id,
                        label: `${user.firstname} ${user.lastname} (${user.username})`
                    })
                });
                setSharedUsers(sharedUsersArray);
                const sharedUserIds = sharedUsersArray.map((p) => { return p.value });
                const allUsersArray = allUsersResponse.map((user) => {
                    return (
                        {
                            value: user.id,
                            label: `${user.firstname} ${user.lastname} (${user.username})`
                        })
                }).filter((p) => { return !sharedUserIds.includes(p.value); });
                setUsers(allUsersArray);
            })
                .catch((e) => { console.log(e) });
        }
    }, [props.isOpen]);

    return (<Modal open={props.isOpen}
        contentLabel="Example Modal"
        ariaHideApp={false}
        style={{
            content: { backgroundColor: '#FFF6EE' }
        }}>
        <Box sx={boxStyle}>
            <Typography id="modal-modal-title" sx={{ textAlign: 'center' }} variant="h6" component="h2">
                Доступ до марафону
            </Typography>

            <InputLabel sx={{ marginLeft: "5px" }} id="demo-select-small-label">Користувачі без доступу</InputLabel>
            <Select labelId="demo-select-small-label" size="small"  sx={{ margin: '5px', display: 'flex' }} onChange={selectChangeHandler}>
                {users.map((p) => { return <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem> })}
            </Select>
            <InputLabel sx={{ marginLeft: "5px" }} id="demo-select-small-label">Користувачі марафону</InputLabel>
            <div className="shared__selected">
                <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
                    {shareComponent}
                </Stack>
            </div>

            <div className="shared_buttons">
                <Button onClick={props.onCancelClick} name="Скасувати" />
                <Button onClick={onShareClick} name="Поділитись" />
            </div>
        </Box>
    </Modal >);
}

export default Shared;