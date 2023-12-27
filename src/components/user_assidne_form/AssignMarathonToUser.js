import api from '../../Api';
import AddSelected from '../../patterns/addselected/AddSelected';
import AreaWithPoints from '../../patterns/areawithpoints/AreaWithPoints';
import Button from '../../patterns/button/Button';
import Select from '../../patterns/select/Select';
import './AssignMarathonToUser.css';
import { useState, useEffect } from 'react';

const AssignMarathonToUser = (props) => {
   
    const [users, setUsers] = useState();
    const [marathonList, setMarathonList] = useState();
    const [assigned, setAssigned] = useState();

    useEffect(() => {
        api.get('/users')
            .then(response => {
                const usersResponse = response.data;
                setUsers(usersResponse.map((user) => { return `${user.firstname} ${user.lastname} (${user.username})` }));
                console.log(assigned);
            })
            .catch(error => {
                console.error(error);
            });

        api.get('/marathon_list')
            .then(response => {
                const marathons = response.data;
                setMarathonList(marathons.map((itme) => { return `${itme.name}` }));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        api.get('/marathon_list?user=2')
            .then(response => {
                const responseData = response.data;
                setAssigned(responseData.map((item) => {
                    console.log(item.name)
                    return { name: item.name, active: item.active };
                }));
                console.log(assigned);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (<div>
        <form id="assign__form" className='assign__form'>
            <Select label='Користувач' options={users} />
            <AddSelected label='Марафон' options={marathonList} />
            <AreaWithPoints label='Назначені марафони'onChange={setAssigned} options={assigned} />
            <Button name='Скасувати'></Button>
            <Button name='Оновити'></Button>
        </form>
    </div>);
}


export default AssignMarathonToUser;