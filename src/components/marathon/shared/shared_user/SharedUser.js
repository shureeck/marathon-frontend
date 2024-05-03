import './SharedUser.css'
const SharedUser = (props) => {
    const label = props.label;

    return (<div className="shared_user">
        <div>{label}</div>
        <button className='dish_control__btn' >
            <img src="rem.png" alt="buttonpng" border="0" />
        </button>
    </div>);

}

export default SharedUser;