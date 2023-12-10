import './DishControl.css'
import remove from './remove.png'
import edit from './edit.png'

const DishControl = (props) => {
    return <div id={props.id} className='dish_control'>
        <button className='dish_control__btn' onClick={props.onRemoveClick}>
            <img src={remove} alt="buttonpng" border="0" />
        </button>
        <button className='dish_control__btn' onClick={props.onEditClick}>
            <img src={edit} alt="buttonpng" border="0" />
        </button>
    </div>
}

export default DishControl;