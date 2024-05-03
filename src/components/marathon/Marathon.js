import React, { useState, useEffect } from 'react';
import './Marathon.css';
import Week from './week/Week';
import ProgressIndicator from '../../patterns/progress_ind/ProgressIndicator';
import { useNavigate } from 'react-router-dom';
import api from '../../Api';
import Shared from './shared/Shared';
//import { link } from 'fs';

const Marathon = () => {
    const [loader, showLoader] = useState(true)
    const [posts, setPosts] = useState([]);
    const [marathonName, setMarathonName] = useState();
    const [modalOpen, setIsOpen] = useState(false);
    const [marathonId, setMarathonId] = useState([]);

    const navigate = useNavigate();

    let errorText = <div className='errorText'>Немає призначеного марафону</div>;

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        const selected = localStorage.getItem('selected');
        const id = queryParameters.get('id') ? queryParameters.get('id') : selected;
        const param = id ? `?id=${id}` : '';

        api().get(`/${param}`)
            .then(response => {
                console.log("RESPONSE", response);
                showLoader(false);
                setMarathonId(response.data.marathonId);
                setPosts(response.data.weeks);
            })
            .catch(error => {
                showLoader(false);
                errorText = <div className='errorText'>{error.response}</div>;
                const status = error.response.status;
                console.error("ERROR", status);
                if (status === 401) {
                    navigate('/login');
                }
            });
        api().get(`/marathonTittle${param}`)
            .then(response => {
                console.log(response.data);
                setMarathonName(response.data[0]?.name);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const removeClickHandler = (object) => {
        const obj = {
            ...object,
            marathon: marathonName
        }

        if (window.confirm(`Видалити "${object.food.title}" у ${object.day} ${object.schedule} (${object.time}) ${object.week} `)) {
            api().delete('/', { params: { ...obj, food: obj.food.id } }).then(response => {
                console.log(response.data);
            })
                .catch(error => {
                    console.error(error);
                });
            const tmpArray = [...posts];
            const week = tmpArray.filter((item) => { return item.week === object.week })[0];
            const day = week.days.filter((item) => { return item.day === object.day })[0];
            const grafic = day.grafic.filter((item) => { return item.name === object.schedule && item.time === object.time })[0];
            for (let dish of grafic.food) {
                if (dish.id === object.food.id &&
                    dish.title === object.food.title) {
                    grafic.food.splice(grafic.food.indexOf(dish), 1);
                }
            }
            if (grafic.food.length === 0) {
                day.grafic.splice(day.grafic.indexOf(grafic), 1);
            }
            if (day.grafic.length === 0) {
                week.days.splice(week.days.indexOf(day), 1);
            }
            setPosts(tmpArray);
        }
    }

    const onShareCLick = () => {
        setIsOpen(true);
    }
    const onShareCancelCLick = () => {
        setIsOpen(false);
    }
    let weekSlist = <ProgressIndicator />;
    if (!loader) {
        weekSlist = posts.length > 0
            ? posts.map((week) => {
                return (<Week onRemoveClick={removeClickHandler} key={week.week} week={week.week} days={week.days}></Week>);
            })
            : errorText;
    }
    return <div className='accordion'>
        <div>
            <h2 className='accordion__h2' key="h2">{marathonName}
            </h2>
        </div>
        {/* <button className='accordion__button' onClick={onShareCLick} type="button"><div>Поділитися</div><img src='share.png'></img></button> */}
        {weekSlist}
        {/* <Shared isOpen={modalOpen} marathonId={marathonId} onCancelClick={onShareCancelCLick}></Shared> */}

    </div>;

};

export default Marathon;