import './Week.css'
import Day from '../day/Day'

const Week = (props) => {

    const removeClickHandler = (object) => {
        const obj = { ...object, week: week };
        props.onRemoveClick(obj);
    }
    const week = props.week;
    const id = week;
    const days = props.days;
    const daysComponent = days.map((item) => {
        return <Day key={id + item.day} onRemoveClick={removeClickHandler} id={id} tittle={item.day} schedule={item.grafic} />;
    });

    return (<div className='week'>
        <input className='week__input' type="checkbox" id={id}></input>
        <h2 className='week__h2'><label className='week__label' htmlFor={id}><div className='week__name'>{week}</div></label></h2>
        <div className='week__day'>{daysComponent}</div>

    </div>);
}

export default Week;