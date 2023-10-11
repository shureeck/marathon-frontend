import './Day.css';
import Grafic from '../grafic/Grafic';


const Day = (props) => { 
    const day = props.tittle;
    const id = `${props.id}${day}`; 
    const schedule = props.schedule;
    const graficComponent = schedule.map((item) => {
        return (<Grafic id={id} data={item} className='day_grafic'></Grafic>);
    });

    return (<div className='day'>
    <input className='day__input' type="checkbox" id={id}></input>
    <h3 className='day__h3'><label className='day__label' htmlFor={id}><div className='day__name'>{day}</div></label></h3>
    <div className='day__grafic'>
    {graficComponent}
    </div>
</div>); };

export default Day;