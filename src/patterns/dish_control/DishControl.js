import { IconButton } from '@mui/material';
import './DishControl.css'
import { DeleteOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledButton = styled((props) => (
    <IconButton {...props} />
))(({ theme }) => ({
color: '#D8412F',
//float: 'right',
position: 'absolute',
right: '5px',
top:'2px'
}));

const DishControl = (props) => {
    return <StyledButton id={props.id} food={props.food} onClick={props.onRemoveClick}>
        <DeleteOutlined />
    </StyledButton>

    return <div id={props.id} food={props.food} className='dish_control'>
        <button className='dish_control__btn' onClick={props.onRemoveClick}>
            <img src="rem.png" alt="buttonpng" border="0" />
        </button>
    </div>
}

export default DishControl;