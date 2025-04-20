import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const flags = {
  position: "absolute",
  right: "20px",
  top: "20px",
  height: "30px",
  width: "auto",

}

const labelStyle = {
  fontSize: "20px",
  color: "#FE7a47",
  display: "inline-block",
  position: "relative",
  top: "20px",
  marginRight: "5px",
  fontWeight: "bold",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  '@media only screen and (max-width: 600px)': {
    display:"none"
}
}

const selectStyle = {
  position: "relative",
  display: "inline-block",
  height: "30px",
  width: "35px",
  boxShadow: 'none',
  '.MuiOutlinedInput-notchedOutline': { border: 0 },
  '.MuiSvgIcon-root': { display: "none" },
  '.MuiSelect-outlined': {
    height: "30px",
    width: "35px",
    padding: "0"
  },
  '.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
    { padding: "0" }
}

const uaStyle = {
  background: "url(ua.png)",
  height: "30px",
  width: "35px",
  backgroundSize: "cover",
  borderRadius: "30%"
};
const plStyle = {
  background: "url(pl.png)",
  height: "30px",
  width: "35px",
  backgroundSize: "cover",
  borderRadius: "30%"
};
const enStyle = {
  background: "url(en.png)",
  height: "30px",
  width: "35px",
  backgroundSize: "cover",
  borderRadius: "30%"
};

const Localization = (props) => {
 // const [loc, setLoc] = React.useState(localStorage.getItem('loc') || 'ua');
  const [langLabel, setlangLabel] = React.useState(getLanguage(localStorage.getItem('loc')));

  const handleChange = (event) => {
    setlangLabel(getLanguage(event.target.value));
    localStorage.setItem('loc',event.target.value);
    props.setLoc(event.target.value);
  };

  return (
    <FormControl fullWidth sx={flags} size="small">
      <InputLabel sx={labelStyle} id="key">{langLabel}</InputLabel>
      <Select sx={selectStyle}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.loc}
        onChange={handleChange}
      >
        <MenuItem value="ua"><div style={uaStyle} /></MenuItem>
        <MenuItem value="pl"><div style={plStyle}></div></MenuItem>
        <MenuItem value="en"><div style={enStyle}></div></MenuItem>
      </Select>
    </FormControl>
  );
}

const getLanguage=(loc)=>{
  switch (loc) {
    case 'ua':
     return 'Мова';
      break;
    case 'pl':
      return'Język'
      break;
    case 'en': 
      return'Language';
  }
  return 'Мова';

}
export default Localization;