import React, { useState, useEffect } from 'react';
import './Accordion.css';
import MyData from './MyData';
import Week from './week/Week';
import axios from 'axios';

const Accordion = (props) => {

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
    }, [])

    console.log(posts)

    const days = MyData;
    const weekSlist = posts.length > 0
        ? posts.map((week) => { return (<Week key={week.week} week={week.week} days={week.days}></Week>); })
        : <div>Ther are no any Data</div>;
    return <div>
        {weekSlist}
    </div>;

};

export default Accordion;