import './KebabItems.css';
import { useNavigate } from 'react-router-dom';

const KebabItems = (props) => {

    const navigate = useNavigate();
    const clickHandler = (event) => {
        navigate(event.target.getAttribute('path'), { replace: true });
    };

    const menuItems = props.items?.map((item) => {
        return (<button className='kebab__buttons'
            key={item.path}
            path={item.path}
            onClick={clickHandler}
            disabled={item.disabled}>{item.name}</button>);
    });

    return <div className='kebab_items'>
        {menuItems}
    </div>
}

export default KebabItems;