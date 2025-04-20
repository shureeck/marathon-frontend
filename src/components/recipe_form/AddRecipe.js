import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import "./AddRecipe.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../Api";
import TextField from "@mui/material/TextField";
import {getTranslation} from '../../Utils'

const inputStyle = {
  width: "100%",
  backgroundColor: "#FFF",
  "& .MuiFormLabel-root": {
    color: "#000",
    fontSize: "20px",
    fontStyle: "italic",
    backgroundColor: "#fff",
  },
  marginBottom: "20px",
};

const AddRecipe = () => {
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [tittle, setTittle] = useState();
  const [errorClass, setError] = useState("AddRecipe__input");
  const location = useLocation();
  const queryParameters = new URLSearchParams(window.location.search);
  const dish = queryParameters.get("dish");

  useEffect(() => {
    if (queryParameters.size === 1) {
      api()
        .get(`?dish=${dish}`)
        .then((response) => {
          console.log(response.data);
          const text = response.data;
          setEditorState(
            EditorState.createWithContent(
              ContentState.createFromBlockArray(convertFromHTML(text))
            )
          );
        })
        .catch((error) => {
          setError(error);
          console.error(error);
          const status = error.response.status;
          if (status === 401) {
            navigate("/login");
          }
        });
      api()
        .get(`/dishes?id=${dish}`)
        .then((response) => {
          console.log(response.data);
          const text = Object.values(response.data)[0];
          setTittle(text);
        })
        .catch((error) => {
          setError(error);
          console.error(error);
          const status = error.response.status;
          if (status === 401) {
            navigate("/login");
          }
        });
    }
  }, []);

  const onNewClick = () => {
    const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const recipe = { tittle, text: value };
    api()
      .post("/recipe", recipe)
      .then((response) => {
        console.log("Response");
        console.log(response.data);
        navigate(
          `/menu?id=${response.data.id}&tittle=${response.data.tittle}`,
          { replace: true }
        );
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 401) {
          navigate("/login");
        }
        console.log("Error");
        console.error(error);
        alert(error.response.data);
        setError(`${errorClass} AddRecipe__error`);
      });
    console.log(recipe);
  };

  const onUpdateClick = () => {
    const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const recipe = { tittle: tittle, text: value, id: dish };
    api()
      .patch("/recipe", recipe)
      .then((response) => {
        console.log("Response");
        console.log(response.data);
        navigate(`/cooking?dish=${dish}`, { replace: true });
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 401) {
          navigate("/login");
        }
        console.log("Error");
        console.error(error);
        alert(error.response.data);
        setError(`${errorClass} AddRecipe__error`);
      });
  };

  const onSaveClick = () => {
    if (location.pathname === "/recipe/edit") {
      console.log(`Update reciepe id: ${dish}.`);
      onUpdateClick();
    } else {
      console.log("Create new reciepe.");
      onNewClick();
    }
  };

  const onTittleChange = (event) => {
    setTittle(event.target.value);
  };

  const onCancelClick = () => {
    navigate("/");
  };

  return (
    <div className="AddRecipe">
      <h2>{getTranslation({name:"Новий рецепт", pl:"Nowy przepis", en:"New recipe"})}</h2>
      <form className="AddRecipe__form">
        <TextField
          id="name"
          label={getTranslation({name:"Назва страви", pl:"Nazwa dania", en:"Name of dish"})} 
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          sx={inputStyle}
          value={tittle}
          onChange={onTittleChange}
        />
        <label className="EditorLabel">{getTranslation({name:"Рецепт", pl:"Przepis", en:"Recipe"})}</label>
        <div>
          <Editor
            editorClassName="editor"
            toolbar={tools}
            editorState={editorState}
            onEditorStateChange={setEditorState}
          ></Editor>
        </div>
        <div className="AddRecipe__buttons">
          <button type="button" onClick={onSaveClick}>
         {getTranslation({name:'Зберегти', pl:'Zapisz', en:'Save'})}
          </button>
          <button type="button" onClick={onCancelClick}>
          {getTranslation({name:'Скасувати', pl:'Anulować', en:'Cancel'})}
          </button>
        </div>
      </form>
    </div>
  );
};

const tools = {
  options: ["inline", "list", "link"],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["bold", "italic", "underline"],
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["unordered", "ordered"],
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
    defaultTargetOption: "_self",
    options: ["link", "unlink"],
    link: { icon: undefined, className: undefined },
    unlink: { icon: undefined, className: undefined },
    linkCallback: undefined,
  },
};

export default AddRecipe;
