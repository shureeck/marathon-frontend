import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ColorLens, Padding } from '@mui/icons-material';

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

const Localization = () => {

  const [loc, setLoc] = React.useState('ua');
  const [langLabel, setlangLabel] = React.useState('Мова');

  const handleChange = (event) => {
    switch (event.target.value) {
      case 'ua':
        setlangLabel('Мова')
        break;
      case 'pl':
        setlangLabel('Język')
        break;
      case 'en':
        setlangLabel('Language')
        break;
    }
    setLoc(event.target.value);

  };

  return (
    <FormControl fullWidth sx={flags} size="small">
      <InputLabel sx={labelStyle} id="key">{langLabel}</InputLabel>
      <Select sx={selectStyle}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={loc}
        onChange={handleChange}
      >
        <MenuItem value="ua"><div style={uaStyle} /></MenuItem>
        <MenuItem value="pl"><div style={plStyle}></div></MenuItem>
        <MenuItem value="en"><div style={enStyle}></div></MenuItem>
      </Select>
    </FormControl>
  );
}
export default Localization;