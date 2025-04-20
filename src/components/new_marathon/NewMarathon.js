import { useState } from 'react';
import Button from '../../patterns/button/Button';
import './NewMarathon.css'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import api from '../../Api';
import TextField from '@mui/material/TextField';
import {getTranslation} from '../../Utils'

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
        <h2>{getTranslation({name:'Новий марафон', pl:'Nowy maraton', en:'New marathon'})}</h2>
        <form>
            <TextField
                sx={textStTyle}
                type='text'
                id="marathon-tittle"
                label= {getTranslation({name:'Назва марафону', pl:'Nazwa maratonu', en:'Marathon name'})} 
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
                label={getTranslation({name:'Опис', pl:'Opis', en:'Description'})}
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
                <Button onClick={onSaveClick} name={getTranslation({name:'Зберегти', pl:'Zapisz', en:'Save'})}></Button>
                <Button onClick={onCancelClick} name={getTranslation({name:'Скасувати', pl:'Anulować', en:'Cancel'})}></Button>
            </div>
        </form>

    </div>);
}

export default NewMarathon