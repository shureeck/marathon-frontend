import MultiSelect from '../../patterns/multi_select/MultiSelect';
import './InputCom.css'

const InputCom = (props) => {
    const onChangeHandler = (event) => {
        props.onDataChange(event.target.value);
    }
    const tittle = props.label;
    const type = props.type;
    const value = props.value;
    let inputElement = undefined;
    switch (type) {
        case 'week':
            inputElement = <input className='InputCom__input' value={value} width="500" onChange={onChangeHandler} type='number' step='1' />;
            break;
        case 'day':
            let days = [{ value: "1", label: "Понеділок" },
            { value: "2", label: "Вівторок" },
            { value: "3", label: "Середа" },
            { value: "4", label: "Четвер" },
            { value: "5", label: "П'ятниця" },
            { value: "6", label: "Субота" },
            { value: "7", label: "Неділя" }];
            inputElement = <MultiSelect isMulti={props.isMulti} value={props.value} onChange={props.onDataChange} options={days} className='InputCom__input' />
            break;
        case 'combobox':
            let options;
            if (typeof props.options !== 'undefined') {
                options = Object.entries(props.options).map((item) => {
                    return { label: item[1], value: item[0] }
                });
            }
            inputElement = <MultiSelect isMulti={props.isMulti} onChange={props.onDataChange} value={props.value} options={options}></MultiSelect>
            break;
        default:
            inputElement = <input onChange={onChangeHandler} value={value} type="text" className='InputCom__input'></input>
    }
    return (<div className='InputCom'>
        <label className='InputCom__label'>{tittle}</label>
        {inputElement}

    </div>);
}

export default InputCom;