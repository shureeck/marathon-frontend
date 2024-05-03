import { useState, useEffect } from 'react';
import Grafic from '../marathon/grafic/Grafic';
import './All.css'
import api from '../../Api';
import { useNavigate } from 'react-router-dom';

const All = () => {
    const [value, setValue] = useState([]);
    const [data, setData] = useState(value);
    const navigate = useNavigate();

    useEffect(() => {
        api().get('/all')
            .then(response => {
                console.log(response.data);
                setValue(response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
                const status = error.response.status;
                if (status === 401) {
                    navigate('/login');
                }
            });
    }, []);
    
    const onSourceChageHandler = (event) => {
        const search = event.target.value.toLowerCase();
        if (typeof search === 'undefined' || search.length === 0) {
            setData(value);
        } else {
            let newData = structuredClone(value);
            newData = newData.filter((tmp) => { return tmp.name.toLowerCase() === search.charAt(0) });
            if (newData.length > 0) {
                newData[0].food = newData[0].food.filter((tmp) => { return Object.keys(tmp)[0].toLocaleLowerCase().startsWith(search) });
            }
            setData(newData);
        }

    }

    const letters = [];
    const links = data.map((item) => {
        const leter = item.name;
        letters.push(<a key={`a_${leter}`} href={`#${leter}`}>{leter}</a>)
        return <Grafic key={leter} id={leter} data={item} className='day_grafic'></Grafic>
    });

    return (<div className="All__body">
        <div className='All__body__links'>{letters}</div>
        <div className='All__body__search'><input className='All__body__input' placeholder='Пошук...' onChange={onSourceChageHandler} /></div>
        {links}
    </div>);
}

export default All;