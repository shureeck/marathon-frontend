import { useEffect } from 'react';
import ArchLink from '../../patterns/archlink/ArchLink';
import './Archive.css'
import { useState } from 'react';
import api from '../../Api';

const Archive = (props) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        api().get('/marathon_list')
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