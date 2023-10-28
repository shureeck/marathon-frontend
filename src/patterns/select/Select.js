import './Select.css'

const AddSelected = (props) => {
    const label = props.label;
    const options = props.options
        ? props.options.map((item) => { return <option value={props.options.indexOf(item)}>{item}</option> })
        : [];
    return (<div>
        <label className='Select__label'>{label}</label>
        <select className='Select__select'>
            {options}
        </select>
    </div>);
}

export default AddSelected;