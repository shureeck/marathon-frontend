import { useEffect } from 'react';
import ArchLink from '../../patterns/archlink/ArchLink';
import './Archive.css'
import axios from 'axios';
import { useState } from 'react';

const Archive = (props) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        axios.get('https://oapec6r46c.execute-api.eu-west-1.amazonaws.com/PROD/marathon_list')
            .then(response => {
                setList(response.data);
                marathonList.push();
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    const marathonList = list.map((item) => { return <ArchLink href={`/?id=${item.id}`} key={item.id} name={item.name} date={item.created} description={item.description} /> });

    return <div className='archive'>
        <h3>Архів</h3>
        {marathonList}
    </div>
}

export default Archive;