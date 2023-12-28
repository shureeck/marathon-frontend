import { useEffect } from 'react';
import ArchLink from '../../patterns/archlink/ArchLink';
import './Archive.css'
import { useState } from 'react';
import api from '../../Api';
import { useNavigate } from 'react-router-dom';

const Archive = (props) => {
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        api().get('/marathon_list')
            .then(response => {
                setList(response.data);
                marathonList.push();
            })
            .catch(error => {
                console.error(error);
                const status = error.response.status;
                if (status === 401) {
                    navigate('/login');
                }
            });
    }, []);
    const marathonList = list.map((item) => { return <ArchLink href={`/?id=${item.id}`} key={item.id} name={item.name} date={item.created} description={item.description} /> });

    return <div className='archive'>
        <h3>Архів</h3>
        {marathonList}
    </div>
}

export default Archive;