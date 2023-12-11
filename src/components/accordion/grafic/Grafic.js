import DishControl from '../../../patterns/dish_control/DishControl';
import './Grafic.css'
import { useNavigate } from 'react-router-dom';

const Grafic = (props) => {
    const navigate = useNavigate();
    const food = props.data.food;

    const onLinkClick = (event) => {
        navigate(event.target.href);
    }

    const removClickHandler = (event) => {
        const id = event.target.parentElement.parentElement.id;
        const sceduleName = props.data.name;
        const scheduleTime = props.data.time;
        const obj = {
            food: id,
            schedule: sceduleName,
            time: scheduleTime
        }
        props.onRemoveClick(obj);
    }
    const onEditClickHandler = (event) => {
        const id = event.target.parentElement.parentElement.id;
        console.log(id);
        console.log('Edit');
    }
    let clazz = 'grafic info';
    const data = props.data;
//<DishControl id={Object.values(item)} onRemoveClick={removClickHandler} onEditClick={onEditClickHandler} />


    const foodLinks = food.map((item) => {
        return <div key={Object.values(item)} className='grafic__a'>
            <a onClick={onLinkClick} href={`/cooking?dish=${Object.values(item)}`}>{Object.keys(item)}</a>
        </div>
    });

    const id = `${props.id}${data.name}${data.time}`;
    return (<div className={clazz} id={props.id}>
        <input defaultChecked className="grafic__input" type="checkbox" id={id}></input>
        <h3 className="grafic__h3"><label className="grafic__label" htmlFor={id}><div className='grafic__name'>{data.name}</div><div className='grafic__time'>{data.time}</div></label></h3>
        <div className='grafic__food'>
            {foodLinks}
        </div>
    </div>);
}

export default Grafic;