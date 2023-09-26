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
            inputElement = <select value={value} onChange={onChangeHandler}  className='InputCom__input'>
                <option value="1">Понеділок</option>
                <option value="2">Вівторок</option>
                <option value="3">Середа</option>
                <option value="4">Четвер</option>
                <option value="5">П'ятниця</option>
                <option value="6">Субота</option>
                <option value="7">Неділя</option>
            </select>
            break;
        case 'eat':
            let options;
            if (typeof props.options !== 'undefined') {
                options = Object.entries(props.options).map((item) => {
                    return <option key={item[0]} value={item[0]}>{item[1]}</option>
                });
            }
            inputElement = <select onChange={onChangeHandler} value={value} className='InputCom__input'>
                {options}
            </select>
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