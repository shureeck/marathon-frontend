import { useNavigate } from 'react-router-dom';
import api from '../../Api';
import './Recipe.css'
import { useState, useEffect } from 'react';

const Recipe = () => {
    const [recipe, setRecipe] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        if (queryParameters.size === 1) {
            const dish = queryParameters.get('dish');

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
        }
    }, [recipe]);

    return (<div className='recipe' dangerouslySetInnerHTML={{ __html: recipe }}></div>);
}

export default Recipe;