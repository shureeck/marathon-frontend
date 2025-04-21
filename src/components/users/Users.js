import * as React from 'react';
import './Users.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material';
import api from '../../Api';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Button } from '@mui/material';
import { Password, PersonAddOutlined } from '@mui/icons-material';
import UsersTable from './UsersTable';
import {getTranslation} from '../../Utils'

const StyledButton = styled(Button)(({ theme }) => ({
    display: "flex",
    color: "#636363",
    fontWeight: "bold",
    backgroundColor: "#FCFDFE",
    '&:hover': {
        backgroundColor: "#F5CA99",
    },
    border: "solid 1px #F5CA99",
    top: "-40px",
    marginRight: "32px",
    //marginTop: "-35px",
    marginBottom: "-30px",
    marginLeft: "auto",
    textTransform: 'none',
    '@media only screen and (max-width: 600px)': {
        margin: 'auto',
        height: "30px",
        marginBottom: "10px",
        top: 0,
        with: "100x"
    }
}));

const DialogStyledButton = styled(Button)(({ theme }) => ({
    height: "33px",
    width: "100px",
    color: "#636363",
    fontWeight: "bold",
    marginLeft: "10px",
    marginRight: "10px",
    border: "1px solid #f1f1f1",
    textTransform: "none",
    backgroundColor: "#ffffff",
    '&:hover': {
        border: "1px solid #c3c3c3",
        backgroundColor: "#f1f1f1"
    }
}));

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = React.useState([]);
    const [showDialog, setShowDialog] = React.useState(false);

    useEffect(() => {
        api().get('/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error(error);
                const status = error.response.status;
                if (status === 401) {
                    navigate('/login');
                }
            });
    }, []);

    const onClickHandler = () => {
        console.log("Add user");
        setShowDialog(true);

    }

    const onAddClick = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const newUser = {
            username: formJson.email,
            firstname: formJson.name,
            lastname: formJson.lastname,
            password: formJson.password,
            marathonname: []
        }
        api().post('/users', newUser)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
                const status = error.response.status;
                if (status === 401) {
                    navigate('/login');
                }
            });
    setUsers([newUser, ...users]);
    setShowDialog(false);
}

return <div>
    <h2>{getTranslation({name:'Користувачі', pl:'Użytkownicy', en:'Users'})}</h2>
    <div>
        <StyledButton onClick={onClickHandler} startIcon={<PersonAddOutlined />}>{getTranslation({name:'Додати користувача', pl:'Dodać użytkownika', en:'Add user'})} </StyledButton>
        <UsersTable users={users}></UsersTable>
        <Dialog

            open={showDialog}
            onClose={() => { setShowDialog(false) }}
            PaperProps={{
                component: 'form',
                onSubmit: onAddClick,
            }}
        >
            <DialogTitle>{getTranslation({name:"Додати Користувача", pl:'Dodać Użytkownika', en:'Add User'})} </DialogTitle>
            <DialogContent>

                <TextField margin="dense" id="name" name="name" label={getTranslation({name:"Ім'я", pl:'Imię', en:'Name'})} fullWidth variant="outlined" size='small' InputLabelProps={{
                    shrink: true,
                }}

                />
                <TextField
                    margin="dense" id="lastname" name="lastname" label={getTranslation({name:"Прізвище", pl:'Nazwisko', en:'Last name'})} fullWidth variant="outlined" size='small' InputLabelProps={{
                        shrink: true,
                    }}

                />
                <TextField margin="dense" id="email" name="email" label="e-mail" type="email" fullWidth variant="outlined" size='small' InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField margin="dense" id="password" name="password" label={getTranslation({name:"Пароль", pl:'Hasło', en:'Password'})} type="text" fullWidth variant="outlined" size='small' InputLabelProps={{
                    shrink: true,
                }}
                />
            </DialogContent>
            <DialogActions>
                <DialogStyledButton onClick={() => { setShowDialog(false) }}>{getTranslation({name:'Скасувати', pl:'Anulować', en:'Cancel'})}</DialogStyledButton>
                <DialogStyledButton type='submit' >{getTranslation({name:"Додати", pl:'Dodać', en:'Add'})} </DialogStyledButton>
            </DialogActions>
        </Dialog>
    </div>
</div >
}

export default Users;