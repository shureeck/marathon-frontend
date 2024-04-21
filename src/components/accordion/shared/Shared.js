import { useEffect, useState } from "react";
import Modal from 'react-modal';
import "./Shared.css"
import Button from "../../../patterns/button/Button"
import MultiSelect from "../../../patterns/multi_select/MultiSelect";
import SharedUser from "./shared_user/SharedUser";
import { useNavigate } from 'react-router-dom';
import api from '../../../Api';

const Shared = (props) => {
    let options = [];

    const navigate = useNavigate();
    const assined = [];
    const [sharedUsers, setSharedUsers] = useState(assined);
    const [users, setUsers] = useState(options);

    const shareComponent = sharedUsers.map((item) => { return <SharedUser key={item.value} id={item.value} label={item.label} /> });

    useEffect(() => {
        api().get(`/users?marathonID=${props.marathonId}`)
            .then(response => {
                const tmpArray = response.data.map((user) => {
                    return ({
                        value: user.id,
                        label: `${user.firstname} ${user.lastname} (${user.username})`
                    })
                });
                setSharedUsers(tmpArray);
            })
            .catch(error => {
                console.error(error);
                const status = error.response.status;
                if (status === 401) {
                    navigate('/login');
                }
            });
        api().get('/users')
            .then(response => {
                const tmpArray = response.data.map((user) => {
                    return ({
                        value: user.id,
                        label: `${user.firstname} ${user.lastname} (${user.username})`
                    })
                });
                setUsers(tmpArray);
            })
            .catch(error => {
                console.error(error);
                const status = error.response.status;
                if (status === 401) {
                    navigate('/login');
                }
            });
    }, []);

    const multiSelectChangeHandler = (event) => {
        setUsers(users.filter((item) => { return item.value !== event.value }));
        const tmp = [...sharedUsers];
        tmp.push(event);
        setSharedUsers(tmp);
        console.log(event);
    }

    return (<Modal isOpen={props.isOpen}
        contentLabel="Example Modal"
        ariaHideApp={false}
        style={{
            content: { backgroundColor: '#FFF6EE' }
        }}>
        <div className="shared">
            <div className="shared__selection">
                <MultiSelect isMulti={false} onChange={multiSelectChangeHandler} options={users} />
                <div className="shared__selected">
                    {shareComponent}
                </div>
            </div>
            <div className="shared_buttons">
                <Button onClick={props.onCancelClick} name="Скасувати" />
                <Button onClick={props.onCancelClick} name="Поділитись" />
            </div>
        </div>
    </Modal >);
}

export default Shared;