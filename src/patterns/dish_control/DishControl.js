import { IconButton } from '@mui/material';
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
}

export default DishControl;