import './DishControl.css'

const DishControl = (props) => {
    return <div id={props.id} food={props.food} className='dish_control'>
        <button className='dish_control__btn' onClick={props.onRemoveClick}>
            <img src="rem.png" alt="buttonpng" border="0" />
        </button>
    </div>
}

export default DishControl;