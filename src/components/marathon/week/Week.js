import Day from '../day/Day'
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
    backgroundColor: `rgba(255, 255, 255, 0.0)`,
    margin: `2em`,
    '@media only screen and (max-width: 600px)': {
        margin: '5px',
        marginBottom: '20px',
    },
    "h2":{color:"#fff"}
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
    'p': {
        margin: 'auto'
    },
    backgroundColor: `rgba(216, 65, 47, 0.75)`,
    color: `#fff`,
    borderRadius: `10px`,
    textAlign: `center`,
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    backgroundColor: `rgba(255, 255, 255, 0.1)`,
    boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.2)`,
}));

const Week = (props) => {

    const removeClickHandler = (object) => {
        const obj = { ...object, week: week };
        props.onRemoveClick(obj);
    }
    const week = props.week;
    const id = week;
    const days = props.days;
    const daysComponent = days.map((item) => {
        return <Day key={id + item.day} line={week} onRemoveClick={removeClickHandler} id={id} tittle={item.day} schedule={item.grafic} />;
    });

    return <Accordion>
        <AccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon />}
            aria-controls={id}
            id={id}
        >
            <Typography>
                <h2>
                    <div className='week__name'>{week}</div>
                </h2>
            </Typography>
        </AccordionSummary >
        <AccordionDetails >
            <Typography>
                {daysComponent}
            </Typography>
        </AccordionDetails>
    </Accordion>
}

export default Week;