import { useState } from 'react';
import Button from '../../patterns/button/Button';
import './NewMarathon.css'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import api from '../../Api';

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
            <label className='NewMarathon__label'>Назва марафону</label>
            <input type='text' className='NewMarathon__input' onChange={nameChangeHandler} value={name}></input>
            <label className='NewMarathon__label'>Опис</label>
            <textarea className='NewMarathon__textarea' onChange={descriptionChangeHandler} value={description}></textarea>

            <div>
                <Button onClick={onSaveClick} name='Зберегти'></Button>
                <Button onClick={onCancelClick} name='Скасувати'></Button>
            </div>
        </form>

    </div>);
}

export default NewMarathon