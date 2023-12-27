import api from '../../Api';
import './AddToMarathon.css'
import InputCom from './InputCom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddToMarathon = () => {
    const navigate = useNavigate();
    const [week, setWeek] = useState('4');
    const [day, setDay] = useState('1');
    const [eatTime, setEatTime] = useState('1');
    const [food, setFood] = useState();
    const [marathoId, setMarathonId] = useState('1');
    const [marathonList, setMarathonList] = useState();
    const [quantity, setQuantity] = useState('50%');

    const [dishes, setDishes] = useState();
    const [sceduler, setSceduler] = useState();


    const onSaveClick = () => {
        const marathon = {
            marathon_id: marathoId,
            week: week,
            day: day,
            sceduler: eatTime,
            food: food,
            quantity: quantity
        };

        api().post('/', marathon)
            .then(response => {
                navigate(`/`, { replace: true });
            })
            .catch(error => {
                console.error(error);
                alert(error.response.data);
            });

        console.log(marathon);
    }

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        if (queryParameters.size === 2) {
            let idParam = queryParameters.get('id');
            let tittleParam = queryParameters.get('tittle');
            setFood(idParam);
            setDishes({ [idParam]: tittleParam });
        } else {
            api().get('/dishes')
                .then(response => {
                    setDishes(response.data);
                    setFood(Object.entries(response.data)[0][0]);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);
    useEffect(() => {
        api().get('/marathon_list')
            .then(response => {

                const obj = {};
                for (let data of response.data) {
                    Object.defineProperty(obj,  data.id, {
                        value: data.name,
                        enumerable: true,
                        configurable: true,
                        writable: true
                      });
                }

                setMarathonList(obj);
                console.log(obj)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        api().get('/sceduler')
            .then(response => {
                setSceduler(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    return (<div className='AddToMarathon'>
        <form className='AddToMarathon__form'>
            <InputCom onDataChange={setMarathonId} value={marathoId} label='Марафон' type='combobox' options={marathonList}></InputCom>
            <InputCom onDataChange={setWeek} value={week} label='Тиждень' type='week'></InputCom>
            <InputCom onDataChange={setDay} value={day} label='День' type='day'></InputCom>
            <InputCom onDataChange={setEatTime} value={eatTime} label='Прийом їжі' options={sceduler} type='combobox'></InputCom>
            <InputCom onDataChange={setFood} value={food} label='Страва' type='combobox' options={dishes}></InputCom>
            <InputCom onDataChange={setQuantity} label='Кількість' value={quantity}></InputCom>
            <div className='AddToMarathon__buttons'>
                <button type='button' onClick={onSaveClick}>Зберегти</button>
                <button type='button'>Скасувати</button>
            </div>

        </form>

    </div>);
}

export default AddToMarathon;