import { useState } from 'react';
import Button from '../../patterns/button/Button';
import './NewMarathon.css'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import api from '../../Api';
import TextField from '@mui/material/TextField';

const textStTyle = {
    width: "100%",
    backgroundColor: "#FFF",
    "& .MuiFormLabel-root": {
        color: "#000",
        fontSize: "20px",
        fontStyle: "italic",
        backgroundColor: "#fff",
    },
    marginBottom: "20px",
};

const NewMarathon = (props) => {
    const start = moment().add(2, 'days').format('DD.MM.YYYY');
    const end = moment().add(30, 'days').format('DD.MM.YYYY');
    const [name, setName] = useState(`Марафон ${start}-${end}`);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const nameChangeHandler = (event) => {
        setName(event.target.value);
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value);
    }

    const onCancelClick = () => {
        navigate('/');

    }
    const onSaveClick = () => {
        const body = { name: name, description: description };
        console.log(body);
        api().post('/marathon_list', body)
            .then(response => {
                navigate('/archive');
            })
            .catch(error => {
                console.log("Error")
                console.error(error);
                alert(error.response.data);
            });
    }
    return (<div className='NewMarathon'>
        <h2>Новий марафон</h2>
        <form>
            <TextField
                sx={textStTyle}
                type='text'
                id="marathon-tittle"
                label="Назва марафону"
                InputLabelProps={{
                    shrink: true,
                }}
                value={name}
                variant="outlined"
                onChange={nameChangeHandler}
                size='small'
            />

            <TextField
                sx={textStTyle}
                type='text'
                id="marathon-description"
                label="Опис"
                InputLabelProps={{
                    shrink: true,
                }}
                multiline
                rows={5}
                value={description}
                variant="outlined"
                onChange={descriptionChangeHandler}
                size='small'
            />
            <div>
                <Button onClick={onSaveClick} name='Зберегти'></Button>
                <Button onClick={onCancelClick} name='Скасувати'></Button>
            </div>
        </form>

    </div>);
}

export default NewMarathon