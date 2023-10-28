
import './AreaWithPoints.css'
import Point from './points/Point';

const AreaWithPoints = (props) => {
    let list=props.options;

    const activationHandler = (item) => {
        const tmp = [...list];
        const status = item.status;
        for (const marathon of tmp) {
            if (status) {
                marathon.active = false;
            }
            if (item.key === marathon.name) {
                marathon.active = item.status;
            }
        }
        props.onChange(tmp)
    };
    
    const onDeleteClickHandler = (name) => {
        const tmp = [...list];
        for (const marathon of tmp) {
            if (name === marathon.name) {
                tmp.splice(tmp.indexOf(marathon), 1);
            }
        }
        props.onChange(tmp)

    }

    const points = list ? list.map((item) => {
        return <Point onActiveChange={activationHandler} onDeleteClick={onDeleteClickHandler}
            key={list.indexOf(item)} text={item.name} active={item.active} />
    }) : [];

    const label = props.label;
    return <div>
        <label className='AreaWithPoint__label'>{label}</label>
        <div className='AreaWithPoint__area'>
            {points}
        </div>
    </div>
}

export default AreaWithPoints;