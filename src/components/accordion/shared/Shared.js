import { useState } from "react";
import Modal from 'react-modal';
import "./Shared.css"
import Button from "../../../patterns/button/Button"
import MultiSelect from "../../../patterns/multi_select/MultiSelect";

const Shared = (props) => {
    let options = [{ value: "1", label: "Поляков Олександр (poliakovaleek@gmail.com)" },
    { value: "2", label: "Иванов Иван  (ivanivan.19900205@gmail.com)" },
    { value: "3", label: "Полякова Ольга (poliakovaolga@gmail.com)" },
    { value: "4", label: "Федоренко Оксана (mojemai@gmail.com)" },
    { value: "5", label: "Петров Игорь (petroffihor@gmail.com)" },
    { value: "6", label: "Субота Олександр (solekkksandr@gmail.com)" },
    { value: "7", label: "Неділя Андре (lastdayandre@gmail.com)" }]

    return (<Modal isOpen={props.isOpen}
        contentLabel="Example Modal"
        style={{
            content: { backgroundColor: '#FFF6EE' }
        }}>
        <div className="shared">
            <div className="shared__selection">
                <MultiSelect isMulti={false}  options={options}/>
                <div className="shared__selected">
                    <div>Иванов Иван  (ivanivan.19900205@gmail.com)</div>
                    <div>Полякова Ольга (poliakovaolga@gmail.com)</div>
                    <div>Неділя Андре (lastdayandre@gmail.com)</div>

                </div>

            </div>
            <div className="shared_buttons">
                <Button onClick={props.onCancelClick} name="Скасувати" />
                <Button onClick={props.onCancelClick} name="Поділитись" />
            </div>
        </div>
    </Modal >);
}

export default Shared;