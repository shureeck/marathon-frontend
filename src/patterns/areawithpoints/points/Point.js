import './Point.css'

const Point = (props) => {
    const text = props.text
    const active = props.active
    const onCheckHandler = (event) => {
        const tmpChecked = event.target.checked;
        props.onActiveChange({ key: text, status: tmpChecked });
    };
    const onClickHandler = () => {
        props.onDeleteClick(text);
    }

    const labelActive = active ? <label className='point__label__active'>(active)</label> : '';

    return <div active={`${active}`} className='point'>
        {labelActive}
        <input type='checkbox' checked={active} onChange={onCheckHandler} className='point__check'></input>
        <span>{text}</span>
        <button type='button' className='point__btn' onClick={onClickHandler}>x</button>
    </div>
}

export default Point;