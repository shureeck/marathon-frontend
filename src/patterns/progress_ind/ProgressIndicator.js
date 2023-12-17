import './ProgressIndicator.css'

const ProgressIndicator = () => {
    return (<div>
        <div className="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className='text'>Завантаження...</div>
    </div>);

}

export default ProgressIndicator;