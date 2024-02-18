import React from "react";
import Select, { components } from "react-select";
import { useState } from 'react';

const customStyles = {

    control: base => ({
        ...base,
        height: 33,
        width: 450,
        minHeight: 25,
        borderRadius: 0,
        coloer:'#000000',
        fontSize:18,
    }),
    option: base => ({
        ...base,
        textAlign:"left",
        width: 450
    }),
    menu: base => ({
        ...base,
        width: 450
    })
};

const MultiSelect = (props) => {
    const ValueContainer = ({
        children,
        ...props
    }) => {
        let [values, input] = children;

        if (Array.isArray(values)) {
            const plural = values.length === 1 ? "" : "s";
            if (values.length > 1) {
                values = `${values[0].props.data.label} + ${(values.length - 1)} more`;
            } else {
                values = values.map((item) => { return `${item.props.data.label}` })
            }
        }

        return (
            <components.ValueContainer {...props}>
                {values}
                {input}
            </components.ValueContainer>
        );
    };

    const [selected, setSelected] = useState([]);

    return (
        <Select
            styles={customStyles}
            value={props.value}
            onChange={props.onChange}
            options={props.options}
            isMulti={props.isMulti}
            isSearchable
            closeMenuOnSelect={true}
            hideSelectedOptions={false}
            components={{
                ValueContainer
            }}
        />
    );
}

export default MultiSelect;