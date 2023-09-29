import './Grafic.css'
import { useNavigate } from 'react-router-dom';

const Grafic = (props) => {
    const navigate = useNavigate();
    const onLinkClick = (event) => {
        navigate(event.target.href);
    }

    let clazz = 'grafic info';
    const data = props.data;
    const food = data.food;
    const foodLinks = food.map((item) => {
        return <div className='grafic__a'><a onClick={onLinkClick} href={`/cooking?dish=${Object.values(item)}`}>{Object.keys(item)}</a></div>
    });
    const id = `${props.id}${data.name}${data.time}`;
    return (<div className={clazz} id={props.id}>
        <input checked className="grafic__input" type="checkbox" id={id}></input>
        <h3 className="grafic__h3"><label className="grafic__label" for={id}><div className='grafic__name'>{data.name}</div><div className='grafic__time'>{data.time}</div></label></h3>
        <div className='grafic__food'>
            {foodLinks}
        </div>
    </div>);
}

export default Grafic;