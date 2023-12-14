import './Menu.css'
import { useNavigate } from 'react-router-dom';
import KebabMenu from './kebab_menu/KebabMenu';

const detectMob = () => {
    console.log(window.innerWidth);
    return ((window.innerWidth <= 600));
}

const Menu = (props) => {
    const navigate = useNavigate();

    const clickHandler = (event) => {
        navigate(event.target.getAttribute('path'), { replace: true });
    };

    const menuBar = detectMob()
        ? <KebabMenu items={props.items} />
        : props.items.map((item) => {
            return (<button className='menu__buttons'
                key={item.path}
                path={item.path}
                onClick={clickHandler}
                disabled={item.disabled}>{item.name}</button>);
        })


    return (<div className='Menu'>
        {menuBar}
    </div>)
}
export default Menu;