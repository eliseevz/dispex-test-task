import React, {useEffect, useRef} from 'react';
import ReactAutocomplete from "react-autocomplete"

const InputWithAutocomplete = ({onBlur, items, value, onChange, label, name}) => {

    const ref = useRef()

    useEffect(() => {
        ref.current.refs.input.classList.add("input")
    }, [])

    const handleChange = (e) => {
        onChange({name, value: e.target.value})
    }

    const handleSelect = (value) => {
        onChange({name, value: value})
    }

    return (
        <div className="d-flex flex-column me-4">
            <label htmlFor="">{label}</label>
            <ReactAutocomplete
                inputProps={{
                    onBlur
                }}
                getItemValue={(item) => item.name}
                ref={ref}
                items={items}
                renderItem={(item) => <div key={item.id} className="dropdownItem">
                    {
                        item.name
                    }
                </div>
                }
                value={value}
                onChange={handleChange}
                onSelect={handleSelect}
                menuStyle={{
                    background: "#d5d5d5",
                    maxHeight: "300px",
                    border: "1px solid #f3f3f3",
                    overflowY: "auto",
                    position: "absolute",
                    zIndex: "1000"
                }}
            />
        </div>
    );
};

export default InputWithAutocomplete;
