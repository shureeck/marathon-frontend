import './AddSelected.css'

const AddSelected = (props) => {
    const label = props.label;
    const options = props.options
        ? props.options.map((item) => { return <option value={props.options.indexOf(item)}>{item}</option> })
        : [];
    return (<div>
        <label className='addSelected__label'>{label}</label>
        <select className='addSelected__select'>
            {options}
        </select>
        <button type='button' className='addSelected__btn'>+</button>
    </div>);
}

export default AddSelected;