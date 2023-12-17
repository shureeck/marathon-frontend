import React, { useState, useEffect } from 'react';
import './Accordion.css';
import Week from './week/Week';
import axios from 'axios';
import ProgressIndicator from '../../patterns/progress_ind/ProgressIndicator';

const Accordion = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        const id = queryParameters.get('id');
        const param = id ? `?id=${id}` : '';
        axios.get(`https://oapec6r46c.execute-api.eu-west-1.amazonaws.com/PROD/${param}`)
            .then(response => {
                console.log(response.data);
                setPosts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const removeClickHandler = (object) => {
        const tmpArray = [...posts];
        const week = tmpArray.filter((item) => { return item.week === object.week })[0];
        const day = week.days.filter((item) => { return item.day === object.day })[0];
        const grafic = day.grafic.filter((item) => { return item.name === object.schedule && item.time === object.time })[0];
        for (let dish of grafic.food) {
            if (Object.values(dish)[0] == object.food) {
                grafic.food.splice(grafic.food.indexOf(dish), 1);
                if (grafic.food.length === 0) {
                    console.log(day.grafic.indexOf(grafic))
                    day.grafic.splice(day.grafic.indexOf(grafic), 1);
                    if (day.grafic.length === 0) {
                        week.days.splice(week.days.indexOf(day), 1);
                    }
                }
            }
        }
        setPosts(tmpArray);
    }

    console.log(posts);
    const weekSlist = posts.length > 0
        ? posts.map((week) => {
            return  (<Week onRemoveClick={removeClickHandler} key={week.week} week={week.week} days={week.days}></Week>);
        })
        : <ProgressIndicator/>;
    return <div className='accordion'>
    {weekSlist}
    </div>;

};

export default Accordion;