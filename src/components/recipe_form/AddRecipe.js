import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import './AddRecipe.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddRecipe = () => {
    const navigate = useNavigate();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [tittle, setTittle] = useState();

    const onSaveClick = () => {
        const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const recipe = { tittle, text: value };
        axios.post('https://oapec6r46c.execute-api.eu-west-1.amazonaws.com/PROD/recipe', recipe)
            .then(response => {
                console.log("Response");
                console.log(response.data);
                navigate(`/menu?id=${response.data.id}&tittle=${response.data.tittle}`, {replace:true});
            })
            .catch(error => {
                console.log("Error")
                console.error(error);
            });
        console.log(recipe);
    }

    const onTittleChange = (event) => {
        setTittle(event.target.value);

    }

    return (<div className='AddRecipe'>
        <form className='AddRecipe__form'>
            <label>Назва страви</label>
            <input id='name' value={tittle} onChange={onTittleChange}></input>
            <label>Рецепт</label>
            <div>
                <Editor editorClassName="editor" toolbar={tools} editorState={editorState} onEditorStateChange={setEditorState}></Editor>
            </div>
            <div className='AddRecipe__buttons'>
                <button type='button' onClick={onSaveClick}>Зберегти</button>
                <button type='button'>Скасувати</button>
            </div>
        </form>

    </div>);
}

const tools = {
    options: ['inline', 'list', 'link'],
    inline: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: ['bold', 'italic', 'underline'],
    },
    list: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: ['unordered', 'ordered'],
        unordered: { icon: undefined, className: undefined },
        ordered: { icon: undefined, className: undefined },
    },
    link: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        popupClassName: undefined,
        dropdownClassName: undefined,
        showOpenOptionOnHover: true,
        defaultTargetOption: '_self',
        options: ['link', 'unlink'],
        link: { icon: undefined, className: undefined },
        unlink: { icon: undefined, className: undefined },
        linkCallback: undefined
    }

}

export default AddRecipe;