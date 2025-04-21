import './KebabItems.css';
import { useNavigate } from 'react-router-dom';
import {getTranslation} from '../../../Utils'

const KebabItems = (props) => {

    const kebabClick=()=>{
        const element = document.getElementsByClassName('kebab')[0];
        const classN = 'clicked';
        if(element){
            if (element.classList.value.includes(classN)){
                element.classList.remove(classN);
                //steItems(undefined);
            }else{
                element.classList.add(classN);
               // steItems(props.items);
            } 
    
        }
    }

    const navigate = useNavigate();
    const clickHandler = (event) => {
        kebabClick();
        navigate(event.target.getAttribute('path'), { replace: true });
    };

    const menuItems = props.items?.map((item) => {
        return (<button className='kebab__buttons'
            key={item.path}
            path={item.path}
            onClick={clickHandler}
            disabled={item.disabled}>{getTranslation(item)}</button>);
    });

    return <div className='kebab_items'>
        {menuItems}
    </div>
}

export default KebabItems;