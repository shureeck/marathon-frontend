import DishControl from '../../../patterns/dish_control/DishControl';
import './Grafic.css'
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import useToken from '../../../useToken';

const Grafic = (props) => {
    const [token, setToken] = useToken();
    const navigate = useNavigate();
    const food = props.data.food;
    const schedule = props.line ? `${props.line} > ${props.data.name} ${props.data.time}` : '';
    const onLinkClick = (event) => {
        //   navigate(`${event.target.href}&line=${schedule}`);
    }

    const removClickHandler = (event) => {
        const id = event.target.parentElement.parentElement.id;
        const text = (event.target.parentElement.parentElement.getAttribute('food'));
        const sceduleName = props.data.name;
        const scheduleTime = props.data.time;
        const obj = {
            food: {
                id: id,
                title: text
            },
            schedule: sceduleName,
            time: scheduleTime,
        }
        props.onRemoveClick(obj);
    }
    let clazz = 'grafic info';
    const data = props.data;

    const foodLinks = food.map((item) => {
        let removeBtn = "";
        if (typeof token !== 'undefined') {
            const tokenDecoded = jwt_decode(token);
            removeBtn = (props.onRemoveClick && tokenDecoded.role === 'Admin') ? <DishControl id={item.id} food={item.title} onRemoveClick={removClickHandler} /> : "";
        }
        const lineParam = schedule.length === 0 ? '' : `&line=${schedule}`;
        return <div key={Object.values(item)} className='grafic__a'>

            <a onClick={onLinkClick} href={`/cooking?dish=${item.id}${lineParam}`}>{item.title}</a>
            {removeBtn}
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