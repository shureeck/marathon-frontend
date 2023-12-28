import { useNavigate } from 'react-router-dom';
import './Login.css'
import { useState } from 'react';
import api from '../../Api';

const Login = (props) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
const navigate = useNavigate();
   const onLoginClick=()=>{
        const recipe = { username:username, password:password };
        api().post('/login', recipe)
            .then(response => {
                props.setToken(response.data);
                navigate('/');
                
            })
            .catch(error => {
                console.log("Error")
                console.error(error);
                alert(error.response.data);
            });
    }

    const loginChangeHandler=(event)=>{setUserName(event.target.value);}
    const passChangeHandler=(event)=>{setPassword(event.target.value);}

    return (<div className='Login'>
        <h2 className='Login__h2' >Увійти до аккаунту</h2>
        <form>
            <label className='Login__label'>Ім'я користувача</label>
            <input type='text' placeholder='e-mail' className='Login__input' onChange={loginChangeHandler} value={username}></input>
            <label className='Login__label'>Пароль</label>
            <input type='password' placeholder='password' className='Login__input' onChange={passChangeHandler} value={password}></input>
            <button className='Login__button' onClick={onLoginClick} type='button'>Login</button>
            <button className='Login__button' type='button'>Cancel</button>
        </form>
    </div>);
}



export default Login;