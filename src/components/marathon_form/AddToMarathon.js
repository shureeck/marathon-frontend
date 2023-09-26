import './AddToMarathon.css'
import InputCom from './InputCom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddToMarathon = () => {
    const navigate = useNavigate();
    const [week, setWeek] = useState('1');
    const [day, setDay] = useState('1');
    const [eatTime, setEatTime] = useState('1');
    const [food, setFood] = useState();
    const [quantity, setQuantity] = useState('50%');

    const [dishes, setDishes] = useState();
    const [sceduler, setSceduler] = useState();


    const onSaveClick = () => {
        const marathon = {
            week: week,
            day: day,
            sceduler: eatTime,
            food: food,
            quantity: quantity
        };

        axios.post('https://oapec6r46c.execute-api.eu-west-1.amazonaws.com/PROD/', marathon)
        .then(response => {
            console.log(response.data);
            navigate(`/`, {replace:true});
        })
        .catch(error => {
            console.error(error);
        });

        console.log(marathon);
    }


    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        if (queryParameters.size === 2) {
            let idParam = queryParameters.get('id');
            let tittleParam = queryParameters.get('tittle');
            setFood(idParam);
            setDishes(JSON.parse(`{"${idParam}":"${tittleParam}"}`));
        } else {
            axios.get('https://oapec6r46c.execute-api.eu-west-1.amazonaws.com/PROD/dishes')
                .then(response => {
                    console.log(response.data);
                    setDishes(response.data);
                    setFood(Object.entries(response.data)[0][0]);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);
    useEffect(() => {
        axios.get('https://oapec6r46c.execute-api.eu-west-1.amazonaws.com/PROD/sceduler')
            .then(response => {
                console.log(response.data);
                setSceduler(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    return (<div className='AddToMarathon'>
        <form className='AddToMarathon__form'>
            <InputCom onDataChange={setWeek} value={week} label='Тиждень' type='week'></InputCom>
            <InputCom onDataChange={setDay} value={day} label='День' type='day'></InputCom>
            <InputCom onDataChange={setEatTime} value={eatTime} label='Прийом їжі' options={sceduler} type='eat'></InputCom>
            <InputCom onDataChange={setFood} value={food} label='Страва' type='eat' options={dishes}></InputCom>
            <InputCom onDataChange={setQuantity} label='Кількість' value={quantity}></InputCom>
            <div className='AddToMarathon__buttons'>
                <button type='button' onClick={onSaveClick}>Зберегти</button>
                <button type='button'>Скасувати</button>
            </div>

        </form>

    </div>);
}

export default AddToMarathon;