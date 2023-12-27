import { useState, useEffect } from 'react';
import Grafic from '../accordion/grafic/Grafic';
import './All.css'
import api from '../../Api';
const value = JSON.parse(`[{"name": "С","food": [{"Торт \\"Мурашник\\"": "44"},{"Сливовий пиріг": "43"},{"Сирний пиріг": "45"}]},
{"name": "В","food": [{"Перекус": "20"}]},
{"name": "Ц","food": [{"Перекус": "20"}]},
{"name": "А","food": [{"Перекус": "20"}]},
{"name": "Щ","food": [{"Перекус": "20"}]},
{"name": "М","food": [{"Перекус": "20"}]},
{"name": "И","food": [{"Перекус": "20"}]},
{"name": "О","food": [{"Смажена картопля з тунцем/курячим філе": "46"},{"Картопляна запіканка з печінкою": "47"}]},
{"name": "Я","food": [{"Фрукти": "17"},{"Пастила": "18"}]}]`);

const All = (props) => {
    const [value, setValue] = useState([]);
    const [data, setData] = useState(value);

    useEffect(() => {
        api().get('/all')
            .then(response => {
                console.log(response.data);
                setValue(response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
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