import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const formStyle = { m: 1, minWidth: '50%', background: '#FFF' };
const labelStyle = { fontSize: '20px', color: "#000", fontStyle: 'italic' };

const textStTyle = {
    "& .MuiFormLabel-root": {
        color: "#000",
        fontSize: '20px',
        fontStyle: 'italic'
    },
    "input[type=number]::-webkit-outer-spin-button,  input[type=number]::-webkit-inner-spin-button": {
        height: "39px",
        "-webkit-appearance": "none",
        background:
            "#FFF url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAdCAIAAACrPpLuAAABgUlEQVR42u2Vz6qCQBTG808GtYsewEULg1bZImkh0TIQAslN+IIVCvUaUgshgnIThEWEqyizvN9NiEstNM3V7VvIMHPkd+abc2YI3/czKYv4fwz/LpIkU2RsNhvbtmu1WloMx3FGo5Fpmv1+n+f5zzMOh8NkMjEM43Q6FYtFVVUrlconGdjBeDyeTqcY0zR9PB5LpZIsy9Vq9TOM7XYLi2azGcYURf3+QBDYDTDdblcQhKSM/X6P9FerFWICwEOu68K0er3OsizDMDEZmEe+cAbF+gSAbrfb9XqFdYVCAd+k55FcX8aX8RDmL5cL+gCFi/J9DUPtoh9zudxrZb/B2O12uATR6vRdf5c8z8tmsxzHlcvl+D0YyLKswWCwXC7BeLwc5/M5n893Op12ux3agOGMzP3Z0DRtsVggcZgTACRJajabSc/jCaPrOjCwCM4oitJoNCICojICzHA4nM/nvV6v1WpFB7zBgHABr9drURThWFoMROK6Da3URIzY+jKi6wcBZwfWG51sxwAAAABJRU5ErkJggg==) no-repeat center center",
        width: "2em",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        borderTopRightRadius: "0.25rem",
        borderBottomRightRadius: "0.25rem"
    }
};

const InputCom = (props) => {
    const onChangeHandler = (event) => {
        props.onDataChange(event.target.value);
    }
    const tittle = props.label;
    const type = props.type;
    const value = props.value
        ? props.value.value ? props.value.value : props.value
        : '';
    console.log(value)

    let inputElement = undefined;
    switch (type) {
        case 'week':
            inputElement =
                <FormControl sx={formStyle} size='small'>
                    <TextField
                        sx={textStTyle}
                        id="filled-number"
                        label={tittle}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={value}
                        variant="outlined"
                        onChange={onChangeHandler}
                        step="1"
                        size='small'
                    />
                </FormControl>
            break;
        case 'day':

            let days = [<MenuItem key="1" value="1">Понеділок</MenuItem>,
            <MenuItem key="2" value="2">Вівторок</MenuItem>,
            <MenuItem key="3" value="3">Середа</MenuItem>,
            <MenuItem key="4" value="4">Четвер</MenuItem>,
            <MenuItem key="5" value="5">П'ятниця</MenuItem>,
            <MenuItem key="6" value="6">Субота</MenuItem>,
            <MenuItem key="7" value="7">Неділя</MenuItem>
            ]
            inputElement = <FormControl size="small" sx={formStyle}>
                <InputLabel shrink sx={labelStyle} id="demo-simple-select-helper-label">{tittle}</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    defaultValue={value}
                    value={value}
                    label={tittle}
                    onChange={onChangeHandler}
                    variant='outlined'
                    multiple
                >
                    {days}
                </Select>
            </FormControl>
            break;
        case 'combobox':
            let options;
            if (typeof props.options !== 'undefined') {
                options = Object.entries(props.options).map((item) => {
                    return <MenuItem key={item[0]} value={item[0]}>{item[1]}</MenuItem>
                });
            }

            inputElement = <FormControl size="small" sx={formStyle}>
                <InputLabel shrink sx={labelStyle} id="demo-simple-select-helper-label">{tittle}</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={value}
                    defaultValue={value}

                    label={tittle}
                    onChange={onChangeHandler}
                >
                    {options}
                </Select>
            </FormControl>
            break;
        default:
            inputElement =
                <FormControl sx={formStyle} size='small'>
                    <TextField
                        sx={textStTyle}
                        label={tittle}
                        variant="outlined"
                        onChange={onChangeHandler}
                        size='small'
                        type="text"
                        value={value}
                    />
                </FormControl>
    }
    return (<div className='InputCom'>
        {inputElement}
    </div>);
}

export default InputCom;