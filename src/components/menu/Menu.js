import './Menu.css'
import { useNavigate } from 'react-router-dom';

const Menu = (props) => {
    const navigate = useNavigate();

    const clickHandler = (event) => {
        navigate(event.target.getAttribute('path'), { replace: true });
    };

    const menuBar = props.items.map((item) => {
        return (<button className='menu__buttons'
            path={item.path}
            onClick={clickHandler}
            disabled={item.disabled}>{item.name}</button>);
    })


    return (<div className='Menu'>
        {menuBar}
    </div>)
}
export default Menu;