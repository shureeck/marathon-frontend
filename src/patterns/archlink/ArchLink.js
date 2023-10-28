import './ArchLink.css'
import { useNavigate } from 'react-router-dom';

const ArchLink = (props) => {
    const href = props.href;
    const name = props.name;
    const date = props.date;
    const description = props.description ? props.description : '';

    const navigate = useNavigate();

    const onClick = (event) => {
        navigate(event.target.href);
    }
    return (
        <a className='archive_a' onClick={onClick} href={href}>
            <div className='arch_table name'>{name}</div>
            <div className='arch_table date'>{date}</div>
            <div className='arch_table description'>{description}</div>
        </a>);

}
export default ArchLink;