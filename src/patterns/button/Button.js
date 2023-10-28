import './Button.css'

const Button = (props) => {
    const name = props.name;
    return <button className='my_button'>{name}</button>
}

export default Button;