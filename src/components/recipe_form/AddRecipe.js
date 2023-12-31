import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import './AddRecipe.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../Api';


const AddRecipe = () => {
    const navigate = useNavigate();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [tittle, setTittle] = useState();
    const[errorClass, setError] = useState('AddRecipe__input');

    const onSaveClick = () => {
        const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const recipe = { tittle, text: value };
        api().post('/recipe', recipe)
            .then(response => {
                console.log("Response");
                console.log(response.data);
                navigate(`/menu?id=${response.data.id}&tittle=${response.data.tittle}`, {replace:true});
            })
            .catch(error => {
                const status = error.response.status;
                if (status === 401) {
                    navigate('/login');
                }
                console.log("Error")
                console.error(error);
                alert(error.response.data);
                setError(`${errorClass} AddRecipe__error`)
            });
        console.log(recipe);
    }

    const onTittleChange = (event) => {
        setTittle(event.target.value);

    }

    return (<div className='AddRecipe'>
        <h2>Новий рецепт</h2>
        <form className='AddRecipe__form'>
            <label>Назва страви</label>
            <input id='name' className={errorClass} value={tittle} onChange={onTittleChange}></input>
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