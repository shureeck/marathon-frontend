import { useNavigate } from 'react-router-dom';
import api from '../../Api';
import './Recipe.css'
import { useState, useEffect } from 'react';
import useToken from '../../useToken';
import jwt_decode from 'jwt-decode';

const Recipe = () => {
    const [recipe, setRecipe] = useState();
    const [title, setTittle] = useState();
    const [line, setLine] = useState('');
    const [list, setList] = useState([]);
    const [hidden, setHidden] = useState(true);
    const [token, setToken] = useToken()
    const navigate = useNavigate();

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        if (queryParameters.size > 0) {
            const dish = queryParameters.get('dish');
            setLine(queryParameters.get('line') ? queryParameters.get('line') : '');
            api().get(`?dish=${dish}`)
                .then(response => {
                    console.log(response.data);
                    setRecipe(response.data);
                })
                .catch(error => {
                    setRecipe(error);
                    console.error(error);
                    const status = error.response.status;
                    if (status === 401) {
                        navigate('/login');
                    }
                });
            api().get(`/dishes?id=${dish}`)
                .then(response => {
                    console.log(response.data);
                    const text = Object.values(response.data)
                    setTittle(text);
                })
                .catch(error => {
                    console.error(error);
                    const status = error.response.status;
                    if (status === 401) {
                        navigate('/login');
                    }
                });
            api().get(`/marathon_list?dish=${dish}`)
                .then(response => {
                    setList(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                    const status = error.response.status;
                    if (status === 401) {
                        navigate('/login');
                    }
                });
        }
    }, [recipe]);

    const marathonsLi = list.map((element) => { return <li key={list.indexOf(element)} >{element}</li> });

    const onImageClick = () => {
        setHidden(false);
    }
    const onUnClick = () => {
        setHidden(true);
    }

    const onEditClick = () => {
        const queryParameters = new URLSearchParams(window.location.search);
        const dish = queryParameters.get('dish');
        navigate(`/recipe/edit?dish=${dish}`)
    }

    let editControl = "";
    if (typeof token !== 'undefined') {
        const tokenDecoded = jwt_decode(token);
        editControl = tokenDecoded.role === 'Admin'
            ? (<div className='recipe__imgs'>
                <div onClick={onEditClick}><img src='edit.png'></img></div>
                <ul hidden={hidden} >{marathonsLi}</ul>
                <div onMouseDown={onImageClick} onMouseUp={onUnClick}><img src='info.png'></img></div>
            </div>)
            : "";
    }

    return (<div className='recipe'>
        {editControl}
        <a className='line' href='/'>{line}</a>
        <div><h2>{title}</h2></div>
        <div dangerouslySetInnerHTML={{ __html: recipe }}></div>
    </div>);
}

export default Recipe;