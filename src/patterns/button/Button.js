import './Button.css'

const Button = (props) => {
    const name = props.name;
    return <button type='button' onClick={props.onClick} className='my_button'>{name}</button>
}

export default Button;