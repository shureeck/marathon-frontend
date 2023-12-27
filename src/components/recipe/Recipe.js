import api from '../../Api';
import './Recipe.css'
import { useState, useEffect } from 'react';

const Recipe = () => {
    const [recipe, setRecipe] = useState();

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
                });
        }
    }, [recipe]);

    return (<div className='recipe' dangerouslySetInnerHTML={{ __html: recipe }}></div>);
}

export default Recipe;