import api from '../../Api';
import './AddToMarathon.css'
import InputCom from './InputCom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddToMarathon = () => {
    const navigate = useNavigate();
    const [week, setWeek] = useState('1');
    const [day, setDay] = useState([]);
    const [eatTime, setEatTime] = useState();
    const [food, setFood] = useState();
    const [marathoId, setMarathonId] = useState('1');
    const [marathonList, setMarathonList] = useState();
    const [quantity, setQuantity] = useState('50%');

    const [dishes, setDishes] = useState();
    const [sceduler, setSceduler] = useState();


    const onSaveClick = () => {
        const marathon = {
            marathon_id: marathoId.value,
            week: week,
            day: Array.isArray(day) ? day.map((d) => { return d.value }) : [day.value],
            sceduler: eatTime.value,
            food: food.value,
            quantity: quantity
        };
        api().post('/', marathon)
            .then(response => {
                navigate(`/`, { replace: true });
            })
            .catch(error => {
                console.error(error);
                const status = error.response.status;
                if (status === 401) {
                    navigate('/login');
                }
                alert(error.response.data);
            });
        console.log(marathon);
    }

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        if (queryParameters.size === 2) {
            let idParam = queryParameters.get('id');
            let tittleParam = queryParameters.get('tittle');
            setFood({ value: idParam, label: tittleParam });
            setDishes({ [idParam]: tittleParam });
        } else {
            api().get('/dishes')
                .then(response => {
                    setDishes(response.data);
                    const tmp = Object.entries(response.data);
                    const defaultFood = { value: tmp[tmp.length - 1][0], label: tmp[tmp.length - 1][1] };
                    setFood(defaultFood);

                })
                .catch(error => {
                    console.error(error);
                    const status = error.response.status;
                    if (status === 401) {
                        navigate('/login');
                    }
                });
        }
    }, []);
    useEffect(() => {
        api().get('/marathon_list')
            .then(response => {

                const obj = {};
                for (let data of response.data) {
                    Object.defineProperty(obj, data.id, {
                        value: data.name,
                        enumerable: true,
                        configurable: true,
                        writable: true
                    });
                }

                setMarathonList(obj);
                const keys = Object.entries(obj);
                const defaultMarathon = { value: keys[keys.length - 1][0], label: keys[keys.length - 1][1] };
                setMarathonId(defaultMarathon);
            })
            .catch(error => {
                console.error(error);
                const status = error.response.status;
                if (status === 401) {
                    navigate('/login');
                }
            });
    }, []);

    useEffect(() => {
        api().get('/sceduler')
            .then(response => {
                setSceduler(response.data);
                const tmp = Object.entries(response.data);
                const defaultSceduler = { value: tmp[0][0], label: tmp[0][1] };
                setEatTime(defaultSceduler);
            })
            .catch(error => {
                console.error(error);
                const status = error.response.status;
                if (status === 401) {
                    navigate('/login');
                }
            });
    }, [])

    return (<div className='AddToMarathon'>
        <h2>Додати до меню</h2>
        <form className='AddToMarathon__form'>
            <InputCom onDataChange={setMarathonId} value={marathoId} label='Марафон' type='combobox' options={marathonList}></InputCom>
            <InputCom onDataChange={setWeek} value={week} label='Тиждень' type='week'></InputCom>
            <InputCom onDataChange={setDay} value={day} isMulti label='День' type='day'></InputCom>
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