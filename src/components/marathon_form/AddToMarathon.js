import api from '../../Api';
import './AddToMarathon.css'
import InputCom from './InputCom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {getTranslation} from '../../Utils'

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
            setFood(idParam);
            setDishes({ [idParam]: tittleParam });
        } else {
            api().get('/dishes')
                .then(response => {
                    setDishes(response.data);
                    const tmp = Object.entries(response.data);
                    const defaultFood = { value: tmp[tmp.length - 1][0], label: tmp[tmp.length - 1][1] };
                    setFood(defaultFood.value);

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
                setMarathonId(defaultMarathon.value);
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
                setEatTime(defaultSceduler.value);
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
        <h2>{getTranslation({name:"Додати до меню", pl:"Dodać do menu", en:"Add to menu"})}</h2>
        <form className='AddToMarathon__form'>
            <InputCom onDataChange={setMarathonId} value={marathoId} label={getTranslation({name:"Марафон", pl:"Maraton", en:"Marathon"})} type='combobox' options={marathonList}></InputCom>
            <InputCom onDataChange={setWeek} value={week} label={getTranslation({name:'Тиждень', pl:"Tydzień", en:"Week"})} type='week'></InputCom>
            <InputCom onDataChange={setDay} value={day} isMulti label={getTranslation({name:'День', pl:'Dzień', en:'Day'})} type='day'></InputCom>
            <InputCom onDataChange={setEatTime} value={eatTime} label={getTranslation({name:'Прийом їжі', pl:'Czas posiłku', en:'Meal time'})} options={sceduler} type='combobox'></InputCom>
            <InputCom onDataChange={setFood} value={food} label={getTranslation({name:'Страва', pl:'Danie', en:'Dish'})} type='combobox' options={dishes}></InputCom>
            <InputCom onDataChange={setQuantity} label={getTranslation({name:'Кількість', pl:'Ilość', en:'Quantity'})} value={quantity}></InputCom>
            <div className='AddToMarathon__buttons'>
                <button type='button' onClick={onSaveClick}>{getTranslation({name:'Зберегти', pl:'Zapisz', en:'Save'})} </button>
                <button type='button'>{getTranslation({name:'Скасувати', pl:'Anulować', en:'Cancel'})}</button>
            </div>
        </form>
    </div>);
}

export default AddToMarathon;