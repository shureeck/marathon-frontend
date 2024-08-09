import Grafic from '../grafic/Grafic';
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
    margin: `2em`,
    backgroundColor: `rgba(255, 255, 255, 0.0)`,
    '@media only screen and (max-width: 600px)': {
        margin: '0',
        marginBottom: '10px',
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
    backgroundColor: `rgba(245, 202, 153, 0.75)`,
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    backgroundColor: `rgba(255, 255, 255, 0.1)`,
    boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.2)`,

}));

const Day = (props) => {
    const removClickHandler = (Object) => {
        const obj = { ...Object, day: props.tittle }
        props.onRemoveClick(obj);
    }
    const day = props.tittle;
    const id = `${props.id}${day}`;
    const schedule = props.schedule;
    const line = `${props.line} > ${day}`

    const graficComponent = schedule.map((item) => {
        return (<Grafic id={id} key={id+schedule.indexOf(item)} onRemoveClick={removClickHandler} line={line} data={item} className='day_grafic'></Grafic>);
    });

    return <Accordion>
        <AccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon />}
            aria-controls={id}
            id={id}
        >
            <Typography sx={{ fontSize: '1.17em', fontWeight: 'bold', }}>
                {day}
            </Typography>
        </AccordionSummary >
        <AccordionDetails >
            <Typography component="span">
                {graficComponent}
            </Typography>
        </AccordionDetails>
    </Accordion>

};

export default Day;