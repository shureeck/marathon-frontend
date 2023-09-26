import { useState, useEffect } from 'react';
import axios from 'axios';

const Recipe = () => {
    const [recipe, setRecipe] = useState();

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        if (queryParameters.size === 1) {
            const dish = queryParameters.get('dish');

            axios.get(`https://oapec6r46c.execute-api.eu-west-1.amazonaws.com/PROD?dish=${dish}`)
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

    return (<div dangerouslySetInnerHTML={{ __html: recipe }}></div>);
}

export default Recipe;