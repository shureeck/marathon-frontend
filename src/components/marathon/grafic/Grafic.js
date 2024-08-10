import DishControl from '../../../patterns/dish_control/DishControl';
import './Grafic.css'
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import useToken from '../../../useToken';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `0`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
    borderLeft: `10px solid #D8412F`,
    marginRight: `2em`,
    marginLeft: `2em`,

    '@media only screen and (max-width: 600px)': {
        margin: '0',
    }

}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    background: `rgba(245, 202, 153, .03)`,
    boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.2)`,
    textAlign: `left`,
    borderRadius: `5px`,
    margin: `15px`
}));

const Grafic = (props) => {
    const [token, setToken] = useToken();
    const navigate = useNavigate();
    const food = props.data.food;
    const schedule = props.line ? `${props.line} > ${props.data.name} ${props.data.time}` : '';
    const onLinkClick = (event) => {
        //   navigate(`${event.target.href}&line=${schedule}`);
    }

    const removClickHandler = (event) => {
        const id = event.target.parentElement.id;
        const text = (event.target.parentElement.getAttribute('food'));
        const sceduleName = props.data.name;
        const scheduleTime = props.data.time;
        const obj = {
            food: {
                id: id,
                title: text
            },
            schedule: sceduleName,
            time: scheduleTime,
        }
        props.onRemoveClick(obj);
    }
    let clazz = 'grafic info';
    const data = props.data;

    const foodLinks = food.map((item) => {
        let removeBtn = "";
        if (typeof token !== 'undefined') {
            const tokenDecoded = jwt_decode(token);
            removeBtn = (props.onRemoveClick && tokenDecoded.role === 'Admin') ? <DishControl id={item.id} food={item.title} onRemoveClick={removClickHandler} /> : "";
        }
        const lineParam = schedule.length === 0 ? '' : `&line=${schedule}`;
        return <div key={Object.values(item)} className='grafic__a'>

            <a onClick={onLinkClick} href={`/cooking?dish=${item.id}${lineParam}`}>{item.title}</a>
            {removeBtn}
        </div>

    });

    const id = `${props.id}${data.name}${data.time}`;
    return <Accordion defaultExpanded>
        <AccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon />}
            aria-controls={id}
            id={id}
        >
            <Typography sx={{ fontSize: '1.17em', fontWeight: 'bold', }}>
                {` ${data.name} ${(data.time === null) ? "" : data.time}`}
            </Typography>
        </AccordionSummary >
        <AccordionDetails >
            <Typography component="span">
                {foodLinks}
            </Typography>
        </AccordionDetails>
    </Accordion>
}

export default Grafic;