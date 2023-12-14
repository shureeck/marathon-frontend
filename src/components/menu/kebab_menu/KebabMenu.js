import { useState } from 'react';
import KebabItems from './KebabItems';

import './KebabMenu.css'

const KebabMenu = (props) => {
    const [items, steItems] = useState();

    const mouseLeaveHandler = (event) => {
        const element = event.currentTarget;
        const classN = 'clicked';
        element.classList.remove(classN);
        steItems(undefined);

    };

    const clickHandler = (event) => {
        const element = event.currentTarget.getElementsByClassName('kebab')[0];
        const classN = 'clicked';
       if (element.classList.value.includes(classN)){
            element.classList.remove(classN);
            steItems(undefined);
        }else{
            element.classList.add(classN);
            steItems(props.items);
        } 
    };

    return (
        <div onClick={clickHandler} className='kebab_body'>
            <div onMouseLeave={mouseLeaveHandler} className="kebab">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <KebabItems items={items} />
        </div>)
}

export default KebabMenu;