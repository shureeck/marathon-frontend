import React, { useState, useEffect } from 'react';
import './Accordion.css';
import MyData from './MyData';
import Week from './week/Week';
import axios from 'axios';

const Accordion = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://oapec6r46c.execute-api.eu-west-1.amazonaws.com/PROD/')
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
    const weekSlist = posts.map((week) => { return (<Week key={week.week} week={week.week} days={week.days}></Week>); });
    return <div>
        {weekSlist}
    </div>;

};

export default Accordion;